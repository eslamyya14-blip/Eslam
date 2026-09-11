import React from 'react';
import {
  Volume2,
  Sparkles,
  BookOpen,
  Compass,
  FileText,
  Trophy,
  Award,
  Layers,
  HelpCircle,
  Sliders,
  Building2,
} from 'lucide-react';
import { COACH_VOICES } from '../data/lessonData';

export type AppTab =
  | 'master_lesson'
  | 'case_solver'
  | 'live_day'
  | 'coach'
  | 'mock'
  | 'lesson'
  | 'axes'
  | 'elevator'
  | 'stories'
  | 'scenarios'
  | 'simulator'
  | 'cheatsheet';

interface NavbarProps {
  currentVoice: string;
  onVoiceChange: (voiceId: string) => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onPlayFullLesson: () => void;
  isPlayingFullLesson: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentVoice,
  onVoiceChange,
  playbackSpeed,
  onSpeedChange,
  activeTab,
  onTabChange,
  onPlayFullLesson,
  isPlayingFullLesson,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 shadow-inner">
            <span className="text-xl">👑</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                MANAGER MODE
              </h1>
              <span className="hidden rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300 sm:inline-block">
                بالعامية المصرية
              </span>
            </div>
            <p className="text-xs font-medium text-slate-400">
              عقلية رئيس القسم الميداني • كوتش صوتي واثق
            </p>
          </div>
        </div>

        {/* Center Tabs (Desktop) */}
        <nav className="hidden 2xl:flex items-center rounded-xl border border-slate-800 bg-slate-900/90 p-1">
          <button
            type="button"
            onClick={() => onTabChange('master_lesson')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'master_lesson'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>🎙️</span>
            <span>الدرس التأسيسي (Manager Mode)</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('case_solver')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'case_solver'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>📊</span>
            <span>حل الكيس ستادي</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('live_day')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'live_day'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span>🏢</span>
            <span>يوم المقابلة</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('axes')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'axes'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="h-3.5 w-3.5 text-amber-400" />
            <span>تعديل المحاور</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('coach')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'coach'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>مدرب STAR</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('mock')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'mock'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span>المقابلة الشاملة (11)</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('lesson')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'lesson'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>الخطوات الـ 7</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('elevator')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'elevator'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>أصنصير الترقية</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('stories')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'stories'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-teal-400" />
            <span>بنك القصص (10)</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('scenarios')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'scenarios'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            <span>CPI والسيناريوهات</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('simulator')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>المحاكي الذكي</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('cheatsheet')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'cheatsheet'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>الموجز والملاحظات</span>
          </button>
        </nav>

        {/* Audio Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Voice Selector */}
          <div className="relative hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 px-2.5 py-1 text-xs">
            <Volume2 className="h-3.5 w-3.5 text-amber-400" />
            <select
              value={currentVoice}
              onChange={(e) => onVoiceChange(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-200 outline-none cursor-pointer"
              title="اختيار نبرة الكوتش"
            >
              {COACH_VOICES.map((v) => (
                <option key={v.id} value={v.id} className="bg-slate-900 text-slate-100">
                  {v.labelAr}
                </option>
              ))}
            </select>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/90 p-0.5 text-[11px] font-semibold text-slate-300">
            {[0.85, 1.0, 1.2].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => onSpeedChange(spd)}
                className={`rounded px-2 py-1 transition-colors cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'hover:text-white'
                }`}
                title={spd === 0.85 ? 'سرعة هادئة ومتأنية' : spd === 1.0 ? 'سرعة طبيعية' : 'سرعة سريعة'}
              >
                {spd === 1.0 ? '1.0x' : `${spd}x`}
              </button>
            ))}
          </div>

          {/* Gemini TTS model pill */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <Sparkles className="h-3 w-3" />
            <span>Gemini Voice Coach</span>
          </div>
        </div>
      </div>

      {/* Submenu Bar (Scrollable for tablets & mobile) */}
      <div className="flex 2xl:hidden border-t border-slate-800/60 bg-slate-900/90 px-3 py-2 overflow-x-auto gap-1.5 scrollbar-none">
        <button
          type="button"
          onClick={() => onTabChange('master_lesson')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'master_lesson' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          🎙️ الدرس التأسيسي (Manager Mode)
        </button>
        <button
          type="button"
          onClick={() => onTabChange('case_solver')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'case_solver' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          📊 حل الكيس ستادي
        </button>
        <button
          type="button"
          onClick={() => onTabChange('live_day')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'live_day' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          🏢 يوم المقابلة
        </button>
        <button
          type="button"
          onClick={() => onTabChange('axes')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'axes' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          ⚙️ تعديل المحاور
        </button>
        <button
          type="button"
          onClick={() => onTabChange('coach')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'coach' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          ✨ مدرب STAR
        </button>
        <button
          type="button"
          onClick={() => onTabChange('mock')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'mock' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          👑 المقابلة الشاملة
        </button>
        <button
          type="button"
          onClick={() => onTabChange('lesson')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'lesson' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          📖 الخطوات السبعة
        </button>
        <button
          type="button"
          onClick={() => onTabChange('elevator')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'elevator' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          🏆 الأصنصير
        </button>
        <button
          type="button"
          onClick={() => onTabChange('stories')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'stories' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          📚 بنك القصص
        </button>
        <button
          type="button"
          onClick={() => onTabChange('scenarios')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'scenarios' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          ❓ CPI
        </button>
        <button
          type="button"
          onClick={() => onTabChange('simulator')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          🧭 المحاكي الذكي
        </button>
        <button
          type="button"
          onClick={() => onTabChange('cheatsheet')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'cheatsheet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
          }`}
        >
          📋 الموجز
        </button>
      </div>
    </header>
  );
};
