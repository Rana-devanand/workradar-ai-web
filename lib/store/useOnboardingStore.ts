import { create } from "zustand";
import {
  OnboardingState,
  WorkspaceInfoFormData,
  PreferencesFormData,
  ConnectedIntegrations,
  PermissionSettings,
} from "@/types/onboarding";

const initialWorkspaceInfo: WorkspaceInfoFormData = {
  companyName: "Acme Innovations",
  role: "Founder / CEO",
  teamSize: "2-10",
};

const initialPreferences: PreferencesFormData = {
  workStartTime: "09:00",
  workEndTime: "18:00",
  timezone: "UTC+05:30 (IST - India Standard Time)",
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  briefingTime: "08:30",
  language: "English (US)",
};

const initialIntegrations: ConnectedIntegrations = {
  gmail: true,
  googleCalendar: true,
  slack: false,
  notion: false,
  zoom: false,
  googleDrive: false,
};

const initialPermissions: PermissionSettings = {
  emailMetadata: true,
  calendarSchedule: true,
  executiveBriefs: true,
  smartDrafts: true,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 1,
  totalSteps: 8,
  workspaceInfo: initialWorkspaceInfo,
  preferences: initialPreferences,
  integrations: initialIntegrations,
  permissions: initialPermissions,
  syncCompleted: false,

  setStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  updateWorkspaceInfo: (data) =>
    set((state) => ({
      workspaceInfo: { ...state.workspaceInfo, ...data },
    })),

  updatePreferences: (data) =>
    set((state) => ({
      preferences: { ...state.preferences, ...data },
    })),

  toggleIntegration: (provider) =>
    set((state) => ({
      integrations: {
        ...state.integrations,
        [provider]: !state.integrations[provider],
      },
    })),

  togglePermission: (permission) =>
    set((state) => ({
      permissions: {
        ...state.permissions,
        [permission]: !state.permissions[permission],
      },
    })),

  setSyncCompleted: (completed) => set({ syncCompleted: completed }),

  resetOnboarding: () =>
    set({
      currentStep: 1,
      workspaceInfo: initialWorkspaceInfo,
      preferences: initialPreferences,
      integrations: initialIntegrations,
      permissions: initialPermissions,
      syncCompleted: false,
    }),
}));

