"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { WorkspaceInfoFormData } from "@/types/onboarding";
import { Building2, User, Users, ArrowRight, ArrowLeft } from "lucide-react";

interface WorkspaceInfoStepProps {
  onContinue: () => void;
  onBack: () => void;
}

const PRESET_ROLES = [
  "Founder / CEO",
  "Product Manager",
  "Consultant / Agency Lead",
  "Engineering Manager",
  "Sales / BD Director",
  "Chief of Staff",
];

const TEAM_SIZES = [
  { id: "1", label: "Just Me (1)" },
  { id: "2-10", label: "2 - 10 people" },
  { id: "11-50", label: "11 - 50 people" },
  { id: "50+", label: "50+ Enterprise" },
];

export const WorkspaceInfoStep: React.FC<WorkspaceInfoStepProps> = ({ onContinue, onBack }) => {
  const { workspaceInfo, updateWorkspaceInfo } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WorkspaceInfoFormData>({
    defaultValues: workspaceInfo,
  });

  const selectedRole = watch("role");
  const selectedTeamSize = watch("teamSize");

  const onSubmit = (data: WorkspaceInfoFormData) => {
    updateWorkspaceInfo(data);
    onContinue();
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 text-left">
      <div className="space-y-2 text-center sm:text-left">
        <Badge variant="neutral" size="sm">
          Step 2 of 8
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          Tell us about your workspace
        </h2>
        <p className="text-sm text-secondary">
          WorkRadar AI adapts its radar sensitivity and briefing templates based on your team context.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Name (Required) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            Company or Workspace Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("companyName", {
              required: "Company name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
            placeholder="e.g. Acme Corp or Vanguard Studios"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
          />
          {errors.companyName && (
            <p className="text-xs text-red-500 font-medium">{errors.companyName.message}</p>
          )}
        </div>

        {/* Your Role (Optional / Quick Select) */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-secondary flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" />
              Your Role / Focus Area
            </span>
            <span className="text-[11px] font-normal text-secondary font-mono">Optional</span>
          </label>
          
          <div className="flex flex-wrap gap-2">
            {PRESET_ROLES.map((role) => {
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setValue("role", role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-white shadow-xs font-semibold"
                      : "bg-surface-container-high text-secondary hover:text-on-surface hover:bg-surface-container-highest"
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>

          <input
            type="text"
            {...register("role")}
            placeholder="Or type custom title (e.g. Senior Tech Lead)..."
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-xs mt-2"
          />
        </div>

        {/* Team Size */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            Workspace Size
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {TEAM_SIZES.map((size) => {
              const isSelected = selectedTeamSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setValue("teamSize", size.id)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "border-primary bg-primary/8 text-primary font-bold shadow-xs ring-1 ring-primary"
                      : "border-outline-variant/70 bg-surface-container-lowest text-secondary hover:border-outline-variant hover:text-on-surface"
                  }`}
                >
                  <span>{size.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6 flex items-center justify-between gap-4 border-t border-outline-variant/50">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onBack}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="text-xs uppercase tracking-wider text-secondary"
          >
            Back
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="px-6 text-xs uppercase tracking-wider font-bold shadow-md shadow-primary/20"
          >
            Save & Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

