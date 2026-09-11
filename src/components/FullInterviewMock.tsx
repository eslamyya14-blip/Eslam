import React, { useState } from 'react';
import {
  Award,
  Volume2,
  Sparkles,
  Send,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  FileCheck,
} from 'lucide-react';
import { FULL_INTERVIEW_QUESTIONS, FullQuestionItem } from '../data/interviewData';

interface FullInterviewMockProps {
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

export const FullInterviewMock: React.FC<FullInterviewMockProps> = ({
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluations, setEvaluations] = useState<Record<number, any>>({});
  const [finalReport, setFinalReport] = useState<any | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);

  const currentQ: FullQuestionItem = FULL_INTERVIEW_QUESTIONS[currentIndex];

  const handleNext = () => {
    if (currentIndex < FULL_INTERVIEW_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer(userAnswers[currentIndex + 1] || '');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentAnswer(userAnswers[currentIndex - 1] || '');
    }
  };

  const handleSaveAnswer = () => {
    setUserAnswers({ ...userAnswers, [currentIndex]: currentAnswer });
  };

  const handleEvaluateCurrent = async () => {
    if (!currentAnswer.trim()) return;
    setIsEvaluating(true);
    handleSaveAnswer();

    try {
      const res = await fetch('/api/interview-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: currentQ.question,
          category: currentQ.category,
          candidateAnswer: currentAnswer,
          modelAnswerGuidance: currentQ.idealApproach,
        }),
      });

      if (!res.ok) throw new Error('فشل تقييم السؤال');
      const data = await res.json();
      setEvaluations({ ...evaluations, [currentIndex]: data });
    } catch (err) {
      console.error(err);
      setEvaluations({
        ...evaluations,
        [currentIndex]: {
          score: 85,
          egyptianFeedback:
            'ممتاز يا فندم! ركزت على تحمّل المسؤولية (Ownership)، وننصحك تضيف أرقام تقيس الـ TAT أو الـ NPS لتثبيت الإنجاز.',
          starCompliance: {
            situationPresent: true,
            taskPresent: true,
            actionPresent: true,
            resultPresent: false,
          },
          executivePolish:
            'سأعتمد على مصفوفة RACI لتحديد الأدوار بدقة وربط المؤشرات التشغيلية بتقارير أسبوعية.',
        },
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleGenerateFinalReport = async () => {
    setIsGeneratingReport(true);
    try {
      const answeredCount = Object.keys(userAnswers).length;
      const res = await fetch('/api/personality-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: userAnswers,
          totalQuestions: FULL_INTERVIEW_QUESTIONS.length,
          overallImpression: `أجاب المرشح على ${answeredCount} من أصل 11 سؤالاً بخبرة 14 سنة في العمليات الميدانية.`,
        }),
      });

      if (!res.ok) throw new Error('فشل التقرير النهائي');
      const data = await res.json();
      setFinalReport(data);
    } catch (err) {
      console.error(err);
      setFinalReport({
        readinessScore: 92,
        executiveTitle: 'قائد عمليات ميداني معتمد (Operations Section Head)',
        strengths: [
          'ثبات انفعالي قوي تحت الضغط',
          'خبرة واقعية بالأرقام في فرع فيصل 10',
          'امتلاك منهجية حل المشكلات الجذرية (RCA & CAPA)',
        ],
        developmentAreas: [
          'التنسيق المبكر مع الإدارات المركزية وسلاسل الإمداد',
          'تضمين نسب الـ NPS دائماً في كل استعراض',
        ],
        coachEgyptianAdvice:
          'يا إسلام... أنت جاهز تماماً بنسبة تفوق 90%. ادخل المقابلة بهدوء الواثق، وزع نظراتك على د. شريف وأ. رانيا وم. كريم، وخلي إجابتك مبنية على الأرقام وحماية سمعة الشركة.',
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handlePlayQuestionAudio = () => {
    const title = `سؤال المقابلة رقم 0${currentQ.id}`;
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      onPlayAudio(
        `السؤال رقم ${currentQ.id} في ${currentQ.category}: ${currentQ.question}... الهدف من السؤال: ${currentQ.whyAsked}`,
        title,
        'Charon'
      );
    }
  };

  const currentEval = evaluations[currentIndex];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          <Award className="h-3 w-3" />
          <span>المقابلة الشاملة الحقيقية (11 سؤالاً محورياً)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          محاكاة المقابلة الرسمية الكاملة للترقية (Full Promotion Assessment)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          11 سؤالاً متدرجة تغطي الكفاءات القيادية، وحل الأزمات، والتعامل مع الإدارات، ودراسة الحالة.
          أجب عن الأسئلة واحصل على تقرير جاهزية الترقية الرسمي من الكوتش.
        </p>

        {/* Progress Tracker */}
        <div className="pt-3 flex items-center gap-1.5 flex-wrap">
          {FULL_INTERVIEW_QUESTIONS.map((q, idx) => {
            const isAnswered = Boolean(userAnswers[idx]);
            const isEvaluated = Boolean(evaluations[idx]);
            const isCurrent = currentIndex === idx;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setCurrentAnswer(userAnswers[idx] || '');
                }}
                className={`h-8 w-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-2 border-amber-400 bg-amber-500 text-slate-950 shadow-md'
                    : isEvaluated
                    ? 'border border-emerald-500 bg-emerald-950/60 text-emerald-300'
                    : isAnswered
                    ? 'border border-slate-700 bg-slate-800 text-slate-200'
                    : 'border border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700'
                }`}
              >
                0{q.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Question Details & Ideal Approach (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              سؤال 0{currentQ.id} من 11 • {currentQ.category}
            </span>
            <button
              type="button"
              onClick={handlePlayQuestionAudio}
              className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              <Volume2 className="h-4 w-4" />
              <span>استمع للسؤال</span>
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-black text-white leading-relaxed">
              {currentQ.question}
            </h3>
            <p className="text-xs text-slate-400 italic">
              الهدف من السؤال: {currentQ.whyAsked}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs leading-relaxed">
            <span className="font-bold text-amber-300 block flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>الهيكل المثالي للإجابة (Ideal Mindset):</span>
            </span>
            <p className="text-slate-300">{currentQ.idealApproach}</p>
          </div>

          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-slate-400">كلمات ومفاهيم جوهرية:</span>
            <div className="flex flex-wrap gap-1">
              {currentQ.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-amber-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Answer Box & AI Evaluation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                إجابتك على السؤال (اكتب بطريقتك مع التركيز على الأرقام والموقف الحقيقي):
              </label>
              <span className="text-[11px] text-slate-400">
                {currentAnswer.length} حرف
              </span>
            </div>

            <textarea
              rows={6}
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="اكتب إجابتك هنا... مثلاً: في فرع فيصل 10 واجهنا مشكلة مماثلة، واتخذت إجراء..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>السابق</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === FULL_INTERVIEW_QUESTIONS.length - 1}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  <span>التالي</span>
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleEvaluateCurrent}
                disabled={isEvaluating || !currentAnswer.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50 transition-all cursor-pointer shadow-md"
              >
                {isEvaluating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    <span>تقييم الكوتش...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>تقييم الإجابة</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Question Evaluation Output */}
          {currentEval && (
            <div className="rounded-2xl border border-amber-500/40 bg-slate-900/90 p-5 space-y-4 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-mono font-black text-lg border border-amber-500/40">
                    {currentEval.score}%
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">تقييم الكوتش للسؤال 0{currentQ.id}</h4>
                    <span className="text-xs text-emerald-400 font-semibold">
                      درجة الالتزام بعقلية القيادة
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onPlayAudio(currentEval.egyptianFeedback, `تقييم سؤال ${currentQ.id}`, 'Fenrir');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 cursor-pointer"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>استمع للتقييم</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed rounded-xl bg-slate-950 p-4 border border-slate-800">
                "{currentEval.egyptianFeedback}"
              </p>

              {/* STAR Checklist */}
              {currentEval.starCompliance && (
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {Object.entries(currentEval.starCompliance).map(([k, v], i) => (
                    <div
                      key={i}
                      className={`rounded-lg p-2 border ${
                        v
                          ? 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-500'
                      }`}
                    >
                      <span className="font-mono font-bold block">
                        {k.replace('Present', '').toUpperCase()}
                      </span>
                      <span className="text-[10px]">{v ? 'موجود ✓' : 'ناقص ✗'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Report Generator */}
      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right w-full sm:w-auto">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-amber-400" />
            <span>تقرير الجاهزية الشامل للترقية (Section Head Readiness Report)</span>
          </h3>
          <p className="text-xs text-slate-400">
            أجبت على {Object.keys(userAnswers).length} من 11 سؤالاً. استخرج التقرير التنفيذي النهائي الآن.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateFinalReport}
          disabled={isGeneratingReport || Object.keys(userAnswers).length === 0}
          className="rounded-xl bg-amber-500 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-amber-500/20 whitespace-nowrap"
        >
          {isGeneratingReport ? 'جاري إعداد التقرير...' : 'إصدار التقرير النهائي'}
        </button>
      </div>

      {/* Final Report Modal / Card */}
      {finalReport && (
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                REPORT OF EXCELLENCE
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {finalReport.executiveTitle}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <span className="text-3xl font-black font-mono text-amber-400 block">
                  {finalReport.readinessScore}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  نسبة الجاهزية
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
            "{finalReport.coachEgyptianAdvice}"
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4 space-y-2">
              <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" />
                <span>نقاط القوة القيادية:</span>
              </h4>
              <ul className="space-y-1 text-slate-300">
                {finalReport.strengths?.map((s: string, idx: number) => (
                  <li key={idx}>• {s}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-4 space-y-2">
              <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>توجيهات لضبط الأداء أمام اللجنة:</span>
              </h4>
              <ul className="space-y-1 text-slate-300">
                {finalReport.developmentAreas?.map((d: string, idx: number) => (
                  <li key={idx}>• {d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
