// src/components/HUD.tsx
'use client';

import { useState, useCallback } from 'react';
import type { SuitConfig, HUDPage } from '@/lib/types';

interface Props {
  fps: number;
  page: HUDPage;
  suit: SuitConfig;
  suitIndex: number;
  totalSuits: number;
  /** ควบคุมการแสดงผลจากภายนอก (optional) */
  isVisible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  onPageChange: (p: HUDPage) => void;
  onSwitchSuit: () => void;
  onSwitchSex: () => void;
  onAdjX: (d: number) => void;
  onAdjY: (d: number) => void;
  onResetX: () => void;
  onResetY: () => void;
  onAdjSX: (d: number) => void;
  onAdjSY: (d: number) => void;
  onResetStretch: () => void;
}

/** Reusable button component */
function HudButton({
  label,
  onClick,
  color = 'bg-black/40 border-white/30 text-white/90',
  size = 'text-[11px] px-2 py-1',
  ariaLabel,
}: {
  label: string;
  onClick: () => void;
  color?: string;
  size?: string;
  ariaLabel?: string;
}) {
  const handleTouch = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      onClick();
    },
    [onClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <button
      onClick={onClick}
      onTouchStart={handleTouch}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel || label}
      className={`${size} ${color} rounded-md font-bold select-none touch-manipulation border transition-all active:scale-95 active:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50`}
    >
      {label}
    </button>
  );
}

