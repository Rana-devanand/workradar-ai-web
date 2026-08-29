import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — WorkRadar AI",
  description: "Privacy Policy detailing how WorkRadar AI collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
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
          <span className="text-xs font-mono text-neutral-400">Effective: July 2026</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 leading-relaxed">
        <div className="space-y-4 mb-10 pb-8 border-b border-neutral-200">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500">
            Last Updated: July 24, 2026 • WorkRadar AI Inc.
          </p>
        </div>

        <div className="space-y-8 text-sm text-neutral-700">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">1. Overview and Commitment</h2>
            <p>
              At WorkRadar AI, your privacy and data security are our highest priority. This Privacy Policy explains what information we collect, how we process it to provide our AI Chief of Staff services, and the strict technical safeguards we apply.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Account Information:</strong> Name, work email address, organization name, and password hash when you sign up.</li>
              <li><strong>OAuth Integration Data:</strong> Read-only metadata from connected services (Gmail message snippets, calendar events, task deadlines) authorized by you.</li>
              <li><strong>Usage Analytics:</strong> Basic anonymous telemetry (page views, feature usage) used exclusively to improve reliability and performance.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">3. How We Use Your Information</h2>
            <p>
              Your information is used strictly to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Identify urgent emails and unanswered follow-up threads.</li>
              <li>Generate your executive morning briefings and suggested daily priorities.</li>
              <li>Authenticate your workspace and prevent unauthorized access.</li>
              <li>Provide customer support and security notices.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">4. AI Processing & Zero Data Retention for Training</h2>
            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs leading-normal">
              <strong>Our AI Pledge:</strong> WorkRadar AI does <u>NOT</u> use your emails, calendar meetings, private conversations, or company data to train public LLMs or foundation models. All inference is isolated to your private workspace session with strict memory isolation.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">5. Google API Limited Use Disclosure</h2>
            <p>
              WorkRadar AI&apos;s use and transfer to any other app of information received from Google APIs will adhere to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">6. Data Security and Encryption</h2>
            <p>
              We implement industry-standard security protocols:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>In Transit:</strong> All data is encrypted via TLS 1.3.</li>
              <li><strong>At Rest:</strong> Sensitive tokens and database records are encrypted using AES-256 bank-grade encryption.</li>
              <li><strong>Access Control:</strong> Strict Row-Level Security (RLS) policies prevent cross-tenant data access.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">7. Data Retention and Deletion</h2>
            <p>
              You maintain complete ownership of your data. You may disconnect integrations or request total deletion of your account and all associated tokens at any time through your settings or by contacting our security team. Upon request, all records are permanently purged within 30 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900">8. Contact Us</h2>
            <p>
              If you have any questions, concerns, or data privacy requests, please contact our Data Protection Officer:
            </p>
            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-600">
              WorkRadar AI Privacy Office<br />
              Email: privacy@workradar.ai<br />
              Website: https://workradar.ai/privacy-policy
            </div>
          </section>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-neutral-200 py-6 px-6 text-center text-xs text-neutral-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} WorkRadar AI Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:underline text-neutral-600">Terms of Service</Link>
            <Link href="/" className="hover:underline text-neutral-600">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
