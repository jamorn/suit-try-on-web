'use client';

import VConsole from 'vconsole';
if (typeof window !== 'undefined') {
  new VConsole({ theme: 'dark' });
}

import { useRef, useState, useEffect, useCallback } from 'react';
import { useCamera } from '@/hooks/useCamera';
import { usePoseLandmarker } from '@/hooks/usePoseLandmarker';
import { calculateSuitRect, drawSuit } from '@/lib/suit-renderer';
import { SUIT_DATA, DEFAULT_SEX } from '@/lib/config';
import HUD from '@/components/HUD';
import type { SuitConfig, HUDPage, Landmark } from '@/lib/types';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef, isReady, error } = useCamera();
  const poseResult = usePoseLandmarker(videoRef, isReady);

  // ✅ Throttle ป้องกันแตะซ้ำบน iPad (300ms)
  const lastTapRef = useRef(0);
  const throttle = useCallback((fn: () => void, ms = 350) => {
    const now = Date.now();
    if (now - lastTapRef.current > ms) {
      lastTapRef.current = now;
      fn();
    }
  }, []);

  // ✅ เก็บชุดทั้งหมด 4 ชุด (ไม่ filter ตามเพศ)
  const [suits, setSuits] = useState<SuitConfig[]>(
    SUIT_DATA.map((s) => ({ ...s }))
  );
  const [suitIdx, setSuitIdx] = useState(0);
  const [sex, setSex] = useState<'M' | 'F'>(DEFAULT_SEX);
  const [page, setPage] = useState<HUDPage>('basic');
  const [fps, setFps] = useState(0);
  const [images, setImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const [loading, setLoading] = useState(true);

  // ✅ โหลดรูปทุกชุด (4 ชุด)
  useEffect(() => {
    const map = new Map<string, HTMLImageElement>();
    let loaded = 0;
    const total = SUIT_DATA.length;
    
    SUIT_DATA.forEach((s) => {
      const img = new Image();
      img.onload = () => {
        map.set(s.path, img);
        loaded++;
        if (loaded === total) {
          setImages(new Map(map));
          setLoading(false);
        }
      };
      img.onerror = () => {
        console.error(`❌ Failed: ${s.path}`);
      };
      img.src = s.path;
    });
  }, []);

  // ✅ FPS counter
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
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { running = false; };
  }, []);

  // ✅ วาดชุดบน canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !poseResult?.landmarks?.[0]) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const config = suits[suitIdx];
    if (!config) return;
    
    const img = images.get(config.path);
    if (!img) return;
    
    const rect = calculateSuitRect(
      poseResult.landmarks[0] as Landmark[],
      canvas.width, canvas.height, config, img
    );
    drawSuit(ctx, img, rect);
  }, [poseResult, suits, suitIdx, images]);

  // ✅ ฟังก์ชันปรับแต่ง — แก้ไข suits[suitIdx] โดยตรง
  const updateSuit = useCallback(
    (fn: (s: SuitConfig) => SuitConfig) => {
      setSuits((prev) => {
        const next = [...prev];
        next[suitIdx] = fn(next[suitIdx]);
        return next;
      });
    },
    [suitIdx]
  );

  const adjX = useCallback((d: number) => updateSuit((s) => ({ ...s, xOffset: s.xOffset + d })), [updateSuit]);
  const adjY = useCallback((d: number) => updateSuit((s) => ({ ...s, yOffset: s.yOffset + d })), [updateSuit]);
  const resetX = useCallback(() => updateSuit((s) => ({ ...s, xOffset: 0 })), [updateSuit]);
  const resetY = useCallback(() => updateSuit((s) => ({ ...s, yOffset: 0 })), [updateSuit]);
  const adjSX = useCallback((d: number) => updateSuit((s) => ({ ...s, stretchX: Math.round(Math.max(0.5, Math.min(2, s.stretchX + d)) * 100) / 100 })), [updateSuit]);
  const adjSY = useCallback((d: number) => updateSuit((s) => ({ ...s, stretchY: Math.round(Math.max(0.5, Math.min(2, s.stretchY + d)) * 100) / 100 })), [updateSuit]);
  const resetStretch = useCallback(() => updateSuit((s) => ({ ...s, stretchX: 1, stretchY: 1 })), [updateSuit]);

  // ✅ Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'h') throttle(() => setPage((p) => (p === 'basic' ? 'tuning' : 'basic')));
      else if (k === 's') throttle(() => setSuitIdx((i) => (i + 1) % suits.length));
      else if (k === 'f') {
        throttle(() => {
          const newSex = sex === 'M' ? 'F' : 'M';
          setSex(newSex);
          const firstIdx = SUIT_DATA.findIndex((s) => s.sex === newSex);
          if (firstIdx !== -1) setSuitIdx(firstIdx);
        });
      }
      else if (page === 'tuning') {
        if (k === '[') throttle(() => adjX(-1), 80);
        else if (k === ']') throttle(() => adjX(1), 80);
        else if (k === 'i') throttle(() => adjY(-1), 80);
        else if (k === 'k') throttle(() => adjY(1), 80);
        else if (k === '9') throttle(resetY, 350);
        else if (k === '0') throttle(resetX, 350);
        else if (k === 'a') throttle(() => adjSX(-0.05), 80);
        else if (k === 'd') throttle(() => adjSX(0.05), 80);
        else if (k === 'w') throttle(() => adjSY(0.05), 80);
        else if (k === 'x') throttle(() => adjSY(-0.05), 80);
        else if (k === 'r') throttle(resetStretch, 350);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page, suits.length, sex, adjX, adjY, resetX, resetY, adjSX, adjSY, resetStretch]);

  const handleStartCamera = async () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      try {
        await video.play();
      } catch (e) {
        console.error('❌ Manual play failed:', e);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <div>กำลังโหลด...</div>
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
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-500"
          >
            รีเฟรชหน้าเว็บ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative" style={{ width: 640, height: 480 }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onClick={handleStartCamera}
          className="w-full h-full -scale-x-100 rounded bg-black"
          style={{ objectFit: 'cover' }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="absolute top-0 left-0 w-full h-full -scale-x-100 pointer-events-none"
        />

        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <button
              onClick={handleStartCamera}
              className="px-8 py-4 bg-green-600 text-white text-xl rounded-lg hover:bg-green-500 shadow-lg"
            >
              ▶️ เริ่มกล้อง
            </button>
          </div>
        )}

        {suits[suitIdx] && isReady && (
          <HUD
            fps={fps}
            page={page}
            suit={suits[suitIdx]}
            suitIndex={suitIdx}
            totalSuits={suits.length}
            onPageChange={setPage}
            // ✅ วนได้ 4 ชุด (หน่วง 350ms)
            onSwitchSuit={() => throttle(() => setSuitIdx((i) => (i + 1) % suits.length))}
            // ✅ เปลี่ยนเพศ → jump ไปชุดแรกของเพศนั้น (หน่วง 350ms)
            onSwitchSex={() => throttle(() => {
              const newSex = sex === 'M' ? 'F' : 'M';
              setSex(newSex);
              const firstIdx = SUIT_DATA.findIndex((s) => s.sex === newSex);
              if (firstIdx !== -1) setSuitIdx(firstIdx);
            })}
            onAdjX={(d) => throttle(() => adjX(d), 100)}
            onAdjY={(d) => throttle(() => adjY(d), 100)}
            onResetX={() => throttle(resetX, 350)}
            onResetY={() => throttle(resetY, 350)}
            onAdjSX={(d) => throttle(() => adjSX(d), 100)}
            onAdjSY={(d) => throttle(() => adjSY(d), 100)}
            onResetStretch={() => throttle(resetStretch, 350)}
          />
        )}
      </div>
    </div>
  );
}