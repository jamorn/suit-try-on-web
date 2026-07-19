// src/components/HUD.tsx
'use client';

import { useState } from 'react';
import type { SuitConfig, HUDPage } from '@/lib/types';

interface Props {
  fps: number;
  page: HUDPage;
  suit: SuitConfig;
  suitIndex: number;
  totalSuits: number;
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

export default function HUD({
  fps, page, suit, suitIndex, totalSuits,
  onPageChange, onSwitchSuit, onSwitchSex,
  onAdjX, onAdjY, onResetX, onResetY,
  onAdjSX, onAdjSY, onResetStretch,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);
  
  const fpsColor = fps >= 25 ? 'text-green-400' : fps >= 15 ? 'text-yellow-400' : 'text-red-400';
  const sexLabel = suit.sex === 'M' ? '👔' : '👗';

  // ✅ ปุ่มมีพื้นหลังเล็กน้อย + blur นิดๆ
  const btn = (label: string, onClick: () => void, color = 'bg-black/40 border-white/30 text-white/90', size = 'text-[11px] px-2 py-1') => (
    <button
      onClick={onClick}
      onTouchStart={(e) => { e.preventDefault(); onClick(); }}
      className={`${size} ${color} rounded-md font-bold select-none touch-manipulation border transition-all active:scale-95 active:bg-black/60`}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        textShadow: '0 1px 2px rgba(0,0,0,0.9)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
    >
      {label}
    </button>
  );

  // โหมดซ่อน
  if (!isVisible) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-2 left-2 ${fpsColor} font-bold text-xs`}
             style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
          {fps.toFixed(0)}
        </div>
        <button
          onClick={() => setIsVisible(true)}
          onTouchStart={(e) => { e.preventDefault(); setIsVisible(true); }}
          className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/30 pointer-events-auto"
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)',
          }}
        >
          🎛️
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Top bar */}
      <div className={`absolute top-2 left-2 ${fpsColor} font-bold text-xs`}
           style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
        {fps.toFixed(0)}
      </div>
      
      <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-white/90 text-xs px-2 py-1 rounded-md border border-white/20"
           style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
        {page === 'basic' ? '🎨' : '⚙️'} {page === 'basic' ? 1 : 2}/2
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-2 left-2 right-2 pointer-events-auto">
        {page === 'basic' ? (
          <div className="space-y-1.5">
            <div className="grid grid-cols-4 gap-1.5">
              {btn('🔄', onSwitchSuit, 'bg-blue-500/30 border-blue-400/60 text-blue-200', 'text-sm py-2')}
              {btn('👤', onSwitchSex, 'bg-purple-500/30 border-purple-400/60 text-purple-200', 'text-sm py-2')}
              {btn('⚙️', () => onPageChange('tuning'), 'bg-white/20 border-white/40 text-white', 'text-sm py-2')}
              {btn('👁️', () => setIsVisible(false), 'bg-red-500/30 border-red-400/60 text-red-200', 'text-sm py-2')}
            </div>
            
            <div className="text-white/80 text-[10px] font-bold text-center bg-black/30 backdrop-blur-sm py-1 rounded-md border border-white/20"
                 style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
              {sexLabel} ชุด {suitIndex + 1}/{totalSuits}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Offset */}
            <div className="space-y-1">
              <div className="text-green-300 text-[10px] font-bold flex items-center justify-between px-1"
                   style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                <span>📍 ตำแหน่ง</span>
                <span className="text-white/70 font-mono bg-black/30 px-1.5 py-0.5 rounded border border-white/10">
                  X:{suit.xOffset > 0 ? '+' : ''}{suit.xOffset} · Y:{suit.yOffset > 0 ? '+' : ''}{suit.yOffset}
                </span>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {btn('←5', () => onAdjX(-5), 'bg-green-500/25 border-green-400/50 text-green-200')}
                {btn('←', () => onAdjX(-1), 'bg-green-500/25 border-green-400/50 text-green-200')}
                {btn('X=0', onResetX, 'bg-white/20 border-white/40 text-white')}
                {btn('→', () => onAdjX(1), 'bg-green-500/25 border-green-400/50 text-green-200')}
                {btn('5→', () => onAdjX(5), 'bg-green-500/25 border-green-400/50 text-green-200')}
                {btn('↑', () => onAdjY(-1), 'bg-green-500/25 border-green-400/50 text-green-200')}
                {btn('Y=0', onResetY, 'bg-white/20 border-white/40 text-white')}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {btn('↑5', () => onAdjY(-5), 'bg-green-500/25 border-green-400/50 text-green-200')}
                {btn('↓', () => onAdjY(1), 'bg-green-500/25 border-green-400/50 text-green-200')}
                {btn('5↓', () => onAdjY(5), 'bg-green-500/25 border-green-400/50 text-green-200')}
                <div className="col-span-4"></div>
              </div>
            </div>

            {/* Stretch */}
            <div className="space-y-1">
              <div className="text-orange-300 text-[10px] font-bold flex items-center justify-between px-1"
                   style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                <span>📐 ขนาด</span>
                <span className="text-white/70 font-mono bg-black/30 px-1.5 py-0.5 rounded border border-white/10">
                  W:{suit.stretchX.toFixed(2)} · H:{suit.stretchY.toFixed(2)}
                </span>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {btn('◀◀', () => onAdjSX(-0.1), 'bg-orange-500/25 border-orange-400/50 text-orange-200')}
                {btn('◀', () => onAdjSX(-0.05), 'bg-orange-500/25 border-orange-400/50 text-orange-200')}
                {btn('1:1', onResetStretch, 'bg-white/20 border-white/40 text-white')}
                {btn('▶', () => onAdjSX(0.05), 'bg-orange-500/25 border-orange-400/50 text-orange-200')}
                {btn('▶▶', () => onAdjSX(0.1), 'bg-orange-500/25 border-orange-400/50 text-orange-200')}
                {btn('▲', () => onAdjSY(0.05), 'bg-orange-500/25 border-orange-400/50 text-orange-200')}
                {btn('▲▲', () => onAdjSY(0.1), 'bg-orange-500/25 border-orange-400/50 text-orange-200')}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {btn('▼▼', () => onAdjSY(-0.1), 'bg-orange-500/25 border-orange-400/50 text-orange-200')}
                {btn('▼', () => onAdjSY(-0.05), 'bg-orange-500/25 border-orange-400/50 text-orange-200')}
                <div className="col-span-5"></div>
              </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-1.5">
              {btn('← กลับ', () => onPageChange('basic'), 'bg-white/20 border-white/40 text-white', 'text-xs py-1.5')}
              {btn('👁️ ซ่อน', () => setIsVisible(false), 'bg-red-500/30 border-red-400/60 text-red-200', 'text-xs py-1.5')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}