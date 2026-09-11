export interface ManagerStep {
  id: string;
  stepNumber: number;
  keywordEn: string;
  keywordAr: string;
  titleEn: string;
  titleAr: string;
  keyQuestionEn: string;
  keyQuestionAr: string;
  mantraEn: string;
  mantraAr: string;
  coachRuleEn: string;
  coachRuleAr: string;
  audioPromptText: string;
  caseStudy: {
    context: string;
    action: string;
    metric: string;
  };
  deepDivePoints: {
    heading: string;
    explanation: string;
    term: string;
  }[];
  interactiveCheck: {
    question: string;
    options: {
      text: string;
      isManagerMindset: boolean;
      feedback: string;
    }[];
  };
}

export interface CoachVoice {
  id: string;
  name: string;
  labelAr: string;
  gender: 'male' | 'female';
  toneAr: string;
}

export interface SimulationCase {
  id: string;
  title: string;
  category: string;
  problemStatement: string;
  scenario?: string;
  difficulty?: string;
  data: string;
  risk: string;
  immediateAction: string;
  rootCause: string;
  capa: string;
  stakeholders: string;
  kpiAndClosure: string;
}

export interface AIAnalysisResult {
  summary: string;
  dataStep: {
    headline: string;
    advice: string;
    keyQuestion: string;
    suggestedMetrics: string[];
  };
  riskStep: {
    headline: string;
    riskLevel: 'High' | 'Medium' | 'Low' | string;
    priorityReason: string;
    keyQuestion: string;
  };
  actionStep: {
    headline: string;
    immediateAction: string;
    ownershipStatement: string;
    keyQuestion: string;
  };
  rcaStep: {
    headline: string;
    whyAnalysis: string[];
    bottleneck: string;
    keyQuestion: string;
  };
  capaStep: {
    headline: string;
    corrective: string;
    preventive: string;
    sla: string;
    standardizationPlan: string;
    keyQuestion: string;
  };
  stakeholdersStep: {
    headline: string;
    departments: string[];
    mitigation: string;
    escalationTrigger: string;
    keyQuestion: string;
  };
  followUpStep: {
    headline: string;
    kpi: string;
    closureCriteria: string;
    documentationArtifact: string;
    keyQuestion: string;
  };
  coachMantra: string;
}

export interface StepNote {
  text: string;
  updatedAt: string;
}

export interface StarStory {
  id: string;
  num: number;
  title: string;
  tags: string[];
  isStarHighlight?: boolean;
  metricBadge: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  insight: string;
  audioPromptQuestion?: string;
  audioPromptResponse?: string;
}

export interface InterviewQnA {
  id: string;
  num: number;
  title: string;
  kicker: string;
  question: string;
  answer: string;
  coachTips?: string;
  supportingStoryId?: string;
  points?: string[];
}

export interface LeadershipInterviewQuestion {
  id: string;
  num: number;
  title: string;
  kicker: string;
  competency: string;
  competencyAr: string;
  question: string;
  questionAudioPrompt: string;
  star: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  fullAnswer: string;
  answerAudioPrompt: string;
  coachTips: string;
  goldenPhrase: string;
  evaluationRubrics: string[];
  followUpQuestion: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced' | 'Executive';
  supportingMetrics?: string;
}

export interface CPIQuestion {
  id: string;
  num: number;
  category: 'fast_choice' | 'policy_resistance' | 'open_scenario' | 'comprehensive';
  categoryLabel: string;
  question: string;
  answer: string;
  verdictTag: string;
  supportingStoryId?: string;
}

export interface ComprehensiveScenario {
  id: string;
  num: number;
  title: string;
  caseText: string;
  answerText: string;
  alternativeOrEscalation?: string;
  documentationMethod?: string;
}

export interface ElevatorMCQ {
  id: string;
  q: string;
  opts: string[];
  correct: number;
  exp: string;
}

export interface ElevatorOpenQ {
  id: string;
  kicker: string;
  q: string;
  points: string[];
  context?: string;
}

export interface ElevatorLevelDef {
  levelNum: number;
  tag: string;
  title: string;
  desc: string;
  icon: string;
  requiredPrevLevel: number;
  type: 'mcq' | 'open' | 'curveball';
}

export interface InterviewEvaluationResult {
  score: number;
  star_hits: {
    S: boolean;
    T: boolean;
    A: boolean;
    R: boolean;
  };
  verdict: string;
  verdict_sub: string;
  strengths: string[];
  improvements: string[];
  suggested_sentence?: string;
  follow_up_question?: string;
}

export interface PersonalityAnalysisReport {
  executive_summary: string;
  leadership_style: string;
  problem_solving_approach: string;
  stakeholder_management: string;
  core_strengths: string[];
  growth_areas: string[];
  hiring_recommendation: string;
}

export type DeckTemplateId =
  | 'alfa_boardroom'
  | 'lean_six_sigma'
  | 'rapid_committee'
  | 'official_memo';

export type DeckLanguageMode = 'bilingual' | 'arabic' | 'english';

export interface CaseSlideItem {
  slideNumber: number;
  slideTitleAr: string;
  slideTitleEn: string;
  pillarRef?: string;
  bulletPointsAr: string[];
  bulletPointsEn: string[];
  candidateScriptAr: string;
  candidateScriptEn?: string;
  keyTakeawayAr?: string;
  keyTakeawayEn?: string;
}

export interface CaseDepartmentInteraction {
  department: string;
  departmentEn?: string;
  currentDefect: string;
  currentDefectEn?: string;
  proposedSLA: string;
  proposedSLAEn?: string;
}

export interface CaseCommitteeQuestion {
  interviewer: string;
  interviewerEn?: string;
  question: string;
  questionEn?: string;
  modelRebuttal: string;
  modelRebuttalEn?: string;
}

export interface SolvedCaseResultData {
  titleAr: string;
  titleEn: string;
  caseSummaryAr: string;
  caseSummaryEn: string;
  departmentInteractions: CaseDepartmentInteraction[];
  presentationDeck: CaseSlideItem[];
  cluster15CasesStrategy: {
    bucketName: string;
    bucketNameEn?: string;
    speedSolvingSecret: string;
    goldenFormula: string;
    goldenFormulaEn?: string;
  };
  committeeQuestions: CaseCommitteeQuestion[];
}

