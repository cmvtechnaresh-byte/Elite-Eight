import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, FileText, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Leads", value: "124", change: "+12%", icon: Mail },
  { label: "New Inquiries", value: "18", change: "+5%", icon: TrendingUp },
  { label: "Team Members", value: "8", change: "0%", icon: Users },
  { label: "Blog Posts", value: "12", change: "+2", icon: FileText },
];

const recentLeads = [
  { name: "Rajesh Kumar", company: "Tech Solutions Pvt Ltd", service: "Corporate Training", date: "Today" },
  { name: "Priya Sharma", company: "Global Finance Corp", service: "PoSH Workshop", date: "Yesterday" },
  { name: "Amit Patel", company: "StartUp Innovations", service: "Recruitment", date: "2 days ago" },
  { name: "Neha Singh", company: "Manufacturing Ltd", service: "Organizational Development", date: "3 days ago" },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your site.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Latest inquiries from the contact form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLeads.map((lead, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">{lead.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">{lead.service}</p>
                  <p className="text-xs text-muted-foreground">{lead.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
