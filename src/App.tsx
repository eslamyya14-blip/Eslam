import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, AppTab } from './components/Navbar';
import { HeroCoachIntro } from './components/HeroCoachIntro';
import { ManagerFormulaBar } from './components/ManagerFormulaBar';
import { StepCard } from './components/StepCard';
import { CheatSheetView } from './components/CheatSheetView';
import { OperationsSimulator } from './components/OperationsSimulator';
import { StoryBankView } from './components/StoryBankView';
import { FullInterviewMock } from './components/FullInterviewMock';
import { InterviewCoach } from './components/InterviewCoach';
import { ElevatorSimulator } from './components/ElevatorSimulator';
import { CPIScenariosView } from './components/CPIScenariosView';
import { LiveDaySimulationView } from './components/LiveDaySimulationView';
import { InteractiveCaseSolverView } from './components/InteractiveCaseSolverView';
import { ManagerModeMasterStudio } from './components/ManagerModeMasterStudio';
import { CustomAxesEditor } from './components/CustomAxesEditor';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { audioCoach, AudioPlayerState } from './utils/audioEngine';
import { MANAGER_STEPS, COACH_VOICES } from './data/lessonData';
import {
  getCustomStepsFromStorage,
  saveCustomStepsToStorage,
  resetCustomStepsInStorage,
} from './utils/notesStorage';
import { ManagerStep } from './types';

