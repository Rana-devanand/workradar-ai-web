"use client";

import React, { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import {
  Sparkles,
  CheckCircle2,
  Mail,
  Calendar,
  Layers,
  ArrowRight,
  Send,
  Zap,
  Play,
} from "lucide-react";

export interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFree: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  onStartFree,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "1. Connect Your Daily Tools",
      description: "WorkRadar connects securely via OAuth 2.0 to your existing workspace.",
      badge: "Zero Setup",
      render: (
        <div className="p-5 bg-surface-container-low rounded-xl space-y-3">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
            Connected Data Sources (Read-Only)
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-3 bg-white rounded-lg border border-outline-variant/60 flex items-center gap-2">
              <Mail className="w-4 h-4 text-rose-500" />
              <span className="font-bold">Gmail</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-outline-variant/60 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="font-bold">Calendar</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-outline-variant/60 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-800" />
              <span className="font-bold">Notion</span>
            </div>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>3 Data Streams Synchronized • 142 items indexed</span>
          </div>
        </div>
      ),
    },
    {
      title: "2. Autonomous Signal Analysis",
      description: "Our LLM engine isolates missed follow-ups, urgency, and revenue signals.",
      badge: "Context AI",
      render: (
        <div className="p-5 bg-surface-container-low rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface">Signals Detected</span>
            <Badge variant="error" size="sm">
              Critical Urgency
            </Badge>
          </div>
          <div className="p-3 bg-white rounded-lg border border-rose-200 text-xs space-y-1.5">
            <div className="font-bold text-on-surface">Client: Sarah Jenkins (VP Product)</div>
            <p className="text-secondary">
              "Need confirmation on contract clause 4.2 before board call at 2 PM."
            </p>
            <div className="text-[11px] text-rose-600 font-semibold">
              ⚡ SLA Risk: 45 minutes remaining before response deadline
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "3. 1-Click Executive Action",
      description: "WorkRadar writes the draft response in your voice and cues it up for approval.",
      badge: "Full Control",
      render: (
        <div className="p-5 bg-surface-container-low rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface">AI Draft Prepared</span>
            <Badge variant="success" size="sm">
              Ready to Send
            </Badge>
          </div>
          <div className="p-3.5 bg-white rounded-lg border border-outline-variant text-xs space-y-2">
            <p className="text-on-surface font-mono text-[11px]">
              "Hi Sarah, confirmed. We've reviewed clause 4.2 with legal and approved all terms for today's board review. Let me know if you need anything else prior to 2 PM."
            </p>
          </div>
          <div className="text-[11px] text-secondary flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" /> You always maintain 100% human-in-the-loop review.
          </div>
        </div>
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Interactive WorkRadar AI Walkthrough"
      description="See how WorkRadar AI acts as your continuous Chief of Staff in real time."
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentStep(idx)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold text-center border transition-all ${
                currentStep === idx
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-surface-container-low text-secondary border-outline-variant/60 hover:bg-surface-container-high"
              }`}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-on-surface">
              {steps[currentStep].title}
            </h4>
            <Badge variant="primary" size="sm">
              {steps[currentStep].badge}
            </Badge>
          </div>
          <p className="text-xs text-secondary">{steps[currentStep].description}</p>
          {steps[currentStep].render}
        </div>

        {/* Modal Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="text-xs"
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {currentStep < steps.length - 1 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  onStartFree();
                }}
                rightIcon={<Sparkles className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Start Free Trial Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

