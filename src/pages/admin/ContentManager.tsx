import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const ContentManager = () => {
  const { toast } = useToast();
  const [heroContent, setHeroContent] = useState({
    title: "",
    subtitle: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "content", "hero"));
        if (docSnap.exists()) {
          setHeroContent(docSnap.data() as any);
        } else {
          // Set defaults if not exists
          setHeroContent({
            title: "Elevate Your Workforce Excellence",
            subtitle: "Elite Eight delivers transformative corporate training, compliance solutions, and strategic recruitment services to help organizations thrive.",
          });
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSaveHero = async () => {
    try {
      await setDoc(doc(db, "content", "hero"), heroContent);
      toast({ title: "Content saved!", description: "Hero section updated successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save content." });
    }
  };

  if (loading) return <div>Loading content...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Manager</h1>
        <p className="text-muted-foreground">Edit website content and pages.</p>
      </div>

      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          {/* Add other tabs back as needed when their collections are defined */}
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
      </Tabs>
    </div>
  );
};

export default ContentManager;
