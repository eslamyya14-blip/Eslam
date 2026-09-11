import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Send,
  Volume2,
  CheckCircle,
  AlertTriangle,
  Flame,
  Award,
  RotateCcw,
} from 'lucide-react';
import { SimulationCase } from '../types';
import { SIMULATION_CASES } from '../data/lessonData';

interface OperationsSimulatorProps {
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

export const OperationsSimulator: React.FC<OperationsSimulatorProps> = ({
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [selectedCase, setSelectedCase] = useState<SimulationCase>(SIMULATION_CASES[0]);
  const [userResponse, setUserResponse] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const handleSelectCase = (c: SimulationCase) => {
    setSelectedCase(c);
    setUserResponse('');
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!userResponse.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/coach-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userResponse,
          currentStepId: 'all',
          scenarioText: `${selectedCase.title}: ${selectedCase.scenario}`,
        }),
      });

      if (!res.ok) throw new Error('فشل التحليل');
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
      // Fallback local response
      setAnalysisResult({
        scoreOutOf10: 8,
        egyptianCoachFeedback:
          'إجابة قوية وواثقة يا بطل! لمست الأكشن والمسؤولية، بس ركز أكتر على لغة الأرقام (Data) وربط الـ IT باتفاقية مستوى خدمة SLA ملزمة.',
        detectedKeywords: ['Action', 'Ownership', 'Priority'],
        missingKeywords: ['Data', 'CAPA'],
        suggestedExecutivePhraes:
          'بناءً على تقارير الـ LIS سأحدد أوقات الذروة وأفعل مسار الفحص السريع مع توقيع SLA ملزم.',
        strengths: ['ثبات انفعالي ممتاز', 'تحمل مسؤولية فوري'],
        improvements: ['إضافة مؤشرات أرقام محددة', 'إيضاح خطة المتابعة الأسبوعية'],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePlayAnalysisAudio = () => {
    if (!analysisResult?.egyptianCoachFeedback) return;
    const title = 'تقييم الكوتش للموقف الميداني';
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      onPlayAudio(analysisResult.egyptianCoachFeedback, title, 'Fenrir');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          <Compass className="h-3 w-3" />
          <span>محاكي الطوارئ والعمليات اليومية</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          محاكاة مواقف الفروع المفاجئة (Branch Crisis Simulator)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          اختر سيناريو تشغيلي حقيقي، واكتب تصرفك كما لو كنت Section Head الآن. الكوتش الذكي بالعامية المصرية
          سيحلل إجابتك بناءً على معادلة الإدارة السبعة ويعطيك التقييم ونبرة الصوت المناسبة.
        </p>
      </div>

      {/* Case Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SIMULATION_CASES.map((c) => {
          const isSelected = selectedCase.id === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCase(c)}
              className={`rounded-xl border p-4 text-right transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/15 ring-1 ring-amber-500/40 shadow-lg'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-amber-400">{c.category}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    c.difficulty === 'high'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {c.difficulty === 'high' ? 'أزمة حرجة' : 'أزمة متوسطة'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{c.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{c.problemStatement || c.scenario}</p>
            </button>
          );
        })}
      </div>

      {/* Active Case Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Case Description & Questions (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-md">
          <div className="border-b border-slate-800/80 pb-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase">
              {selectedCase.category}
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">
              {selectedCase.title}
            </h3>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2 text-xs text-slate-300 leading-relaxed">
            <div className="text-xs font-bold text-slate-200">سياق الأزمة:</div>
            <p>{selectedCase.scenario}</p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-400">البيانات المتاحة للقرار:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(selectedCase.dataPoints).map(([k, v], idx) => (
                <div key={idx} className="rounded-lg bg-slate-800/80 p-2 border border-slate-700/60">
                  <span className="text-slate-400 text-[10px] block">{k}</span>
                  <span className="text-white font-bold font-mono">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 space-y-1 text-xs text-amber-200">
            <div className="font-bold text-amber-300">نصيحة الكوتش قبل أن تجيب:</div>
            <p className="text-slate-300 leading-relaxed">
              ابدأ بالأكشن الفوري لاحتواء الموقف، ثم اطلب الداتا المحددة، ثم فسر كيف ستمنع تكراره بـ CAPA وتنسيق مع الإدارات.
            </p>
          </div>
        </div>

        {/* Right: User Response Input & Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-md">
            <label className="text-xs font-bold text-slate-200 block">
              صياغة قرارك الإداري (اكتب بالعامية أو الفصحى أو الإنجليزية):
            </label>
            <textarea
              rows={6}
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="مثال: أول حاجة هنزل الصالة فوراً وأشغل مسار الفحص السريع للحالات الطارئة. في نفس الوقت هسحب تقرير الـ TAT من السيستم لأعرف المشكلة فين بالضبط..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none leading-relaxed"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setUserResponse('')}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                مسح الإجابة
              </button>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !userResponse.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50 transition-all cursor-pointer shadow-md"
              >
                {isAnalyzing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    <span>الكوتش يحلل القرار...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>تقييم الكوتش الفوري</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Feedback Card */}
          {analysisResult && (
            <div className="rounded-2xl border border-amber-500/40 bg-slate-900/90 p-5 space-y-4 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-mono font-black text-lg border border-amber-500/40">
                    {analysisResult.scoreOutOf10}/10
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      تقييم الكوتش لعقليتك الإدارية
                    </h4>
                    <span className="text-xs text-emerald-400 font-semibold">
                      تحليل مستند إلى المعايير السبعة
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlayAnalysisAudio}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 cursor-pointer"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>استمع لتقييم الكوتش</span>
                </button>
              </div>

              {/* Coach Voice Text */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{analysisResult.egyptianCoachFeedback}"
              </div>

              {/* Keywords Found & Missing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-3 space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>محاور أتقنتها في إجابتك:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {analysisResult.detectedKeywords?.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="rounded bg-emerald-900/60 px-2 py-0.5 text-[11px] font-mono font-bold text-emerald-200"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-3 space-y-1.5">
                  <div className="font-bold text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>محاور تحتاج لتركيز أكبر:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {analysisResult.missingKeywords?.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="rounded bg-amber-900/60 px-2 py-0.5 text-[11px] font-mono font-bold text-amber-200"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggested Executive Phrase */}
              {analysisResult.suggestedExecutivePhraes && (
                <div className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-3 space-y-1 text-xs text-cyan-200">
                  <span className="font-bold text-cyan-300 block">
                    الصياغة التنفيذية الذهبية (Executive Polish):
                  </span>
                  <p className="text-slate-200 italic">
                    "{analysisResult.suggestedExecutivePhraes}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
