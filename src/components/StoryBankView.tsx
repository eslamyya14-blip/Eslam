import React, { useState } from 'react';
import {
  Layers,
  Volume2,
  Copy,
  Check,
  Sparkles,
  MapPin,
  TrendingUp,
  Tag,
  Search,
} from 'lucide-react';
import { STORY_BANK, StoryItem } from '../data/interviewData';

interface StoryBankViewProps {
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

export const StoryBankView: React.FC<StoryBankViewProps> = ({
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [selectedStory, setSelectedStory] = useState<StoryItem>(STORY_BANK[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredStories = STORY_BANK.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopyStory = (story: StoryItem) => {
    const text = `قصة ميدانية: ${story.title} (${story.branch})\n\n` +
      `الموقف (Situation): ${story.situation}\n\n` +
      `المهمة (Task): ${story.task}\n\n` +
      `الإجراء الميداني (Action): ${story.action}\n\n` +
      `النتيجة الرقمية (Result): ${story.result}\n\n` +
      `العبرة القيادية: ${story.takeaway}`;

    navigator.clipboard.writeText(text);
    setCopiedId(story.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayStory = (story: StoryItem) => {
    const title = `قصة ميدانية: ${story.title}`;
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      const audioPrompt = `قصة ${story.title} في ${story.branch}... الموقف كان كالتالي: ${story.situation}... فكانت المهمة: ${story.task}... الإجراء اللي اتخذته: ${story.action}... والنتيجة بالأرقام: ${story.result}... العبرة الإدارية: ${story.takeaway}`;
      onPlayAudio(audioPrompt, title, 'Fenrir');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300">
          <Layers className="h-3 w-3" />
          <span>بنك القصص الميدانية الواقعية (10 قصص)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          قصص النجاح الميدانية والأرقام المحققة (Field Story Bank)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          أهم 10 قصص من خبرة 14 سنة في الفروع الكبرى (فيصل 10، المهندسين، الهرم). مصممة بنموذج STAR
          لتكون سلاحك في المقابلة مع أرقام مثبتة ونبرة مصرية واثقة.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-md">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن قصة، فرع، أو كلمة مفتاحية (مثل: TAT، فيصل 10، عينات)..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pr-9 pl-4 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stories List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredStories.map((story, idx) => {
            const isSelected = selectedStory.id === story.id;
            return (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`rounded-xl border p-4 text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-teal-500 bg-teal-500/15 ring-1 ring-teal-500/40 shadow-md'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1 text-teal-400">
                    <MapPin className="h-3 w-3" />
                    <span>{story.branch}</span>
                  </span>
                  <span className="font-mono text-slate-500 text-[11px]">
                    قصة 0{idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">{story.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {story.situation}
                </p>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {story.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-300"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Story Detail (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-5 shadow-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{selectedStory.branch}</span>
                  <span>•</span>
                  <span>خبرة الميدان</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {selectedStory.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => handlePlayStory(selectedStory)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-teal-500/40 bg-teal-500/10 px-3.5 py-2 text-xs font-bold text-teal-300 hover:bg-teal-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>
                    {isPlaying && currentAudioTitle === `قصة ميدانية: ${selectedStory.title}`
                      ? 'إيقاف الصوت'
                      : 'استمع للقصة'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyStory(selectedStory)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="نسخ القصة بالكامل"
                >
                  {copiedId === selectedStory.id ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copiedId === selectedStory.id ? 'تم النسخ!' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            {/* STAR Breakdown */}
            <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
              {/* Situation */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
                <span className="text-xs font-bold text-rose-400 font-mono block">
                  [S] המوقف الأولي (Situation)
                </span>
                <p className="text-slate-200">{selectedStory.situation}</p>
              </div>

              {/* Task */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
                <span className="text-xs font-bold text-amber-400 font-mono block">
                  [T] المهمة المطلوبة (Task)
                </span>
                <p className="text-slate-200">{selectedStory.task}</p>
              </div>

              {/* Action */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
                <span className="text-xs font-bold text-cyan-400 font-mono block">
                  [A] الإجراء والتنفيذ (Action)
                </span>
                <p className="text-slate-200">{selectedStory.action}</p>
              </div>

              {/* Result */}
              <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-3.5 space-y-1">
                <span className="text-xs font-bold text-emerald-400 font-mono block flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>[R] النتيجة والأرقام (Result)</span>
                </span>
                <p className="text-emerald-100 font-medium">{selectedStory.result}</p>
              </div>
            </div>

            {/* Takeaway */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-1 text-xs sm:text-sm">
              <span className="font-bold text-amber-300 block flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>العبرة القيادية للمقابلة:</span>
              </span>
              <p className="text-slate-200 leading-relaxed font-semibold">
                "{selectedStory.takeaway}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
