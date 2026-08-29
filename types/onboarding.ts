import { z } from "zod";

export const workspaceInfoSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company or workspace name must be at least 2 characters")
    .max(50, "Company name cannot exceed 50 characters"),
  role: z.string().optional(),
  teamSize: z.string().default("2-10"),
});

export type WorkspaceInfoFormData = z.infer<typeof workspaceInfoSchema>;

export const preferencesSchema = z.object({
  workStartTime: z.string().default("09:00"),
  workEndTime: z.string().default("18:00"),
  timezone: z.string().default("UTC+05:30 (IST - India Standard Time)"),
  workingDays: z.array(z.string()).default(["Mon", "Tue", "Wed", "Thu", "Fri"]),
  briefingTime: z.string().default("08:30"),
  language: z.string().default("English (US)"),
});

export type PreferencesFormData = z.infer<typeof preferencesSchema>;

export interface ConnectedIntegrations {
  gmail: boolean;
  googleCalendar: boolean;
  slack: boolean;
  notion: boolean;
  zoom: boolean;
  googleDrive: boolean;
}

export interface PermissionSettings {
  emailMetadata: boolean;
  calendarSchedule: boolean;
  executiveBriefs: boolean;
  smartDrafts: boolean;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  workspaceInfo: WorkspaceInfoFormData;
  preferences: PreferencesFormData;
  integrations: ConnectedIntegrations;
  permissions: PermissionSettings;
  syncCompleted: boolean;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateWorkspaceInfo: (data: Partial<WorkspaceInfoFormData>) => void;
  updatePreferences: (data: Partial<PreferencesFormData>) => void;
  toggleIntegration: (provider: keyof ConnectedIntegrations) => void;
  togglePermission: (permission: keyof PermissionSettings) => void;
  setSyncCompleted: (completed: boolean) => void;
  resetOnboarding: () => void;
}

