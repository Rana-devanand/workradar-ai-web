"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { PreferencesFormData } from "@/types/onboarding";
import {
  Clock,
  Globe,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  SunMedium,
} from "lucide-react";

interface PreferencesStepProps {
  onContinue: () => void;
  onBack: () => void;
}

const TIMEZONES = [
  "UTC+05:30 (IST - India Standard Time)",
  "UTC-08:00 (PST - Pacific Standard Time)",
  "UTC-05:00 (EST - Eastern Standard Time)",
  "UTC+00:00 (GMT - Greenwich Mean Time)",
  "UTC+01:00 (CET - Central European Time)",
  "UTC+08:00 (SGT - Singapore Time)",
  "UTC+09:00 (JST - Japan Standard Time)",
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const PreferencesStep: React.FC<PreferencesStepProps> = ({ onContinue, onBack }) => {
  const { preferences, updatePreferences } = useOnboardingStore();

  const { register, handleSubmit, setValue, watch } = useForm<PreferencesFormData>({
    defaultValues: preferences,
  });

  const selectedDays = watch("workingDays") || [];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        setValue(
          "workingDays",
          selectedDays.filter((d) => d !== day)
        );
      }
    } else {
      setValue("workingDays", [...selectedDays, day]);
    }
  };

  const onSubmit = (data: PreferencesFormData) => {
    updatePreferences(data);
    onContinue();
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 text-left">
      <div className="space-y-2 text-center sm:text-left">
        <Badge variant="neutral" size="sm">
          Step 3 of 8
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          Workspace Operating Preferences
        </h2>
        <p className="text-sm text-secondary">
          Configure when your AI Chief of Staff evaluates urgency, sends daily briefs, and tracks response SLAs.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Working Hours Row */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            Active Working Hours
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[11px] text-secondary font-mono">Start Time</span>
              <input
                type="time"
                {...register("workStartTime")}
                className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-secondary font-mono">End Time</span>
              <input
                type="time"
                {...register("workEndTime")}
                className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary" />
            Time Zone
          </label>
          <select
            {...register("timezone")}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs cursor-pointer"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        {/* Working Days */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            Active Workdays
          </label>
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {WEEKDAYS.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
                    isSelected
                      ? "bg-primary text-white shadow-xs"
                      : "bg-surface-container-high text-secondary hover:bg-surface-container-highest hover:text-on-surface"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Morning Brief Delivery Timing */}
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-xs flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <SunMedium className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-on-surface">Daily AI Executive Brief</span>
            </div>
            <p className="text-xs text-secondary">
              Receive prioritized action items before your first morning meeting.
            </p>
          </div>
          <input
            type="time"
            {...register("briefingTime")}
            className="rounded-lg border border-outline-variant bg-surface-container-low px-2.5 py-1.5 text-xs text-on-surface font-mono focus:outline-none focus:border-primary"
          />
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
            Save Preferences & Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

