import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import SupabaseHealth from '@/components/SupabaseHealth';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, PAGE_PERMISSIONS } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Facilitators from "./pages/Facilitators";
import MemberProfile from "./pages/MemberProfile";
import EmailComposer from "./pages/EmailComposer";
import Newsletter from "./pages/Newsletter";
import Messages from "./pages/Messages";
import LiveChat from "./pages/LiveChat";
import ActivityLogs from "./pages/ActivityLogs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import MobileNotification from "./pages/MobileNotification";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="flex h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PermissionRoute({ permission, children }: { permission: string; children: React.ReactNode }) {
  const { hasPermission, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="flex h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasPermission(permission)) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <SupabaseHealth />
        <Toaster />
      <Sonner />
      <Router>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/notification" element={
                <ProtectedRoute>
                  <MobileNotification />
                </ProtectedRoute>
              } />
              <Route element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route path="/" element={<Dashboard />} />
                <Route path="/members" element={<PermissionRoute permission="members"><Members /></PermissionRoute>} />
                <Route path="/members/:id" element={<PermissionRoute permission="members"><MemberProfile /></PermissionRoute>} />
                <Route path="/facilitators" element={<PermissionRoute permission="facilitators"><Facilitators /></PermissionRoute>} />
                <Route path="/email-composer" element={<PermissionRoute permission="email-composer"><EmailComposer /></PermissionRoute>} />
                <Route path="/newsletter" element={<PermissionRoute permission="newsletter"><Newsletter /></PermissionRoute>} />
                <Route path="/messages" element={<PermissionRoute permission="messages"><Messages /></PermissionRoute>} />
                <Route path="/chat" element={<PermissionRoute permission="chat"><LiveChat /></PermissionRoute>} />
                <Route path="/activity-logs" element={<PermissionRoute permission="activity-logs"><ActivityLogs /></PermissionRoute>} />
                <Route path="/settings" element={<PermissionRoute permission="settings"><Settings /></PermissionRoute>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
