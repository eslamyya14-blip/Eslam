import React, { useEffect, useState } from 'react';
import { audioCoach } from '../utils/audioEngine';

interface SoundWaveVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
  heightClass?: string;
  colorClass?: string;
}

export const SoundWaveVisualizer: React.FC<SoundWaveVisualizerProps> = ({
  isPlaying,
  barCount = 16,
  heightClass = 'h-6',
  colorClass = 'bg-amber-400',
}) => {
  const [frequencies, setFrequencies] = useState<number[]>(new Array(barCount).fill(4));

  useEffect(() => {
    if (!isPlaying) {
      setFrequencies(new Array(barCount).fill(4));
      return;
    }

    let animationFrameId: number;

    const updateBars = () => {
      const data = audioCoach.getAnalyserData();
      const step = Math.floor(data.length / barCount);
      const newFreqs: number[] = [];
      for (let i = 0; i < barCount; i++) {
        const val = data[i * step] || 0;
        const heightPercent = Math.max(10, Math.min(100, (val / 255) * 100));
        newFreqs.push(heightPercent);
      }
      setFrequencies(newFreqs);
      animationFrameId = requestAnimationFrame(updateBars);
    };

    animationFrameId = requestAnimationFrame(updateBars);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, barCount]);

  return (
    <div className={`flex items-end justify-center gap-1 ${heightClass}`}>
      {frequencies.map((height, idx) => (
        <span
          key={idx}
          className={`w-1 rounded-full transition-all duration-75 ${colorClass}`}
          style={{
            height: isPlaying ? `${height}%` : '4px',
            opacity: isPlaying ? 0.4 + (height / 100) * 0.6 : 0.25,
          }}
        />
      ))}
    </div>
  );
};
