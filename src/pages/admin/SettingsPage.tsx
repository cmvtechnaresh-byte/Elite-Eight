import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Database } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { initialServices, initialTestimonials, initialTeam } from "@/lib/initialData";

const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "",
    email: "",
    phone: "",
    notifications: {
      newLead: true,
      weeklyReport: true
    },
    seo: {
      title: "",
      description: ""
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docSnap = await getDoc(doc(db, "settings", "general"));
        if (docSnap.exists()) {
          setSettings(docSnap.data() as any);
        } else {
          setSettings({
            siteName: "Elite Eight",
            email: "Connect@eliteeight.in",
            phone: "9971359352",
            notifications: { newLead: true, weeklyReport: true },
            seo: {
              title: "Elite Eight - Corporate Training & HR Solutions",
              description: "Transform your organization with Elite Eight..."
            }
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "settings", "general"), settings);
      toast({ title: "Settings saved!", description: "Your changes have been saved successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save settings." });
    }
  };

  const handleSeedData = async () => {
    const confirmSeed = confirm("This will reset/add default Services, Testimonials, and Team to your database. Continue?");
    if (!confirmSeed) return;

    try {
      setLoading(true);

      // Seed Services
      for (const service of initialServices) {
        await addDoc(collection(db, "services"), service);
      }

      // Seed Testimonials
      for (const testimonial of initialTestimonials) {
        await addDoc(collection(db, "testimonials"), testimonial);
      }

      // Seed Team
      for (const member of initialTeam) {
        await addDoc(collection(db, "team"), member);
      }

      toast({ title: "Database Seeded!", description: "All initial data has been restored to the database." });

    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to seed database. Check permissions." });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your global application settings.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>Details used across the website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Phone</Label>
                <Input
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>

        {/* Database Seeding Card */}
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="text-orange-900">Restore Data</CardTitle>
            <CardDescription className="text-orange-700/80">
              Restore the original website data (Services, Team, Testimonials) to the database.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSeedData} variant="outline" className="border-orange-300 hover:bg-orange-100 text-orange-900">
              <Database className="h-4 w-4 mr-2" />
              Restore Default Data
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure email notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Lead Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified when someone submits the contact form</p>
              </div>
              <Switch
                checked={settings.notifications.newLead}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, newLead: checked }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Receive weekly summary of leads and activity</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyReport}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, weeklyReport: checked }
                })}
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Search engine optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input
                value={settings.seo.title}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, title: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Input
                value={settings.seo.description}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, description: e.target.value }
                })}
              />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-fit">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
