import React, { useState } from 'react';
import {
  Building2,
  Volume2,
  Sparkles,
  CheckCircle,
  Copy,
  Check,
  Mail,
  Users,
  MapPin,
  Clock,
  Send,
  Play,
  Pause,
} from 'lucide-react';
import {
  AMG_PANEL_MEMBERS,
  LIVE_DAY_STAGES,
  THANK_YOU_EMAIL_TEMPLATE,
  DayStageItem,
} from '../data/liveDayData';

interface LiveDaySimulationViewProps {
  onPlayAudio: (text: string, title?: string, voice?: string) => void;
  onStopAudio: () => void;
  isPlaying: boolean;
  currentAudioTitle: string;
}

export const LiveDaySimulationView: React.FC<LiveDaySimulationViewProps> = ({
  onPlayAudio,
  onStopAudio,
  isPlaying,
  currentAudioTitle,
}) => {
  const [activeStageId, setActiveStageId] = useState<string>(LIVE_DAY_STAGES[0].id);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const currentStage =
    LIVE_DAY_STAGES.find((s) => s.id === activeStageId) || LIVE_DAY_STAGES[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(
      `Subject: ${THANK_YOU_EMAIL_TEMPLATE.subject}\n\n${THANK_YOU_EMAIL_TEMPLATE.body}`
    );
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePlayStage = (stage: DayStageItem) => {
    const title = `محاكاة: ${stage.title}`;
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      const fullText = stage.dialogues
        .map((d) => `${d.speaker} (${d.role}): ${d.text}`)
        .join(' ... ');
      onPlayAudio(fullText, title, 'Fenrir');
    }
  };

  const handlePlaySingleDialogue = (speaker: string, text: string, voice = 'Fenrir') => {
    const title = `${speaker}: ${text.substring(0, 25)}...`;
    if (isPlaying && currentAudioTitle === title) {
      onStopAudio();
    } else {
      onPlayAudio(text, title, voice);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Espana Plaza Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-950 p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300">
            <Building2 className="h-3.5 w-3.5" />
            <span>محاكاة يوم المقابلة الميداني الحي • إسبانيا بلازا</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-amber-400" />
              <span>Espana Plaza - AMG HQ</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-400" />
              <span>13 Sep | 02:00 PM</span>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
            سيناريو اليوم الكامل: تقييم Section Head الفروع والدعم التشغيلي
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            محاكاة كاملة لرحلة اليوم الحقيقي للمرشح <strong className="text-amber-300">إسلام محمد كامل الضبع</strong>،
            بدءاً من الصباح والوصول لإسبانيا بلازا، حتى دخول غرفة الاجتماعات ومواجهة لجنة التقييم
            (د. شريف، أ. رانيا، م. كريم) وختام المقابلة برسالة الشكر الرسمية.
          </p>
        </div>

        {/* Panel Members Row */}
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-xs font-bold text-slate-400 block mb-2.5">
            أعضاء لجنة التقييم الرسمية (AMG Assessment Committee):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {AMG_PANEL_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{member.avatarEmoji}</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-white">
                        {member.name}
                      </h4>
                      <span className="text-[10px] text-amber-400 font-medium">
                        {member.title}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handlePlaySingleDialogue(
                        member.name,
                        `أهلاً يا إسلام، أنا ${member.name}، ${member.title}. ${member.focusArea}`,
                        member.voice
                      )
                    }
                    className="p-1 rounded text-slate-400 hover:text-amber-300 cursor-pointer"
                    title={`استمع لصوت ${member.name}`}
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  <strong className="text-slate-300">نطاق التركيز:</strong> {member.focusArea}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stages Stepper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {LIVE_DAY_STAGES.map((stage, idx) => {
          const isSelected = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStageId(stage.id)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>{stage.icon}</span>
              <span>0{idx + 1}. {stage.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stage Overview & Action Checklist (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-md">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">
                {currentStage.kicker} • {currentStage.timeLabel}
              </span>
              <h3 className="text-base sm:text-lg font-black text-white mt-1">
                {currentStage.title}
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentStage.overview}
            </p>

            {/* Coach Mantra Box */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 space-y-1 text-xs">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>قاعدة الكوتش في هذه المرحلة:</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-semibold">
                "{currentStage.coachMantra}"
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                قائمة المهام السريعة (Quick Checklist):
              </span>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {currentStage.actionChecklist.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Interactive Dialogue Rehearsal (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  المحاكاة الصوتية الحية للحوار
                </span>
                <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                  سيناريو الحديث المتبادل في {currentStage.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handlePlayStage(currentStage)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Volume2 className="h-4 w-4" />
                <span>
                  {isPlaying && currentAudioTitle === `محاكاة: ${currentStage.title}`
                    ? 'إيقاف الصوت'
                    : 'تشغيل الحوار كاملاً'}
                </span>
              </button>
            </div>

            {/* Dialogues List */}
            <div className="space-y-3">
              {currentStage.dialogues.map((dlg, idx) => {
                const isCand = dlg.isCandidate;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 transition-all ${
                      isCand
                        ? 'border-amber-500/40 bg-amber-500/10 text-right'
                        : 'border-slate-800 bg-slate-950 text-right'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-black ${
                            isCand ? 'text-amber-300 font-bold' : 'text-slate-200'
                          }`}
                        >
                          {dlg.speaker}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({dlg.role})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handlePlaySingleDialogue(dlg.speaker, dlg.text, dlg.audioVoice)
                        }
                        className="text-slate-400 hover:text-amber-300 p-1 rounded cursor-pointer"
                        title="استمع لهذه العبارة"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                      "{dlg.text}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Email Modal / Banner (Stage 8) */}
      {activeStageId === 'closing_day' && (
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/95 p-6 sm:p-7 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  رسالة الشكر الرسمية بعد المقابلة (Executive Thank You Email)
                </h3>
                <p className="text-xs text-slate-400">
                  إرسال هذا الإيميل خلال 24 ساعة يثبت احترافيتك وحرصك على المتابعة (Follow-up)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedEmail ? 'تم نسخ الإيميل!' : 'نسخ نص الإيميل'}</span>
            </button>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800 text-slate-300">
              <strong className="text-emerald-400">Subject:</strong> {THANK_YOU_EMAIL_TEMPLATE.subject}
            </div>
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 text-slate-200 whitespace-pre-line leading-relaxed">
              {THANK_YOU_EMAIL_TEMPLATE.body}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
