"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logOut } from "@/lib/redux/slices/authSlice";
import { useLogoutMutation } from "@/lib/redux/services/authApi";
import {
  Search,
  Bell,
  LogOut,
  User,
  Shield,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export const TopAppBar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [logoutMutation] = useLogoutMutation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (e) {
      // Handled cleanly
    } finally {
      dispatch(logOut());
      setShowProfileMenu(false);
      router.push("/");
    }
  };

  const displayName = user?.fullName || user?.name || "Alex Morgan";
  const displayEmail = user?.email || "alex.morgan@acme.corp";
  const displayAvatar =
    user?.image ||
    user?.avatarUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

  return (
    <header className="flex justify-between items-center w-full px-6 h-14 sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#c3c6d7]">
      {/* Search Bar (on left) */}
      <div className="flex-1 max-w-md">
        <div className="relative group flex items-center">
          <Search className="absolute left-3 text-[#565e74] w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask AI to find anything in your workspace..."
            className="w-full bg-[#f2f4f6] border border-[#e0e3e5] rounded-md pl-9 pr-12 py-1.5 text-xs text-[#191c1e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[#565e74]/70 shadow-2xs"
          />
          <div className="absolute right-3 flex items-center gap-1">
            <kbd className="hidden md:inline-block font-mono text-[10px] text-[#565e74]/80 border border-[#e0e3e5] rounded px-1.5 py-0.5 bg-white">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Trailing Controls & User Menu */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications Button */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-[#565e74] hover:bg-[#e6e8ea] rounded-full p-2 transition-all flex items-center justify-center relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full border border-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-[#c3c6d7] shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#e0e3e5] mb-2">
                <span className="text-xs font-bold text-[#191c1e] uppercase tracking-wider">
                  Live AI Radar Alerts
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  3 New
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-[#f7f9fb] hover:bg-[#f2f4f6] transition-colors cursor-pointer border border-[#e0e3e5]/60">
                  <p className="font-bold text-[#191c1e]">Michael Chang: Deployment block</p>
                  <p className="text-[11px] text-[#565e74] mt-0.5">High urgency email flagged 2m ago</p>
                </div>
                <div className="p-2 rounded-lg bg-[#f7f9fb] hover:bg-[#f2f4f6] transition-colors cursor-pointer border border-[#e0e3e5]/60">
                  <p className="font-bold text-[#191c1e]">Design Sync Rescheduled</p>
                  <p className="text-[11px] text-[#565e74] mt-0.5">Calendar conflict automatically resolved</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Dropdown */}
        <div className="relative ml-1" ref={menuRef}>
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity p-1 rounded-full border border-[#e0e3e5] bg-white cursor-pointer shadow-2xs"
          >
            {/* User Avatar */}
            <img
              src={displayAvatar}
              alt={displayName}
              className="w-7 h-7 rounded-full object-cover"
            />
            <ChevronDown className="w-3.5 h-3.5 text-[#565e74] pr-0.5 hidden sm:block" />
          </button>

          {/* User Profile Popover */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#c3c6d7] shadow-xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
              {/* Profile Card */}
              <div className="flex items-center gap-3 pb-3 border-b border-[#e0e3e5]">
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover border border-[#e0e3e5]"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-[#191c1e] truncate">
                    {displayName}
                  </h4>
                  <p className="text-[11px] text-[#565e74] truncate font-mono">
                    {displayEmail}
                  </p>
                  <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.2 rounded-full mt-1">
                    {user?.planTier || "PRO"} Plan
                  </span>
                </div>
              </div>

              {/* Workspace details */}
              <div className="py-2.5 border-b border-[#e0e3e5] text-xs text-[#565e74] space-y-1">
                <div className="flex justify-between">
                  <span>Workspace:</span>
                  <span className="font-bold text-[#191c1e]">
                    {user?.companyName || "Acme Innovations"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="font-medium text-[#191c1e]">
                    {user?.role || "USER"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2.5 space-y-1">
                <button
                  type="button"
                  onClick={() => router.push("/onboarding")}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-[#565e74] hover:bg-[#f2f4f6] hover:text-[#191c1e] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>Run Onboarding Setup</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#565e74]" />
                </button>

                {/* Logout Button with session terminate */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-bold text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out & Terminate Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
