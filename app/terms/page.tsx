import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions — WorkRadar AI",
  description: "Terms and Conditions governing the use of WorkRadar AI intelligence platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-800 antialiased font-sans">
      {/* Simple Header */}
      <header className="border-b border-neutral-200 py-4 px-6 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to WorkRadar AI</span>
          </Link>
          <span className="text-xs font-mono text-neutral-400">Effective:July 24, 2026</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 leading-relaxed">
        <div className="space-y-4 mb-10 pb-8 border-b border-neutral-200">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-sm text-neutral-500">
            Last Updated: July 24, 2026 • WorkRadar AI Inc.
          </p>
        </div>

        <div className="space-y-8 text-sm text-neutral-700">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing the WorkRadar AI platform (&quot;Service&quot;), you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree with any part of these Terms, you may not access or use the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">2. Description of Service</h2>
            <p>
              WorkRadar AI provides continuous work intelligence, priority task detection, automated follow-up identification, and AI Chief of Staff capabilities by connecting with your chosen third-party integrations (such as Gmail, Google Calendar, and productivity tools).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">3. User Accounts and Security</h2>
            <p>
              When you create an account with WorkRadar AI, you must provide accurate, complete, and current information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">4. Third-Party Integrations & Permissions</h2>
            <p>
              By authorizing integrations (such as Google OAuth or Gmail read-only APIs), you grant WorkRadar AI permission to process incoming metadata and communication snippets strictly to detect missed follow-ups and generate your briefings. We do not sell, rent, or use your private data to train public foundation models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">5. Acceptable Use Policy</h2>
            <p>
              You agree not to use the Service for any unlawful purpose, to transmit malicious software, to attempt unauthorized access to other accounts or systems, or to circumvent any operational rate limits or security mechanisms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">6. Subscriptions and Billing</h2>
            <p>
              WorkRadar AI offers free trial access and paid subscription tiers (Starter, Pro, Business). Subscription fees are billed in advance on a recurring monthly or annual basis. You may cancel your subscription at any time through your workspace settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">7. Intellectual Property</h2>
            <p>
              The WorkRadar AI platform, software, design, code, logos, and trademarks are the exclusive property of WorkRadar AI Inc. Your workspace data, communications, and organizational inputs remain entirely your property.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, WorkRadar AI Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to use the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these Terms. Upon termination, your right to use the Service will immediately cease, and all active OAuth tokens and indexed data will be permanently wiped.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">10. Contact Information</h2>
            <p>
              If you have any questions regarding these Terms and Conditions, please reach out to us at:
            </p>
            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-600">
              WorkRadar AI Legal Team<br />
              Email: legal@workradar.ai<br />
              Website: https://workradar.ai
            </div>
          </section>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-neutral-200 py-6 px-6 text-center text-xs text-neutral-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} WorkRadar AI Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:underline text-neutral-600">Privacy Policy</Link>
            <Link href="/" className="hover:underline text-neutral-600">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
