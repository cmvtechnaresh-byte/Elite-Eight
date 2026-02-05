import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Settings saved!", description: "Your changes have been saved successfully." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage website settings and configurations.</p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic website configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input defaultValue="Elite Eight" />
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input type="email" defaultValue="Connect@eliteeight.in" />
            </div>
            <div className="space-y-2">
              <Label>Contact Phone</Label>
              <Input defaultValue="9971359352" />
            </div>
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
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Receive weekly summary of leads and activity</p>
              </div>
              <Switch defaultChecked />
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
              <Input defaultValue="Elite Eight - Corporate Training & HR Solutions" />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Input defaultValue="Transform your organization with Elite Eight's corporate training, compliance solutions, and strategic recruitment services." />
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
