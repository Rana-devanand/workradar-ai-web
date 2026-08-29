import React from "react";
import { Metadata } from "next";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export const metadata: Metadata = {
  title: "Setup Your Workspace | WorkRadar AI",
  description: "Configure your WorkRadar AI continuous intelligence workspace and Chief of Staff settings.",
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}

