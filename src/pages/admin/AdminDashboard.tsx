import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  Settings,
  Menu,
  X,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/elite-eight-logo.png";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/content", icon: FileText, label: "Content" },
  { href: "/admin/leads", icon: Mail, label: "Leads" },
  { href: "/admin/submissions", icon: MessageSquare, label: "Contact Forms" },
  { href: "/admin/team", icon: Users, label: "Team" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/admin" className="flex items-center gap-2">
              <img src={logo} alt="Elite Eight" className="h-8 w-auto" />
              <span className="font-bold text-sm">Admin</span>
            </Link>
            <button
              className="lg:hidden p-2"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start gap-3" asChild>
              <Link to="/">
                <LogOut className="h-5 w-5" />
                Back to Website
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card border-b p-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold">Admin Portal</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
