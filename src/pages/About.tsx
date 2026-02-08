import { Target, Eye, Award, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest standards in everything we do, delivering quality that exceeds expectations.",
  },
  {
    icon: Eye,
    title: "Integrity",
    description: "Transparency and honesty guide our partnerships, building trust that lasts for years.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Continuously evolving our methods for better outcomes and staying ahead of industry trends.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together to achieve shared success, believing that the whole is greater than the sum of its parts.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        <div className="absolute top-0 right-0 p-12 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 p-12 bg-secondary/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                Constructing <span className="text-primary">Excellence</span> <br />
                Inspiring <span className="text-secondary">Growth</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              We are a premier consulting firm dedicated to empowering organizations
              through strategic training, compliance excellence, and transformative talent solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Button asChild size="lg" className="rounded-full">
                <Link to="/contact">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To transform organizations by delivering exceptional training programs,
                    ensuring compliance excellence, and connecting businesses with top talent.
                    We believe in building lasting partnerships that drive measurable results.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-l-4 border-l-secondary shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                    <Eye className="h-6 w-6 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To be the most trusted partner for organizational excellence across India,
                    known for our innovative approaches, unwavering commitment to quality,
                    and the lasting impact we create for our clients.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">Core Principles</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">What We Stand For</h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={itemVariants}>
                <Card className="h-full text-center hover:bg-muted/50 transition-colors border-0 shadow-md ring-1 ring-border/50">
                  <CardContent className="pt-8 pb-8 px-6">
                    <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 duration-300">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-gradient-to-b from-muted/50 to-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded with a vision to bridge the gap between organizational potential
                  and performance, Elite Eight has grown into a trusted partner for businesses
                  across industries.
                </p>
                <p>
                  Our team of seasoned professionals brings decades of combined experience
                  in corporate training, compliance management, and strategic recruitment.
                  We understand that every organization is unique, which is why we tailor
                  our solutions to meet specific needs and objectives.
                </p>
                <ul className="space-y-3 mt-4">
                  {[
                    "Over 500+ corporate clients served",
                    "Impacted 50,000+ professionals",
                    "Industry-leading satisfaction rates",
                    "Pan-India presence"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-base font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted aspect-video lg:aspect-square flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-multiply" />
              {/* Placeholder visual - in a real app this would be a high quality team/office image */}
              <div className="text-center p-8">
                <Users className="h-20 w-20 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-medium">Empowering Teams Since Inception</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
