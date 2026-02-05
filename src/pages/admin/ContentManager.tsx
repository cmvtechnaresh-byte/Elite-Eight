import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContentManager = () => {
  const { toast } = useToast();
  const [heroContent, setHeroContent] = useState({
    title: "Elevate Your Workforce Excellence",
    subtitle: "Elite Eight delivers transformative corporate training, compliance solutions, and strategic recruitment services to help organizations thrive.",
  });

  const handleSaveHero = () => {
    toast({ title: "Content saved!", description: "Hero section updated successfully." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Manager</h1>
        <p className="text-muted-foreground">Edit website content and pages.</p>
      </div>

      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit the main banner on the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Textarea
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                  rows={3}
                />
              </div>
              <Button onClick={handleSaveHero}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage your service offerings</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Corporate Training", "Compliance Training", "Recruitment", "Organizational Development"].map((service) => (
                  <div key={service} className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">{service}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About Page</CardTitle>
              <CardDescription>Edit company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mission Statement</Label>
                <Textarea rows={3} defaultValue="To transform organizations by delivering exceptional training programs..." />
              </div>
              <div className="space-y-2">
                <Label>Vision Statement</Label>
                <Textarea rows={3} defaultValue="To be the most trusted partner for organizational excellence..." />
              </div>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Manage articles and resources</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "The Future of Corporate Training in 2024",
                  "PoSH Compliance: A Complete Guide",
                  "Building High-Performance Sales Teams",
                ].map((post) => (
                  <div key={post} className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">{post}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