export default function HUD({
  fps,
  page,
  suit,
  suitIndex,
  totalSuits,
  isVisible: controlledVisible,
  onVisibilityChange,
  onPageChange,
  onSwitchSuit,
  onSwitchSex,
  onAdjX,
  onAdjY,
  onResetX,
  onResetY,
  onAdjSX,
  onAdjSY,
  onResetStretch,
}: Props) {
  const [internalVisible, setInternalVisible] = useState(true);
  
  // รองรับ controlled และ uncontrolled mode
  const isVisible =
    controlledVisible !== undefined ? controlledVisible : internalVisible;
  const setIsVisible = useCallback(
    (v: boolean) => {
      if (onVisibilityChange) {
        onVisibilityChange(v);
      } else {
        setInternalVisible(v);
      }
    },
    [onVisibilityChange]
  );

  const fpsColor =
    fps >= 25 ? 'text-green-400' : fps >= 15 ? 'text-yellow-400' : 'text-red-400';
  const sexLabel = suit.sex === 'M' ? '👔' : '👗';

  // โหมดซ่อน
  if (!isVisible) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-2 left-2 ${fpsColor} font-bold text-xs`}
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
        >
          {fps.toFixed(0)}
        </div>
        <HudButton
          label="🎛️"
          onClick={() => setIsVisible(true)}
          color="bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/30 pointer-events-auto"
          ariaLabel="แสดง HUD"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Top bar */}
      <div
        className={`absolute top-2 left-2 ${fpsColor} font-bold text-xs`}
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
      >
        {fps.toFixed(0)}
      </div>

      <div
        className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-white/90 text-xs px-2 py-1 rounded-md border border-white/20"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
      >
        {page === 'basic' ? '🎨' : '⚙️'} {page === 'basic' ? 1 : 2}/2
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-2 left-2 right-2 pointer-events-auto">
        {page === 'basic' ? (
          <div className="space-y-1.5">
            <div className="grid grid-cols-4 gap-1.5">
              <HudButton
                label="🔄"
                onClick={onSwitchSuit}
                color="bg-blue-500/30 border-blue-400/60 text-blue-200"
                size="text-sm py-2"
                ariaLabel="เปลี่ยนชุด"
              />
              <HudButton
                label="👤"
                onClick={onSwitchSex}
                color="bg-purple-500/30 border-purple-400/60 text-purple-200"
                size="text-sm py-2"
                ariaLabel="เปลี่ยนเพศ"
              />
              <HudButton
                label="⚙️"
                onClick={() => onPageChange('tuning')}
                color="bg-white/20 border-white/40 text-white"
                size="text-sm py-2"
                ariaLabel="ตั้งค่าขั้นสูง"
              />
              <HudButton
                label="👁️"
                onClick={() => setIsVisible(false)}
                color="bg-red-500/30 border-red-400/60 text-red-200"
                size="text-sm py-2"
                ariaLabel="ซ่อน HUD"
              />
            </div>

            <div
              className="text-white/80 text-[10px] font-bold text-center bg-black/30 backdrop-blur-sm py-1 rounded-md border border-white/20"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
            >
              {sexLabel} ชุด {suitIndex + 1}/{totalSuits}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Offset */}
            <div className="space-y-1">
              <div
                className="text-green-300 text-[10px] font-bold flex items-center justify-between px-1"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
              >
                <span>📍 ตำแหน่ง</span>
                <span className="text-white/70 font-mono bg-black/30 px-1.5 py-0.5 rounded border border-white/10">
                  X:{suit.xOffsetPercent > 0 ? '+' : ''}
                  {(suit.xOffsetPercent * 100).toFixed(1)}% · Y:
                  {suit.yOffsetPercent > 0 ? '+' : ''}
                  {(suit.yOffsetPercent * 100).toFixed(1)}%
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1">
                <HudButton
                  label="←5"
                  onClick={() => onAdjX(-5)}
                  color="bg-green-500/25 border-green-400/50 text-green-200"
                />
                <HudButton
                  label="←"
                  onClick={() => onAdjX(-1)}
                  color="bg-green-500/25 border-green-400/50 text-green-200"
                />
                <HudButton
                  label="X=0"
                  onClick={onResetX}
                  color="bg-white/20 border-white/40 text-white"
                />
                <HudButton
                  label="→"
                  onClick={() => onAdjX(1)}
                  color="bg-green-500/25 border-green-400/50 text-green-200"
                />
                <HudButton
                  label="5→"
                  onClick={() => onAdjX(5)}
                  color="bg-green-500/25 border-green-400/50 text-green-200"
                />
                <HudButton
                  label="↑"
                  onClick={() => onAdjY(-1)}
                  color="bg-green-500/25 border-green-400/50 text-green-200"
                />
                <HudButton
                  label="Y=0"
                  onClick={onResetY}
                  color="bg-white/20 border-white/40 text-white"
                />
              </div>

              <div className="grid grid-cols-7 gap-1">
                <HudButton
                  label="↑5"
                  onClick={() => onAdjY(-5)}
                  color="bg-green-500/25 border-green-400/50 text-green-200"
                />
                <HudButton
                  label="↓"
                  onClick={() => onAdjY(1)}
                  color="bg-green-500/25 border-green-400/50 text-green-200"
                />
                <HudButton
                  label="5↓"
                  onClick={() => onAdjY(5)}
                  color="bg-green-500/25 border-green-400/50 text-green-200"
                />
                <div className="col-span-4" />
              </div>
            </div>

            {/* Stretch */}
            <div className="space-y-1">
              <div
                className="text-orange-300 text-[10px] font-bold flex items-center justify-between px-1"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
              >
                <span>📐 ขนาด</span>
                <span className="text-white/70 font-mono bg-black/30 px-1.5 py-0.5 rounded border border-white/10">
                  W:{suit.stretchX.toFixed(2)} · H:{suit.stretchY.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1">
                <HudButton
                  label="◀◀"
                  onClick={() => onAdjSX(-0.1)}
                  color="bg-orange-500/25 border-orange-400/50 text-orange-200"
                />
                <HudButton
                  label="◀"
                  onClick={() => onAdjSX(-0.05)}
                  color="bg-orange-500/25 border-orange-400/50 text-orange-200"
                />
                <HudButton
                  label="1:1"
                  onClick={onResetStretch}
                  color="bg-white/20 border-white/40 text-white"
                />
                <HudButton
                  label="▶"
                  onClick={() => onAdjSX(0.05)}
                  color="bg-orange-500/25 border-orange-400/50 text-orange-200"
                />
                <HudButton
                  label="▶▶"
                  onClick={() => onAdjSX(0.1)}
                  color="bg-orange-500/25 border-orange-400/50 text-orange-200"
                />
                <HudButton
                  label="▲"
                  onClick={() => onAdjSY(0.05)}
                  color="bg-orange-500/25 border-orange-400/50 text-orange-200"
                />
                <HudButton
                  label="▲▲"
                  onClick={() => onAdjSY(0.1)}
                  color="bg-orange-500/25 border-orange-400/50 text-orange-200"
                />
              </div>

              <div className="grid grid-cols-7 gap-1">
                <HudButton
                  label="▼▼"
                  onClick={() => onAdjSY(-0.1)}
                  color="bg-orange-500/25 border-orange-400/50 text-orange-200"
                />
                <HudButton
                  label="▼"
                  onClick={() => onAdjSY(-0.05)}
                  color="bg-orange-500/25 border-orange-400/50 text-orange-200"
                />
                <div className="col-span-5" />
              </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-1.5">
              <HudButton
                label="← กลับ"
                onClick={() => onPageChange('basic')}
                color="bg-white/20 border-white/40 text-white"
                size="text-xs py-1.5"
              />
              <HudButton
                label="👁️ ซ่อน"
                onClick={() => setIsVisible(false)}
                color="bg-red-500/30 border-red-400/60 text-red-200"
                size="text-xs py-1.5"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}