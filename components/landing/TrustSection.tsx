import React from "react";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { INTEGRATIONS } from "@/lib/data/landing-data";
import {
  Mail,
  Calendar,
  FileText,
  MessageSquare,
  Layers,
  Video,
  GitPullRequest,
  Inbox,
  Shield,
  Lock,
  RefreshCw,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  mail: <Mail className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  "file-text": <FileText className="w-5 h-5" />,
  "message-square": <MessageSquare className="w-5 h-5" />,
  layers: <Layers className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  "git-pull-request": <GitPullRequest className="w-5 h-5" />,
  inbox: <Inbox className="w-5 h-5" />,
};

export const TrustSection: React.FC = () => {
  return (
    <section id="integrations" className="py-20 bg-surface-container-lowest border-y border-outline-variant/60">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="neutral" size="sm" className="uppercase tracking-wider">
            Zero Friction Integrations
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
            Works seamlessly with the tools you already rely on
          </h2>
          <p className="text-sm sm:text-base text-secondary">
            Connect in under 60 seconds. WorkRadar operates on read-only, OAuth 2.0 scopes with bank-grade encryption.
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {INTEGRATIONS.map((tool) => (
            <div
              key={tool.name}
              className="p-5 rounded-xl border border-outline-variant/60 bg-surface-container-low/40 hover:bg-surface-container-low hover:border-primary/40 transition-all group flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105"
                  style={{ backgroundColor: tool.color }}
                >
                  {ICON_MAP[tool.iconName] || <Mail className="w-5 h-5" />}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-secondary mt-1 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Privacy Banner */}
        <div className="mt-12 p-5 rounded-xl bg-surface-container-low border border-outline-variant/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                Enterprise-Grade Privacy & Security Guaranteed
              </h4>
              <p className="text-xs text-secondary mt-0.5">
                We never train AI models on your private messages or customer documents.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-secondary">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-primary" /> SOC2 Type II Certified
            </span>
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-primary" /> Zero-Data Retention Model
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

