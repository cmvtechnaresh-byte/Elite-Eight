import {
    LayoutDashboard,
    FileText,
    Users,
    Mail,
    Settings,
    MessageSquare,
    LogOut,
    FolderOpen
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/elite-eight-logo.png";

const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/content", icon: FileText, label: "Content" },
    { href: "/admin/services", icon: Settings, label: "Services" },
    { href: "/admin/testimonials", icon: Users, label: "Testimonials" },
    { href: "/admin/leads", icon: Mail, label: "Leads" },
    { href: "/admin/submissions", icon: MessageSquare, label: "Contact Forms" },
    { href: "/admin/team", icon: Users, label: "Team" },
    { href: "/admin/ems", icon: FolderOpen, label: "EMS" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminSidebar() {
    const location = useLocation();
    const { logout } = useAuth();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-16 border-b flex items-center justify-center bg-card">
                <Link to="/admin" className="flex items-center gap-2 px-4 w-full">
                    <img src={logo} alt="Elite Eight" className="h-8 w-auto" />
                    <span className="font-bold text-sm group-data-[collapsible=icon]:hidden">
                        Admin
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.href}
                                        tooltip={item.label}
                                    >
                                        <Link to={item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarSeparator />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => logout()}
                            tooltip="Sign Out"
                        >
                            <LogOut />
                            <span>Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
