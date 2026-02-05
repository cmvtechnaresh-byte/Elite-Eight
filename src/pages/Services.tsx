import { Users, Shield, UserPlus, TrendingUp, CheckCircle, Mail, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    id: "corporate-training",
    icon: Users,
    title: "Corporate Training",
    description: "Elevate your team's capabilities with our comprehensive training programs.",
    subServices: [
      {
        title: "Sales Training",
        features: [
          "Advanced selling techniques",
          "Customer relationship management",
          "Negotiation skills",
          "Pipeline management",
          "Closing strategies",
        ],
      },
      {
        title: "Behavioural Training",
        features: [
          "Leadership development",
          "Communication skills",
          "Team building",
          "Conflict resolution",
          "Emotional intelligence",
        ],
      },
    ],
  },
  {
    id: "compliance-training",
    icon: Shield,
    title: "Compliance Training",
    description: "Ensure your organization meets all regulatory requirements.",
    subServices: [
      {
        title: "PoSH Workshop",
        features: [
          "Prevention of Sexual Harassment training",
          "Internal Committee formation",
          "Policy development",
          "Case handling procedures",
          "Annual compliance requirements",
        ],
      },
    ],
  },
  {
    id: "recruitment",
    icon: UserPlus,
    title: "Recruitment",
    description: "Find the right talent to drive your organization forward.",
    subServices: [
      {
        title: "HR Department",
        features: [
          "Executive search",
          "Mid-level recruitment",
          "Campus hiring",
          "Contract staffing",
          "Background verification",
        ],
      },
    ],
  },
  {
    id: "organizational-development",
    icon: TrendingUp,
    title: "Organizational Development",
    description: "Transform your organization for sustainable growth.",
    subServices: [
      {
        title: "Strategic Initiatives",
        features: [
          "Culture transformation",
          "Change management",
          "Performance management systems",
          "Succession planning",
          "Employee engagement programs",
        ],
      },
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive solutions designed to elevate your organization's 
              performance, compliance, and talent management.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container space-y-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`scroll-mt-20 ${index % 2 === 1 ? "bg-muted -mx-4 px-4 py-12 md:-mx-8 md:px-8 rounded-2xl" : ""}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <service.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {service.subServices.map((sub) => (
                  <Card key={sub.title}>
                    <CardHeader>
                      <CardTitle className="text-xl">{sub.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {sub.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            We tailor our services to meet your organization's specific requirements.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <a href="mailto:Connect@eliteeight.in" className="hover:text-white transition-colors">Connect@eliteeight.in</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <a href="tel:9971359352" className="hover:text-white transition-colors">9971359352</a>
            </div>
          </div>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
