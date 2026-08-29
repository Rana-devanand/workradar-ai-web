import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#004ac6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "WorkRadar AI — AI-Powered Work Intelligence & Chief of Staff",
  description:
    "WorkRadar continuously monitors your emails, meetings, documents, and tasks to identify missed opportunities, forgotten follow-ups, urgent deadlines, and revenue-generating actions.",
  keywords: [
    "AI Chief of Staff",
    "Work Intelligence",
    "Email Follow-up AI",
    "Meeting Intelligence",
    "Revenue Opportunity Detector",
    "Executive Productivity",
  ],
  authors: [{ name: "WorkRadar AI Team" }],
  openGraph: {
    title: "WorkRadar AI — Never miss what matters.",
    description:
      "Continuous work intelligence monitoring emails, meetings, documents, and tasks to identify forgotten follow-ups and revenue opportunities.",
    type: "website",
    locale: "en_US",
    siteName: "WorkRadar AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-on-surface antialiased flex flex-col font-sans">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
