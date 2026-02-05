import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import ContentManager from "./pages/admin/ContentManager";
import LeadsManager from "./pages/admin/LeadsManager";
import TeamManager from "./pages/admin/TeamManager";
import SettingsPage from "./pages/admin/SettingsPage";
import ContactSubmissions from "./pages/admin/ContactSubmissions";
import EMSManager from "./pages/admin/EMSManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="leads" element={<LeadsManager />} />
            <Route path="submissions" element={<ContactSubmissions />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="ems" element={<EMSManager />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
