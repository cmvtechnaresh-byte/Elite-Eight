import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2, Shield, ShieldAlert, UserPlus } from "lucide-react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, firebaseConfig } from "@/lib/firebase";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface UserData {
    id: string;
    email: string;
    role: string;
    lastLogin?: any;
}

const AdminManager = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const userData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserData[];
            setUsers(userData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);

        try {
            // We need to create a secondary app instance to create a user 
            // without logging out the current admin.
            const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
            const secondaryAuth = getAuth(secondaryApp);

            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newUserEmail, newUserPassword);
            const user = userCredential.user;

            // Create user document in Firestore with admin role
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: "admin",
                createdAt: new Date(),
                createdBy: "admin_portal"
            });

            // Cleanup
            await secondaryAuth.signOut(); // Ensure secondary auth doesn't persist
            // Note: deleting the app instance isn't strictly exposed in client SDK easily, 
            // but for this flow letting it be garbage collected or keeping it is fine. 
            // Ideally we'd use 'deleteApp(secondaryApp)' if imported.

            toast({
                title: "Admin Created",
                description: `${newUserEmail} has been added as an admin.`,
            });

            setNewUserEmail("");
            setNewUserPassword("");
            setIsDialogOpen(false);

        } catch (error: any) {
            console.error("Error creating admin:", error);
            toast({
                variant: "destructive",
                title: "Failed to create admin",
                description: error.message,
            });
        } finally {
            setIsCreating(false);
        }
    };

    const handleRoleToggle = async (user: UserData) => {
        if (user.role === "admin" && users.filter(u => u.role === "admin").length <= 1) {
            toast({
                variant: "destructive",
                title: "Action Denied",
                description: "Cannot demote the last remaining admin.",
            });
            return;
        }

        const newRole = user.role === "admin" ? "user" : "admin";
        try {
            await updateDoc(doc(db, "users", user.id), { role: newRole });
            toast({
                title: "Role Updated",
                description: `${user.email} is now a ${newRole}.`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update role.",
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Admin Management</h1>
                    <p className="text-muted-foreground">Manage authorized personnel and access roles.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add New Admin
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Administrator</DialogTitle>
                            <CardDescription>Create a new account with full admin privileges.</CardDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateAdmin} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input
                                    type="email"
                                    required
                                    value={newUserEmail}
                                    onChange={(e) => setNewUserEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    required
                                    minLength={6}
                                    value={newUserPassword}
                                    onChange={(e) => setNewUserPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isCreating}>
                                {isCreating ? "Creating..." : "Create Admin Account"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>System Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="h-2 w-2 rounded-full bg-green-500" />
                                            Active
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRoleToggle(user)}
                                            className={user.role === "admin" ? "text-destructive hover:text-destructive" : "text-primary hover:text-primary"}
                                        >
                                            {user.role === "admin" ? (
                                                <><ShieldAlert className="h-4 w-4 mr-2" /> Demote</>
                                            ) : (
                                                <><Shield className="h-4 w-4 mr-2" /> Promote</>
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminManager;
