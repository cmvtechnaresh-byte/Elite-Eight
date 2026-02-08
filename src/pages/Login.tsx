import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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

    const persistUser = async (user: any) => {
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: "admin", // Hardcoded for this simplified app
            lastLogin: new Date(),
        }, { merge: true });
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            await persistUser(userCredential.user);
            toast({
                title: "Success",
                description: "Logged in successfully",
            });
            navigate("/admin");
        } catch (error: any) {
            // Auto-create admin user if not exists (for demo/dummy purposes)
            if ((error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") && values.email === "admin@gmail.com") {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
                    await persistUser(userCredential.user);
                    toast({
                        title: "Account Created",
                        description: "Dummy admin account created and logged in.",
                    });
                    navigate("/admin");
                    return;
                } catch (createError: any) {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: createError.message,
                    });
                }
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.message || "Failed to login",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="admin@example.com" {...field} />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
