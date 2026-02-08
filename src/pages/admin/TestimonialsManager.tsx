import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Star } from "lucide-react";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    image?: string;
}

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    // New Testimonial State
    const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, "id">>({
        name: "",
        role: "",
        company: "",
        content: "",
        rating: 5,
        image: ""
    });

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "testimonials"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Testimonial[];
            setTestimonials(data);
        });
        return () => unsubscribe();
    }, []);

    const handleAdd = async () => {
        try {
            await addDoc(collection(db, "testimonials"), newTestimonial);
            toast({ title: "Success", description: "Testimonial added." });
            setIsDialogOpen(false);
            setNewTestimonial({ name: "", role: "", company: "", content: "", rating: 5, image: "" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to add testimonial" });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this testimonial?")) {
            await deleteDoc(doc(db, "testimonials", id));
            toast({ title: "Deleted", description: "Testimonial removed." });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Testimonials Manager</h1>
                    <p className="text-muted-foreground">Manage client reviews and testimonials.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Testimonial
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Add New Testimonial</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input
                                        value={newTestimonial.name}
                                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Input
                                        value={newTestimonial.role}
                                        onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                    value={newTestimonial.company}
                                    onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Content</Label>
                                <Textarea
                                    value={newTestimonial.content}
                                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Rating</Label>
                                <Select
                                    value={newTestimonial.rating.toString()}
                                    onValueChange={(v) => setNewTestimonial({ ...newTestimonial, rating: parseInt(v) })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5 Stars</SelectItem>
                                        <SelectItem value="4">4 Stars</SelectItem>
                                        <SelectItem value="3">3 Stars</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button onClick={handleAdd} className="w-full">Save Testimonial</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                    <Card key={t.id}>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold">{t.name}</h3>
                                    <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
                                </div>
                                <div className="flex">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm italic">"{t.content}"</p>
                            <div className="mt-4 flex justify-end">
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsManager;