export function App() {
  // Navigation & Content State
  const [activeTab, setActiveTab] = useState<AppTab>('case_solver');
  const [steps, setSteps] = useState<ManagerStep[]>(getCustomStepsFromStorage());
  const [activeStepId, setActiveStepId] = useState<string>('data');

  // Audio Engine State
  const [audioState, setAudioState] = useState<AudioPlayerState>(audioCoach.getState());
  const [currentVoice, setCurrentVoice] = useState<string>('Fenrir');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);

  // Subscribe to Audio Engine state changes
  useEffect(() => {
    const unsubscribe = audioCoach.subscribeState((state) => {
      setAudioState({ ...state });
    });
    return () => unsubscribe();
  }, []);

  const handleVoiceChange = (voiceId: string) => {
    setCurrentVoice(voiceId);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    audioCoach.setSpeed(speed);
  };

  const handleSpeedCycle = () => {
    const speeds = [0.85, 1.0, 1.2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    handleSpeedChange(speeds[nextIdx]);
  };

  // Playback handlers
  const handlePlayAudio = useCallback(
    async (text: string, title?: string, voice?: string) => {
      try {
        setIsLoadingAudio(true);
        await audioCoach.playTextWithGemini(
          text,
          title || 'توجيه الكوتش',
          voice || currentVoice,
          playbackSpeed
        );
      } catch (err) {
        console.error('Audio playback error:', err);
      } finally {
        setIsLoadingAudio(false);
      }
    },
    [currentVoice, playbackSpeed]
  );

  const handleStopAudio = () => {
    audioCoach.stop();
  };

  const handlePlayPause = () => {
    if (audioState.isPlaying) {
      audioCoach.pause();
    } else {
      audioCoach.resume();
    }
  };

  const handleSeek = (progress: number) => {
    audioCoach.seek(progress);
  };

  const handleReplay = () => {
    audioCoach.seek(0);
    audioCoach.resume();
  };

  // Full foundational audio lesson
  const handlePlayFullLesson = async () => {
    const title = 'الجلسة التأسيسية الشاملة لعقلية المدير';
    if (audioState.isPlaying && audioState.currentTitle === title) {
      audioCoach.pause();
      return;
    }

    const lessonParts: string[] = [
      'يا إسلام... اسمعني كويس، وخلي صوتي في ودنك وأنت داخل مقابلة إسبانيا بلازا. ...',
      'المدير المحترف مش بيحفظ ليستة كلام؛ عقلية المدير هي طريقة تفكير هادية، واثقة، ومبنية على سبع كلمات: ...',
    ];

    steps.forEach((step, idx) => {
      lessonParts.push(
        `الكلمة رقم 0${idx + 1}... ${step.keywordEn}... يعني: ${step.keywordAr}... ... ${step.keyQuestionAr}... ... وقاعدتها الذهبية: ${step.mantraAr}... ...`
      );
    });

    lessonParts.push(
      'مع التكرار يا إسلام... هتبدأ تسمع تلقائياً: المشكلة داتا... الخطر أولوية... الأكشن مسؤولية... الخنقة جذر المشكلة... والحل وقاية... بالتوفيق يا بطل!'
    );

    const fullScript = lessonParts.join(' ');
    await handlePlayAudio(fullScript, title, 'Fenrir');
  };

  // Play 7 Formula with deliberate pauses
  const handlePlayFormula = async () => {
    const title = 'معادلة التفكير الإداري بالوقفات';
    if (audioState.isPlaying && audioState.currentTitle === title) {
      audioCoach.pause();
      return;
    }

    const formulaScript =
      'اسمع المعادلة يا إسلام، وركز في الوقفات: ... Problem = Data ... ... Risk = Priority ... ... Action = Ownership ... ... RCA = Bottleneck ... ... CAPA = Fix & Prevent ... ... Stakeholders = RACI Alignment ... ... Follow-up = Closing Loop.';

    await handlePlayAudio(formulaScript, title, 'Fenrir');
  };

  // Play individual step
  const handlePlayStepAudio = async (step: ManagerStep) => {
    const title = `المحور 0${step.stepNumber}: ${step.titleAr}`;
    if (audioState.isPlaying && audioState.currentTitle === title) {
      audioCoach.pause();
      return;
    }

    await handlePlayAudio(step.audioPromptText, title, currentVoice);
  };

  // Play Cheat Sheet Summary
  const handlePlaySummary = async () => {
    const title = 'الموجز الصوتي السريع للمحاور السبعة';
    if (audioState.isPlaying && audioState.currentTitle === title) {
      audioCoach.pause();
      return;
    }

    const summaryScript =
      'موجز المحاور السبعة لعقلية رئيس القسم: ... 1) الداتا: المشكلة داتا مش إحساس. ... 2) الأولوية: الخطر الطبي يحكم. ... 3) المسؤولية: تحرك فوري واحتواء. ... 4) التحليل: اكتشف الخنقة بالـ 5 Whys. ... 5) الإجراء الوقائي: اربط بـ SLA لمنع تكرار الخطأ. ... 6) الشركاء: مصفوفة RACI واضحة. ... 7) المتابعة: تقرير رقمي يقفل الملف نهائياً.';

    await handlePlayAudio(summaryScript, title, 'Fenrir');
  };

  // Steps customization handlers
  const handleSaveSteps = (updated: ManagerStep[]) => {
    setSteps(updated);
    saveCustomStepsToStorage(updated);
  };

  const handleResetSteps = () => {
    resetCustomStepsInStorage();
    setSteps(MANAGER_STEPS);
  };

  const activeVoiceObj = COACH_VOICES.find((v) => v.id === currentVoice) || COACH_VOICES[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentVoice={currentVoice}
        onVoiceChange={handleVoiceChange}
        playbackSpeed={playbackSpeed}
        onSpeedChange={handleSpeedChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPlayFullLesson={handlePlayFullLesson}
        isPlayingFullLesson={
          audioState.isPlaying &&
          audioState.currentTitle === 'الجلسة التأسيسية الشاملة لعقلية المدير'
        }
      />

      {/* Main Container */}
      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        {/* Tab 0: Master Foundational Lesson (MANAGER MODE - Egyptian Arabic Coach) */}
        {activeTab === 'master_lesson' && (
          <ManagerModeMasterStudio
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 1: Case Solver */}
        {activeTab === 'case_solver' && (
          <InteractiveCaseSolverView
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 2: Live Day Simulation */}
        {activeTab === 'live_day' && (
          <LiveDaySimulationView
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 3: Custom Axes Editor (User request) */}
        {activeTab === 'axes' && (
          <CustomAxesEditor
            steps={steps}
            onSaveSteps={handleSaveSteps}
            onResetSteps={handleResetSteps}
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 4: STAR Interview Coach */}
        {activeTab === 'coach' && (
          <InterviewCoach
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 5: Full Mock Interview (11 Questions) */}
        {activeTab === 'mock' && (
          <FullInterviewMock
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 6: 7-Step Foundational Lesson */}
        {activeTab === 'lesson' && (
          <div className="space-y-6 animate-fadeIn pb-16">
            <HeroCoachIntro
              onPlayFullLesson={handlePlayFullLesson}
              isPlayingFull={
                audioState.isPlaying &&
                audioState.currentTitle === 'الجلسة التأسيسية الشاملة لعقلية المدير'
              }
              isLoadingAudio={isLoadingAudio}
              activeVoiceName={activeVoiceObj.labelAr}
            />

            <ManagerFormulaBar
              onPlayFormula={handlePlayFormula}
              isPlayingFormula={
                audioState.isPlaying &&
                audioState.currentTitle === 'معادلة التفكير الإداري بالوقفات'
              }
              onSelectStep={(stepId) => {
                setActiveStepId(stepId);
                const el = document.getElementById(`step-${stepId}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              activeStepId={activeStepId}
              steps={steps}
            />

            {/* Steps List */}
            <div className="space-y-6">
              {steps.map((step) => (
                <StepCard
                  key={step.id}
                  step={step}
                  isPlayingThisStep={
                    audioState.isPlaying &&
                    audioState.currentTitle === `المحور 0${step.stepNumber}: ${step.titleAr}`
                  }
                  isLoadingAudio={isLoadingAudio}
                  onPlayStepAudio={handlePlayStepAudio}
                  isActive={activeStepId === step.id}
                  onPlayAudio={handlePlayAudio}
                  onStopAudio={handleStopAudio}
                  currentAudioTitle={audioState.currentTitle}
                  isPlaying={audioState.isPlaying}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Elevator Pitch */}
        {activeTab === 'elevator' && (
          <ElevatorSimulator
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 8: Story Bank (10 Stories) */}
        {activeTab === 'stories' && (
          <StoryBankView
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 9: CPI Scenarios */}
        {activeTab === 'scenarios' && (
          <CPIScenariosView
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 10: Operations Simulator */}
        {activeTab === 'simulator' && (
          <OperationsSimulator
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            isPlaying={audioState.isPlaying}
            currentAudioTitle={audioState.currentTitle}
          />
        )}

        {/* Tab 11: Cheat Sheet */}
        {activeTab === 'cheatsheet' && (
          <CheatSheetView
            steps={steps}
            onPlaySummary={handlePlaySummary}
            isPlayingSummary={
              audioState.isPlaying &&
              audioState.currentTitle === 'الموجز الصوتي السريع للمحاور السبعة'
            }
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            currentAudioTitle={audioState.currentTitle}
            isPlaying={audioState.isPlaying}
          />
        )}
      </main>

      {/* Persistent Bottom Audio Player Bar */}
      {(audioState.isPlaying || audioState.duration > 0 || audioState.currentTitle) && (
        <AudioPlayerBar
          isPlaying={audioState.isPlaying}
          trackTitle={audioState.currentTitle}
          progress={audioState.progress}
          currentTime={audioState.currentTime}
          duration={audioState.duration}
          speed={playbackSpeed}
          voiceName={activeVoiceObj.labelAr}
          onPlayPause={handlePlayPause}
          onStop={handleStopAudio}
          onSeek={handleSeek}
          onSpeedCycle={handleSpeedCycle}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
}

export default App;
