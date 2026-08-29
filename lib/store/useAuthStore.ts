import { create } from "zustand";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  plan: "STARTER" | "PRO" | "BUSINESS";
  companyName: string;
  token?: string;
}

interface AuthState {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (profile: Partial<UserSession>) => void;
}

const DEFAULT_USER: UserSession = {
  id: "usr_alex_morgan",
  name: "Alex Morgan",
  email: "alex.morgan@acme.corp",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "Founder / CEO",
  plan: "PRO",
  companyName: "Acme Innovations",
};

export const useAuthStore = create<AuthState>((set) => ({
  user: DEFAULT_USER,
  isAuthenticated: true,
  isLoading: false,

  loginWithGoogle: async () => {
    set({ isLoading: true });
    try {
      // Simulate Google OAuth response or connect to Supabase
      const googleUser: UserSession = {
        id: "usr_google_" + Math.random().toString(36).substring(2, 9),
        name: "Alex Morgan",
        email: "alex.morgan@gmail.com",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Executive Lead",
        plan: "PRO",
        companyName: "Acme Innovations",
        token: "jwt_google_oauth_token_" + Date.now(),
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("workradar_user", JSON.stringify(googleUser));
        localStorage.setItem("workradar_token", googleUser.token || "");
      }

      set({ user: googleUser, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  loginWithEmail: async (email: string, name: string = "Alex Morgan") => {
    set({ isLoading: true });
    const userSession: UserSession = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name,
      email,
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "CEO",
      plan: "PRO",
      companyName: "Acme Innovations",
      token: "jwt_token_" + Date.now(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("workradar_user", JSON.stringify(userSession));
      localStorage.setItem("workradar_token", userSession.token || "");
    }

    set({ user: userSession, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("workradar_user");
      localStorage.removeItem("workradar_token");
      sessionStorage.clear();
    }
    set({ user: null, isAuthenticated: false });
  },

  updateUserProfile: (profile) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...profile } : null,
    })),
}));

