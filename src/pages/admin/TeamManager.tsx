import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Trash2 } from "lucide-react";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  image?: string;
  bio?: string;
  linkedin?: string;
  email?: string;
}

const TeamManager = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({ name: "", role: "", image: "", bio: "", linkedin: "", email: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "team"), (snapshot) => {
      const teamData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TeamMember[];
      setTeam(teamData);
    });
    return () => unsubscribe();
  }, []);

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.role) return;

    // Generate initials
    const initials = newMember.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    try {
      await addDoc(collection(db, "team"), {
        ...newMember,
        initials
      });
      setIsDialogOpen(false);
      setNewMember({ name: "", role: "", image: "", bio: "", linkedin: "", email: "" });
      toast({ title: "Success", description: "Team member added." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to add member." });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this member?")) {
      await deleteDoc(doc(db, "team", id));
      toast({ title: "Deleted", description: "Team member removed." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Team Manager</h1>
          <p className="text-muted-foreground">Manage team members displayed on the website.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="e.g. Dr. Ananya Verma"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="e.g. Founder & CEO"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Input
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  placeholder="Brief biography..."
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Email address"
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL (Optional)</Label>
                <Input
                  value={newMember.image}
                  onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL (Optional)</Label>
                <Input
                  value={newMember.linkedin}
                  onChange={(e) => setNewMember({ ...newMember, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <Button onClick={handleAddMember} className="w-full">Save Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground py-10">No team members found.</p>
        ) : team.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    {/* If image exists, use it, else fallback */}
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {member.initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </div>

              {member.bio && <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{member.bio}</p>}

              <div className="flex flex-col gap-1 mt-4 text-xs text-muted-foreground">
                {member.email && <div>📧 {member.email}</div>}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive w-full"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
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
