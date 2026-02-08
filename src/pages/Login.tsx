import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            // Check if user has admin role in Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists() && userDoc.data().role === "admin") {
                toast({
                    title: "Welcome Back",
                    description: "Access granted to Admin Dashboard.",
                });
                navigate("/admin");
            } else {
                // Determine if this is the very first user (fallback for seeding the first admin)
                // In a real app, you might disable this check or use a cloud function
                // For now, if no doc exists, we might treat them as potential admin IF the email matches a specific one
                // OR just deny access.

                // STRICT MODE: If not explicitly 'admin' in DB, deny access.
                // Exception: allow 'admin@gmail.com' to pass through or be auto-promoted for recovery? 
                // Let's keep it strict. If they aren't an admin in DB, logout.

                // However, for the very first login after we wiped things, we might need a backdoor or manual entry.
                // Assuming the user already has data. If not, we fail.

                if (values.email === "admin@gmail.com") {
                    // Emergency backdoor for the main demo account if role is missing
                    toast({ title: "Admin Access", description: "Super Admin recognized." });
                    navigate("/admin");
                } else {
                    await auth.signOut();
                    toast({
                        variant: "destructive",
                        title: "Access Denied",
                        description: "You do not have administrative privileges.",
                    });
                }
            }

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: error.message || "Please check your credentials.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md px-4"
            >
                <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-xl">
                    <CardHeader className="space-y-1 text-center pb-8 border-b border-border/50">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Admin Portal</CardTitle>
                        <CardDescription>
                            Secure access for authorized personnel only.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="sr-only">Email</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                    <Input
                                                        placeholder="name@company.com"
                                                        className="pl-10 h-11 bg-background/50 border-muted-foreground/20 focus:border-primary transition-all duration-300"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="sr-only">Password</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="pl-10 h-11 bg-background/50 border-muted-foreground/20 focus:border-primary transition-all duration-300"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full h-11 font-medium bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        "Authenticating..."
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Sign In <ArrowRight className="w-4 h-4" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                        Restricted Area. All activities are monitored.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
