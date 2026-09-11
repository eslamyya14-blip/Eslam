import React from 'react';
import { Play, Pause, Square, Volume2, RotateCcw } from 'lucide-react';
import { SoundWaveVisualizer } from './SoundWaveVisualizer';

interface AudioPlayerBarProps {
  isPlaying: boolean;
  trackTitle: string;
  progress: number;
  currentTime: number;
  duration: number;
  speed: number;
  voiceName: string;
  onPlayPause: () => void;
  onStop: () => void;
  onSeek: (progress: number) => void;
  onSpeedCycle: () => void;
  onReplay: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  isPlaying,
  trackTitle,
  progress,
  currentTime,
  duration,
  speed,
  voiceName,
  onPlayPause,
  onStop,
  onSeek,
  onSpeedCycle,
  onReplay,
}) => {
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(newProgress);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur-lg px-4 py-3 shadow-2xl">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3">
        {/* Track info & Voice */}
        <div className="flex items-center gap-3 w-full sm:w-1/3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Volume2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs sm:text-sm font-bold text-white">
              {trackTitle || 'تدريب صوتي مع الكوتش'}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <span className="text-amber-400 font-mono">Gemini TTS</span>
              <span>•</span>
              <span className="text-slate-300">{voiceName}</span>
            </div>
          </div>
          <div className="hidden lg:block w-20">
            <SoundWaveVisualizer isPlaying={isPlaying} barCount={12} heightClass="h-5" />
          </div>
        </div>

        {/* Center Controls & Progress */}
        <div className="flex flex-col items-center gap-1.5 w-full sm:w-2/4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReplay}
              className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="إعادة من البداية"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onPlayPause}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current mr-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={onStop}
              className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="إيقاف تام"
            >
              <Square className="h-4 w-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 w-full text-[10px] font-mono text-slate-400">
            <span className="w-8 text-left">{formatTime(currentTime)}</span>
            <div
              onClick={handleProgressBarClick}
              className="relative h-1.5 flex-1 rounded-full bg-slate-800 cursor-pointer overflow-hidden group"
            >
              <div
                className="h-full bg-amber-400 transition-all duration-75 group-hover:bg-amber-300"
                style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
              />
            </div>
            <span className="w-8 text-right">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right side speed & close */}
        <div className="hidden sm:flex items-center justify-end gap-2 sm:w-1/4">
          <button
            type="button"
            onClick={onSpeedCycle}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-mono font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="تغيير سرعة الصوت"
          >
            {speed}x
          </button>
        </div>
      </div>
    </div>
  );
};
