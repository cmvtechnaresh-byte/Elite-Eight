import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save, X } from "lucide-react";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SubService {
    title: string;
    features: string[];
}

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string; // Storing icon name for simplicity, mapped in frontend
    subServices: SubService[];
}

const ServicesManager = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    // New Service State
    const [newService, setNewService] = useState<Omit<Service, "id">>({
        title: "",
        description: "",
        icon: "Users",
        subServices: []
    });

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];
            setServices(data);
        });
        return () => unsubscribe();
    }, []);

    const handleAddService = async () => {
        try {
            await addDoc(collection(db, "services"), newService);
            toast({ title: "Success", description: "Service added successfully" });
            setIsDialogOpen(false);
            setNewService({ title: "", description: "", icon: "Users", subServices: [] });
        } catch (error: any) {
            console.error("Error adding service:", error);
            toast({
                variant: "destructive",
                title: "Error adding service",
                description: error.message || "Failed to add service. Check console for details."
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            await deleteDoc(doc(db, "services", id));
            toast({ title: "Deleted", description: "Service removed" });
        }
    };

    // Helper to manage sub-services in the form could be complex, 
    // for now let's keep it simple or minimal. 
    // A full nested form is quite large for this snippet, 
    // so I will implement a simplified version for the 'Add' modal 
    // or just assume basic fields for now to get the structure up.

    // Temporary state for adding a sub-service
    const [tempSub, setTempSub] = useState({ title: "", features: "" });

    const handleAddSubService = () => {
        if (!tempSub.title) return;
        const featuresArray = tempSub.features.split(",").map(f => f.trim()).filter(f => f !== "");

        setNewService({
            ...newService,
            subServices: [...newService.subServices, { title: tempSub.title, features: featuresArray }]
        });
        setTempSub({ title: "", features: "" });
    };

    const handleRemoveSubService = (index: number) => {
        const updated = [...newService.subServices];
        updated.splice(index, 1);
        setNewService({ ...newService, subServices: updated });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Services Manager</h1>
                    <p className="text-muted-foreground">Manage your service offerings.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add New Service</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={newService.title}
                                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                    placeholder="e.g. Corporate Training"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                    placeholder="Brief description..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Icon Name (Lucide React)</Label>
                                <Input
                                    value={newService.icon}
                                    onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                                    placeholder="e.g. Users, Trophy, Target..."
                                />
                            </div>

                            {/* Sub-Services Management */}
                            <div className="space-y-4 border p-4 rounded-md bg-muted/20">
                                <h3 className="font-semibold text-sm">Manage Sub-Services</h3>

                                {/* List of added sub-services */}
                                {newService.subServices.length > 0 && (
                                    <div className="space-y-2 mb-4">
                                        {newService.subServices.map((sub, idx) => (
                                            <div key={idx} className="flex items-start justify-between bg-background p-2 rounded border text-sm">
                                                <div>
                                                    <p className="font-medium">{sub.title}</p>
                                                    <p className="text-xs text-muted-foreground">{sub.features.length} features</p>
                                                </div>
                                                <Button variant="ghost" size="icon" onClick={() => handleRemoveSubService(idx)} className="h-6 w-6 text-destructive">
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add new sub-service inputs */}
                                <div className="grid gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Sub-Service Title</Label>
                                        <Input
                                            value={tempSub.title}
                                            onChange={(e) => setTempSub({ ...tempSub, title: e.target.value })}
                                            placeholder="e.g. Sales Training"
                                            className="h-8"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Features (comma separated)</Label>
                                        <Textarea
                                            value={tempSub.features}
                                            onChange={(e) => setTempSub({ ...tempSub, features: e.target.value })}
                                            placeholder="Feature 1, Feature 2, Feature 3"
                                            className="h-16 text-xs"
                                        />
                                    </div>
                                    <Button type="button" onClick={handleAddSubService} variant="secondary" size="sm" className="w-full">
                                        <Plus className="h-3 w-3 mr-2" /> Add Sub-Service
                                    </Button>
                                </div>
                            </div>

                            <Button onClick={handleAddService} className="w-full">Create Service</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {services.map((service) => (
                    <Card key={service.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>

                            {service.subServices && service.subServices.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs font-semibold mb-1">Sub-Services:</p>
                                    <ul className="text-xs list-disc list-inside text-muted-foreground space-y-0.5">
                                        {service.subServices.slice(0, 3).map((sub, idx) => (
                                            <li key={idx}>{sub.title}</li>
                                        ))}
                                        {service.subServices.length > 3 && <li>+{service.subServices.length - 3} more</li>}
                                    </ul>
                                </div>
                            )}

                            <div className="text-xs bg-muted px-2 py-1 rounded inline-block">Icon: {service.icon}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ServicesManager;
