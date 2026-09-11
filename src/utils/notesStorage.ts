import { StepNote, ManagerStep } from '../types';
import { MANAGER_STEPS } from '../data/lessonData';

const STORAGE_KEY = 'manager_mode_step_notes_v1';
const NOTES_UPDATED_EVENT = 'manager_mode_notes_updated';

const CUSTOM_STEPS_STORAGE_KEY = 'manager_mode_custom_steps_v1';
const CUSTOM_STEPS_UPDATED_EVENT = 'manager_mode_custom_steps_updated';

export const getStepNotes = (): Record<string, StepNote> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read notes from localStorage:', e);
    return {};
  }
};

export const getAllNotes = getStepNotes;

export const getStepNote = (stepId: string): string => {
  const notes = getStepNotes();
  return notes[stepId]?.text || '';
};

export const getStepNoteDetails = (stepId: string): StepNote | null => {
  const notes = getStepNotes();
  return notes[stepId] || null;
};

export const saveStepNote = (stepId: string, text: string): void => {
  try {
    const notes = getStepNotes();
    if (!text.trim()) {
      delete notes[stepId];
    } else {
      notes[stepId] = {
        text: text.trim(),
        updatedAt: new Date().toISOString(),
      };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    window.dispatchEvent(new CustomEvent(NOTES_UPDATED_EVENT, { detail: { stepId, notes } }));
  } catch (e) {
    console.error('Failed to save note to localStorage:', e);
  }
};

export const clearStepNote = (stepId: string): void => {
  try {
    const notes = getStepNotes();
    delete notes[stepId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    window.dispatchEvent(new CustomEvent(NOTES_UPDATED_EVENT, { detail: { stepId, notes } }));
  } catch (e) {
    console.error('Failed to clear note from localStorage:', e);
  }
};

export const subscribeToNotes = (callback: () => void): (() => void) => {
  const handleUpdate = () => callback();
  window.addEventListener(NOTES_UPDATED_EVENT, handleUpdate);
  window.addEventListener('storage', handleUpdate);
  return () => {
    window.removeEventListener(NOTES_UPDATED_EVENT, handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
};

// Custom Steps / Pillars Storage
export const getStoredCustomSteps = (): ManagerStep[] | null => {
  try {
    const raw = localStorage.getItem(CUSTOM_STEPS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return null;
  } catch (e) {
    console.error('Failed to read custom steps from localStorage:', e);
    return null;
  }
};

export const getCustomStepsFromStorage = (): ManagerStep[] => {
  return getStoredCustomSteps() || MANAGER_STEPS;
};

export const saveCustomStepsToStorage = (steps: ManagerStep[]): void => {
  try {
    localStorage.setItem(CUSTOM_STEPS_STORAGE_KEY, JSON.stringify(steps));
    window.dispatchEvent(new CustomEvent(CUSTOM_STEPS_UPDATED_EVENT, { detail: { steps } }));
  } catch (e) {
    console.error('Failed to save custom steps to localStorage:', e);
  }
};

export const resetCustomStepsStorage = (): void => {
  try {
    localStorage.removeItem(CUSTOM_STEPS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CUSTOM_STEPS_UPDATED_EVENT, { detail: { steps: null } }));
  } catch (e) {
    console.error('Failed to reset custom steps:', e);
  }
};

export const resetCustomStepsInStorage = resetCustomStepsStorage;

export const subscribeToCustomSteps = (callback: () => void): (() => void) => {
  const handleUpdate = () => callback();
  window.addEventListener(CUSTOM_STEPS_UPDATED_EVENT, handleUpdate);
  window.addEventListener('storage', handleUpdate);
  return () => {
    window.removeEventListener(CUSTOM_STEPS_UPDATED_EVENT, handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
};
