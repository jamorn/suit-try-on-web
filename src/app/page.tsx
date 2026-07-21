// src/app/page.tsx
'use client';

// vConsole เฉพาะ development เท่านั้น (singleton)
let vConsoleInstance: unknown = null;
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  import('vconsole').then(({ default: VConsole }) => {
    if (!vConsoleInstance) {
      vConsoleInstance = new VConsole({ theme: 'dark' });
    }
  });
}

import { useRef, useState, useEffect, useCallback } from 'react';
import { useCamera } from '@/hooks/useCamera';
import { usePoseLandmarker } from '@/hooks/usePoseLandmarker';
import { calculateSuitRect, drawSuit } from '@/lib/suit-renderer';
import { SUIT_DATA, DEFAULT_SEX, getFirstSuitIndex } from '@/lib/config';
import HUD from '@/components/HUD';
import type { SuitConfig, HUDPage, Landmark, PoseResult } from '@/lib/types';
import { ADJUST_THROTTLE_MS, THROTTLE_MS } from '@/lib/types';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { videoRef, isReady, error, startCamera } = useCamera();

  const latestLandmarksRef = useRef<Landmark[] | null>(null);
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const rafRef = useRef<number>(0);
  const fpsRafRef = useRef<number>(0);

  const [aiReady, setAiReady] = useState(false);
  const [mediaPipeError, setMediaPipeError] = useState(false);

  const handlePoseDetected = useCallback((result: PoseResult) => {
    if (result.landmarks?.[0]) {
      latestLandmarksRef.current = result.landmarks[0] as Landmark[];
      setAiReady(true);
      setMediaPipeError(false);
    }
  }, []);

  const handleMediaPipeError = useCallback((err: Error) => {
    console.error('MediaPipe error:', err);
    setMediaPipeError(true);
  }, []);

  usePoseLandmarker({
    videoRef,
    isReady,
    onPoseDetected: handlePoseDetected,
    onError: handleMediaPipeError,
  });

  // Throttle helper
  const lastTapMapRef = useRef<Record<string, number>>({});
  const throttle = useCallback(
    (key: string, fn: () => void, ms = THROTTLE_MS) => {
      const now = performance.now();
      if (now - (lastTapMapRef.current[key] || 0) > ms) {
        lastTapMapRef.current[key] = now;
        fn();
      }
    },
    []
  );

  // State แยกตามเพศ (reset เมื่อเปลี่ยนเพศ)
  const [sex, setSex] = useState<'M' | 'F'>(DEFAULT_SEX);
  const [suitIdxBySex, setSuitIdxBySex] = useState<Record<'M' | 'F', number>>({
    M: 0,
    F: 0,
  });
  const [suitAdjustments, setSuitAdjustments] = useState<
    Record<string, Partial<SuitConfig>>
  >({});

  const [page, setPage] = useState<HUDPage>('basic');
  const [fps, setFps] = useState(0);
  const [loading, setLoading] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 640, height: 480 });

  const currentSuits = SUIT_DATA.filter((s) => s.sex === sex);
  const suitIdx = currentSuits.length > 0
    ? Math.min(suitIdxBySex[sex], currentSuits.length - 1)
    : 0;
  const currentSuit = currentSuits[suitIdx];

  // Refs สำหรับ render loop
  const suitIdxRef = useRef(suitIdx);
  const sexRef = useRef(sex);
  const adjustmentsRef = useRef(suitAdjustments);
  suitIdxRef.current = suitIdx;
  sexRef.current = sex;
  adjustmentsRef.current = suitAdjustments;

  // ResizeObserver สำหรับ responsive canvas
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setCanvasSize({ width: Math.round(width), height: Math.round(height) });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // โหลดรูปภาพ
  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));
        img.src = src;
      });
    };

    Promise.allSettled(SUIT_DATA.map((s) => loadImage(s.path))).then(
      (results) => {
        const map = new Map<string, HTMLImageElement>();
        results.forEach((result, i) => {
          if (result.status === 'fulfilled') {
            map.set(SUIT_DATA[i].path, result.value);
          } else {
            console.error(`❌ Failed to load: ${SUIT_DATA[i].path}`);
          }
        });
        imagesRef.current = map;
        setLoading(false);
      }
    );
  }, []);

  const ready = !loading && isReady && aiReady;

  // Render loop
  useEffect(() => {
    if (!ready) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const canvas = canvasRef.current;
      const landmarks = latestLandmarksRef.current;
      const ctx = canvas?.getContext('2d');
      const idx = suitIdxRef.current;
      const currentSex = sexRef.current;
      const suits = SUIT_DATA.filter((s) => s.sex === currentSex);
      const config = suits[idx];
      const adj = adjustmentsRef.current[config?.path] || {};
      const mergedConfig = config ? { ...config, ...adj } : null;
      const images = imagesRef.current;
      const img = mergedConfig ? images.get(mergedConfig.path) : undefined;

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (landmarks && mergedConfig && img) {
          const rect = calculateSuitRect(
            landmarks,
            canvas.width,
            canvas.height,
            mergedConfig,
            img
          );
          if (rect) {
            drawSuit(ctx, img, rect);
          }
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready]);

  // FPS counter
  useEffect(() => {
    let count = 0;
    let last = performance.now();
    let running = true;

    const tick = () => {
      if (!running) return;
      count++;
      const now = performance.now();
      if (now - last >= 1000) {
        setFps(count);
        count = 0;
        last = now;
      }
      fpsRafRef.current = requestAnimationFrame(tick);
    };

    fpsRafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(fpsRafRef.current);
    };
  }, []);

  // Update suit adjustment
  const updateSuit = useCallback(
    (fn: (s: SuitConfig) => Partial<SuitConfig>) => {
      if (!currentSuit) return;
      setSuitAdjustments((prev) => {
        const current = prev[currentSuit.path] || {};
        const updated = { ...current, ...fn({ ...currentSuit, ...current }) };
        return { ...prev, [currentSuit.path]: updated };
      });
    },
    [currentSuit]
  );

  const adjX = useCallback(
    (d: number) =>
      updateSuit((s) => ({
        xOffsetPercent: Math.max(-0.1, Math.min(0.1, s.xOffsetPercent + d * 0.001)),
      })),
    [updateSuit]
  );
  const adjY = useCallback(
    (d: number) =>
      updateSuit((s) => ({
        yOffsetPercent: Math.max(-0.1, Math.min(0.1, s.yOffsetPercent + d * 0.001)),
      })),
    [updateSuit]
  );
  const resetX = useCallback(
    () => updateSuit(() => ({ xOffsetPercent: 0 })),
    [updateSuit]
  );
  const resetY = useCallback(
    () => updateSuit(() => ({ yOffsetPercent: 0 })),
    [updateSuit]
  );
  const adjSX = useCallback(
    (d: number) =>
      updateSuit((s) => ({
        stretchX: Math.round(Math.max(0.5, Math.min(2, s.stretchX + d)) * 100) / 100,
      })),
    [updateSuit]
  );
  const adjSY = useCallback(
    (d: number) =>
      updateSuit((s) => ({
        stretchY: Math.round(Math.max(0.5, Math.min(2, s.stretchY + d)) * 100) / 100,
      })),
    [updateSuit]
  );
  const resetStretch = useCallback(
    () => updateSuit(() => ({ stretchX: 1, stretchY: 1 })),
    [updateSuit]
  );

  // Keyboard controls
  const handlersRef = useRef({
    adjX, adjY, resetX, resetY, adjSX, adjSY, resetStretch,
  });
  handlersRef.current = {
    adjX, adjY, resetX, resetY, adjSX, adjSY, resetStretch,
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const {
        adjX, adjY, resetX, resetY, adjSX, adjSY, resetStretch,
      } = handlersRef.current;

      if (k === 'h')
        throttle('page', () => setPage((p) => (p === 'basic' ? 'tuning' : 'basic')));
            else if (k === 's')
        throttle('suit', () => {
          const suits = SUIT_DATA.filter((s) => s.sex === sexRef.current);
          setSuitIdxBySex((prev) => ({
            ...prev,
            [sexRef.current]: (prev[sexRef.current] + 1) % suits.length,
          }));
        });
      else if (k === 'f') {
        throttle('sex', () => {
          setSex((prev) => {
            const newSex = prev === 'M' ? 'F' : 'M';
            const suits = SUIT_DATA.filter((s) => s.sex === newSex);
            const idx = Math.min(
              suitIdxBySex[newSex] || 0,
              suits.length - 1
            );
            setSuitIdxBySex((prevIdx) => ({ ...prevIdx, [newSex]: idx }));
            return newSex;
          });
        });
      } else if (page === 'tuning') {
        if (k === '[') throttle('adjX-', () => adjX(-1), 80);
        else if (k === ']') throttle('adjX+', () => adjX(1), 80);
        else if (k === 'i') throttle('adjY-', () => adjY(-1), 80);
        else if (k === 'k') throttle('adjY+', () => adjY(1), 80);
        else if (k === '9') throttle('resetY', resetY, 350);
        else if (k === '0') throttle('resetX', resetX, 350);
        else if (k === 'a') throttle('adjSX-', () => adjSX(-0.05), 80);
        else if (k === 'd') throttle('adjSX+', () => adjSX(0.05), 80);
        else if (k === 'w') throttle('adjSY+', () => adjSY(0.05), 80);
        else if (k === 'x') throttle('adjSY-', () => adjSY(-0.05), 80);
        else if (k === 'r') throttle('resetStretch', resetStretch, 350);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page, currentSuits.length, throttle]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⚙️</div>
          <p className="font-bold">กำลังเตรียมความพร้อมของระบบ...</p>
          <p className="text-sm text-gray-400 mt-2">🖼️ กำลังโหลดทรัพยากรเสื้อผ้า...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center max-w-md p-6">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
          >
            รีเฟรชหน้าเว็บ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div
        ref={containerRef}
        className="relative max-w-[640px] w-full aspect-[4/3] mx-auto"
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full -scale-x-100 rounded bg-black"
          style={{ objectFit: 'cover' }}
        />
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="absolute top-0 left-0 w-full h-full -scale-x-100 pointer-events-none"
          aria-label="Virtual try-on canvas"
          role="img"
        />

        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="text-center">
              <div className="text-4xl mb-4">🕴️</div>
              <button
                onClick={startCamera}
                className="px-8 py-4 bg-green-600 text-white text-xl rounded-lg hover:bg-green-500 shadow-lg transition-colors"
                aria-label="เริ่มกล้องเว็บแคม"
              >
                ▶️ เริ่มกล้อง
              </button>
              <p className="text-sm text-gray-400 mt-3">📷 กรุณากดปุ่มเพื่อเปิดกล้องเว็บแคม...</p>
            </div>
          </div>
        )}

        {isReady && !aiReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="text-center">
              <div className="animate-spin text-4xl mb-4">🧠</div>
              <p className="font-bold">กำลังเตรียมความพร้อมของระบบ...</p>
              <p className="text-sm text-gray-400 mt-2">🤖 โมเดล AI กำลังประมวลผลโครงร่าง...</p>
            </div>
          </div>
        )}

        {mediaPipeError && isReady && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-20">
            <p className="text-sm font-bold">⚠️ AI Error</p>
            <p className="text-xs">กำลังพยายามเชื่อมต่อใหม่...</p>
          </div>
        )}

        {aiReady && currentSuit && (
          <HUD
            fps={fps}
            page={page}
            suit={{ ...currentSuit, ...(suitAdjustments[currentSuit?.path] || {}) }}
            suitIndex={suitIdx}
            totalSuits={currentSuits.length}
            onPageChange={setPage}
            onSwitchSuit={() =>
              throttle('suit', () => {
                const suits = SUIT_DATA.filter((s) => s.sex === sex);
                setSuitIdxBySex((prev) => ({
                  ...prev,
                  [sex]: (prev[sex] + 1) % suits.length,
                }));
              })
            }
            onSwitchSex={() =>
              throttle('sex', () => {
                setSex((prev) => {
                  const newSex = prev === 'M' ? 'F' : 'M';
                  const suits = SUIT_DATA.filter((s) => s.sex === newSex);
                  const idx = Math.min(
                    suitIdxBySex[newSex] || 0,
                    suits.length - 1
                  );
                  setSuitIdxBySex((prevIdx) => ({ ...prevIdx, [newSex]: idx }));
                  return newSex;
                });
              })
            }
            onAdjX={(d) => throttle('adjX', () => adjX(d), ADJUST_THROTTLE_MS)}
            onAdjY={(d) => throttle('adjY', () => adjY(d), ADJUST_THROTTLE_MS)}
            onResetX={() => throttle('resetX', resetX, THROTTLE_MS)}
            onResetY={() => throttle('resetY', resetY, THROTTLE_MS)}
            onAdjSX={(d) => throttle('adjSX', () => adjSX(d), ADJUST_THROTTLE_MS)}
            onAdjSY={(d) => throttle('adjSY', () => adjSY(d), ADJUST_THROTTLE_MS)}
            onResetStretch={() => throttle('resetStretch', resetStretch, THROTTLE_MS)}
          />
        )}
      </div>
    </div>
  );
}
