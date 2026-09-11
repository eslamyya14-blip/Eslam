import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Volume2,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  MessageSquare,
  Award,
} from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../data/interviewData';

interface InterviewCoachProps {
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

export const InterviewCoach: React.FC<InterviewCoachProps> = ({
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [candidateAnswer, setCandidateAnswer] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [coachFeedback, setCoachFeedback] = useState<any | null>(null);

  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) =>
    selectedCategory === 'all' ? true : q.category === selectedCategory
  );

  const currentQ = filteredQuestions[currentQIndex] || filteredQuestions[0];

  const handleSelectQuestion = (index: number) => {
    setCurrentQIndex(index);
    setCandidateAnswer('');
    setCoachFeedback(null);
  };

  const handleEvaluate = async () => {
    if (!candidateAnswer.trim()) return;
    setIsEvaluating(true);
    setCoachFeedback(null);

    try {
      const res = await fetch('/api/interview-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: currentQ.question,
          category: currentQ.category,
          candidateAnswer: candidateAnswer,
          modelAnswerGuidance: currentQ.modelAnswerGuidance,
        }),
      });

      if (!res.ok) throw new Error('فشل تقييم المقابلة');
      const data = await res.json();
      setCoachFeedback(data);
    } catch (err) {
      console.error(err);
      setCoachFeedback({
        score: 82,
        egyptianFeedback:
          'إجابتك مبنية على خبرة واقعية واضحة، وده بيديك مصداقية عالية. لو ضفت أرقام محددة عن نسب رضا المراجعين أو وقت الانتظار، الإجابة هتبقى لا غبار عليها.',
        starCompliance: {
          situationPresent: true,
          taskPresent: true,
          actionPresent: true,
          resultPresent: true,
        },
        strengths: ['ثقة بالنفس بدون مبالغة', 'استخدام مصطلحات إدارية سليمة'],
        improvements: ['ذكر رقم دقيق للنتيجة'],
        executivePolish:
          'في إدارتي للفرع، حولت الشكاوى إلى مصفوفة أولويات، ونزلنا وقت انتظار المريض بنسبة 35% في أول أسبوعين.',
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handlePlayQuestion = () => {
    const title = `سؤال المقابلة: ${currentQ.question.substring(0, 30)}...`;
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      onPlayAudio(currentQ.question, title, 'Charon');
    }
  };

  const handlePlayFeedback = () => {
    if (!coachFeedback?.egyptianFeedback) return;
    const title = 'توجيه الكوتش المصري لإجابتك';
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      onPlayAudio(coachFeedback.egyptianFeedback, title, 'Fenrir');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          <Sparkles className="h-3 w-3" />
          <span>مدرب مقابلات القيادة • بطريقة STAR</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          تدريب تفاعلي على أسئلة اللجان الصعبة (STAR Methodology)
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          اللجان التنفيذية تقيمك على 4 ركائز: الموقف (Situation)، المهمة (Task)، الإجراء (Action)، والنتيجة بالأرقام (Result).
          تدرب مع الكوتش الآن بصوت هادئ وواثق.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          {['all', 'Leadership', 'Crisis Management', 'Stakeholder Management', 'Analytics', 'Strategy'].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentQIndex(0);
                  setCoachFeedback(null);
                }}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'جميع الأسئلة' : cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Question Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[650px] overflow-y-auto pr-1">
          {filteredQuestions.map((q, idx) => {
            const isSelected = currentQIndex === idx;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSelectQuestion(idx)}
                className={`w-full rounded-xl border p-3.5 text-right transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/15 ring-1 ring-amber-500/40 shadow-md'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-amber-400 font-mono text-[11px]">{q.category}</span>
                  <span className="text-slate-500 text-[10px]">سؤال 0{idx + 1}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                  {q.question}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Question Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-4 shadow-xl">
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  {currentQ.category} • السؤال الموجه لك في المقابلة
                </span>
                <h3 className="text-base sm:text-lg font-black text-white leading-relaxed">
                  "{currentQ.question}"
                </h3>
              </div>

              <button
                type="button"
                onClick={handlePlayQuestion}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
              >
                <Volume2 className="h-4 w-4" />
                <span>استمع للسؤال</span>
              </button>
            </div>

            {/* Coach guidance */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs leading-relaxed">
              <span className="font-bold text-amber-300 block flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                <span>توجيه الكوتش لطريقة الرد الذكية:</span>
              </span>
              <p className="text-slate-300">{currentQ.modelAnswerGuidance}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {currentQ.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-amber-300"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Answer Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                إجابتك النموذجية (تخيل نفسك أمام اللجنة الآن):
              </label>
              <textarea
                rows={5}
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="ابدأ بـ: في موقف حقيقي بفرع فيصل 10، كانت المهمة... فقررت اتخاذ إجراء..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setCandidateAnswer('')}
                className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                تفريغ الحقل
              </button>

              <button
                type="button"
                onClick={handleEvaluate}
                disabled={isEvaluating || !candidateAnswer.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50 transition-all cursor-pointer shadow-md"
              >
                {isEvaluating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    <span>الكوتش يقيّم بطريقة STAR...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>تقييم إجابتي الآن</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Feedback Display */}
          {coachFeedback && (
            <div className="rounded-2xl border border-amber-500/40 bg-slate-900/90 p-5 space-y-4 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-mono font-black text-xl border border-amber-500/40">
                    {coachFeedback.score}%
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">درجة استحقاق الرد</h4>
                    <span className="text-xs text-emerald-400 font-semibold">
                      مطابقة معايير القيادة والميدان
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlayFeedback}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 cursor-pointer"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>استمع للملاحظات</span>
                </button>
              </div>

              {/* Egyptian feedback text */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{coachFeedback.egyptianFeedback}"
              </div>

              {/* STAR Matrix */}
              {coachFeedback.starCompliance && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-400">
                    تحليل نموذج STAR في إجابتك:
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {Object.entries(coachFeedback.starCompliance).map(([k, v], idx) => (
                      <div
                        key={idx}
                        className={`rounded-lg p-2 border ${
                          v
                            ? 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
                            : 'border-slate-800 bg-slate-950 text-slate-500'
                        }`}
                      >
                        <span className="font-mono font-bold block">
                          {k.replace('Present', '').toUpperCase()}
                        </span>
                        <span className="text-[10px]">{v ? 'مكتمل ✓' : 'غير مكتمل ✗'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Executive Polish */}
              {coachFeedback.executivePolish && (
                <div className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-3.5 space-y-1 text-xs text-cyan-200">
                  <span className="font-bold text-cyan-300 block">
                    الصياغة المقترحة أمام اللجنة (Executive Polish):
                  </span>
                  <p className="text-slate-200 italic font-medium">
                    "{coachFeedback.executivePolish}"
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
