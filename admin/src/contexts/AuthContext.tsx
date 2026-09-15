import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export const PAGE_PERMISSIONS: Record<string, string> = {
  dashboard: 'Dashboard',
  members: 'Members Registry',
  facilitators: 'Facilitators',
  newsletter: 'Newsletter Hub',
  'email-composer': 'Email Composer',
  chat: 'Live Support',
  messages: 'Messages',
  'activity-logs': 'Activity Logs',
  settings: 'Settings',
};

const SUPER_ADMIN_EMAIL = 'admin@ibmssp.org.ng';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, options?: { rememberMe?: boolean }) => Promise<boolean>;
  logout: () => void;
  hasPermission: (page: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_PREFS_KEY = 'ibmssp_admin_auth_prefs';
const REMEMBER_ME_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours
const AUTH_BOOT_TIMEOUT_MS = 12000;

type AuthPrefs = {
  rememberMe: boolean;
  lastLoginAt: number;
};

function readAuthPrefs(): AuthPrefs | null {
  try {
    const raw = localStorage.getItem(AUTH_PREFS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AuthPrefs>;
    if (typeof parsed.lastLoginAt !== 'number') return null;
    return {
      rememberMe: !!parsed.rememberMe,
      lastLoginAt: parsed.lastLoginAt,
    };
  } catch {
    return null;
  }
}

function writeAuthPrefs(prefs: AuthPrefs) {
  localStorage.setItem(AUTH_PREFS_KEY, JSON.stringify(prefs));
}

function clearAuthPrefs() {
  localStorage.removeItem(AUTH_PREFS_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = async (supaUser: User) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, email')
      .eq('id', supaUser.id)
      .single();

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role, permissions')
      .eq('user_id', supaUser.id);

    const role = roles?.[0]?.role || 'admin';
    const permissions = Array.isArray(roles?.[0]?.permissions) ? roles[0].permissions : [];

    setUser({
      id: supaUser.id,
      email: profile?.email || supaUser.email || '',
      name: profile?.name || supaUser.email?.split('@')[0] || '',
      role,
      permissions,
    });
  };

  const hasInitialized = React.useRef(false);

  useEffect(() => {
    let isMounted = true;
    const bootTimeout = window.setTimeout(() => {
      if (isMounted && !hasInitialized.current) setIsLoading(false);
    }, AUTH_BOOT_TIMEOUT_MS);

    const applySession = async (session: { user: User } | null) => {
      if (!isMounted) return;

      if (!session?.user) {
        setUser(null);
        setIsLoading(false);
        hasInitialized.current = true;
        return;
      }

      const prefs = readAuthPrefs();
      const maxAge = prefs?.rememberMe ? REMEMBER_ME_TTL_MS : SESSION_TTL_MS;
      const isExpired = prefs ? (Date.now() - prefs.lastLoginAt > maxAge) : false;

      if (isExpired) {
        await supabase.auth.signOut();
        setUser(null);
        setIsLoading(false);
        hasInitialized.current = true;
        return;
      }

      if (prefs) {
        writeAuthPrefs({ ...prefs, lastLoginAt: Date.now() });
      }

      // Only show global loading on first successful init
      if (!hasInitialized.current) {
        setIsLoading(true);
      }

      try {
        await loadProfile(session.user);
        hasInitialized.current = true;
      } catch {
        setUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          clearAuthPrefs();
          hasInitialized.current = false;
        }
        // Avoid blocking auth event processing; apply session in the background.
        void applySession((session ? { user: session.user } : null));
      }
    );

    supabase.auth.getSession()
      .then(({ data: { session } }) => applySession(session ? { user: session.user } : null))
      .catch(() => {
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
          hasInitialized.current = true;
        }
      });

    return () => {
      isMounted = false;
      window.clearTimeout(bootTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    password: string,
    options?: { rememberMe?: boolean }
  ): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return false;

      writeAuthPrefs({
        rememberMe: !!options?.rememberMe,
        lastLoginAt: Date.now(),
      });
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    clearAuthPrefs();
    setUser(null);
  };

  const hasPermission = (page: string) => {
    if (!user) return false;
    if (user.email === SUPER_ADMIN_EMAIL) return true;
    return user.permissions.includes(page);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
