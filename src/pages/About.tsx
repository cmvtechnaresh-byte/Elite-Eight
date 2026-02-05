import { Target, Eye, Award, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest standards in everything we do.",
  },
  {
    icon: Eye,
    title: "Integrity",
    description: "Transparency and honesty guide our partnerships.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Continuously evolving our methods for better outcomes.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together to achieve shared success.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Elite Eight</h1>
            <p className="text-lg text-muted-foreground">
              We are a premier consulting firm dedicated to empowering organizations 
              through strategic training, compliance, and talent solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To transform organizations by delivering exceptional training programs, 
                ensuring compliance excellence, and connecting businesses with top talent. 
                We believe in building lasting partnerships that drive measurable results.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-secondary">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                To be the most trusted partner for organizational excellence across India, 
                known for our innovative approaches, unwavering commitment to quality, 
                and the lasting impact we create for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                Founded with a vision to bridge the gap between organizational potential 
                and performance, Elite Eight has grown into a trusted partner for businesses 
                across industries.
              </p>
              <p className="mb-4">
                Our team of seasoned professionals brings decades of combined experience 
                in corporate training, compliance management, and strategic recruitment. 
                We understand that every organization is unique, which is why we tailor 
                our solutions to meet specific needs and objectives.
              </p>
              <p>
                Today, we continue to innovate and evolve, staying ahead of industry 
                trends to deliver solutions that create real, measurable impact for 
                our clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
