import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";

const team = [
  { id: 1, name: "Dr. Ananya Verma", role: "Founder & CEO", initials: "AV" },
  { id: 2, name: "Rahul Kapoor", role: "Head of Training", initials: "RK" },
  { id: 3, name: "Meera Joshi", role: "Compliance Director", initials: "MJ" },
  { id: 4, name: "Suresh Nair", role: "Recruitment Lead", initials: "SN" },
  { id: 5, name: "Kavita Reddy", role: "OD Consultant", initials: "KR" },
  { id: 6, name: "Arjun Singh", role: "Sales Trainer", initials: "AS" },
];

const TeamManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Team Manager</h1>
          <p className="text-muted-foreground">Manage team members displayed on the website.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManager;
