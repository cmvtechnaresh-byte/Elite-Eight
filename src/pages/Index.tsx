 import { Link } from "react-router-dom";
 import { motion } from "framer-motion";
 import { ArrowRight, Users, Shield, UserPlus, TrendingUp, CheckCircle2, Sparkles, Play, Star } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Layout } from "@/components/layout/Layout";
 import { AnimatedCounter } from "@/components/AnimatedCounter";
 import { Testimonials } from "@/components/Testimonials";
 import { TeamSection } from "@/components/TeamSection";
 import { FloatingGraphics } from "@/components/FloatingGraphics";
 import { MissionVision } from "@/components/MissionVision";
 import heroIllustration from "@/assets/hero-illustration.png";
 
 const services = [
   {
     icon: Users,
     title: "Corporate Training",
     description: "Sales Training & Behavioural Training programs designed to elevate team performance.",
     link: "/services#corporate-training",
     features: ["Sales Training", "Behavioural Training", "Leadership Development"],
   },
   {
     icon: Shield,
     title: "Compliance Training",
     description: "PoSH Workshops and regulatory compliance programs for workplace safety.",
     link: "/services#compliance-training",
     features: ["PoSH Workshops", "Regulatory Compliance", "Safety Training"],
   },
   {
     icon: UserPlus,
     title: "Recruitment",
     description: "Strategic HR Department solutions and talent acquisition services.",
     link: "/services#recruitment",
     features: ["HR Department Setup", "Talent Acquisition", "Headhunting"],
   },
   {
     icon: TrendingUp,
     title: "Organizational Development",
     description: "Transform your organization with strategic growth and development initiatives.",
     link: "/services#organizational-development",
     features: ["Strategy Consulting", "Change Management", "Process Optimization"],
   },
 ];
 
 const stats = [
   { value: "500+", label: "Professionals Trained" },
   { value: "50+", label: "Partner Companies" },
   { value: "98%", label: "Client Satisfaction" },
   { value: "10+", label: "Years Experience" },
 ];
 
 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: { staggerChildren: 0.1 },
   },
 };
 
 const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
 };
 
 const Index = () => {
   return (
     <Layout>
       {/* Hero Section - Ultra Modern Design */}
       <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
         {/* Modern Background Elements */}
         <div className="absolute inset-0 w-full h-full">
           <div className="absolute top-0 z-[0] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
           <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
         </div>
 
         <div className="container relative z-10">
           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[85vh] py-20">
             {/* Left side - Text content */}
             <div className="text-left space-y-8">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
               >
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                 </span>
                 #1 Corporate Training Partner
               </motion.div>
               
               <motion.h1
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.6, delay: 0.1 }}
                 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
               >
                 Elevate Your <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                   Business Potential
                 </span>
               </motion.h1>
               
               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="text-xl text-muted-foreground max-w-lg leading-relaxed"
               >
                 Unlock growth with expert corporate training, compliance solutions, and strategic recruitment that drives measurable results.
               </motion.p>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 className="flex flex-col sm:flex-row gap-4 pt-4"
               >
                 <Button size="lg" className="rounded-full h-12 px-8 text-base group" asChild>
                   <Link to="/contact">
                     Get Started
                     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                   </Link>
                 </Button>
                 <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base" asChild>
                   <Link to="/services" className="flex items-center gap-2">
                     View Services
                   </Link>
                 </Button>
               </motion.div>
             </div>
             
             {/* Right side - Illustration */}
             <motion.div
               initial={{ opacity: 0, x: 50, rotateY: -10 }}
               animate={{ opacity: 1, x: 0, rotateY: 0 }}
               transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
               className="relative hidden lg:block"
             >
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl" />
 
               <motion.div
                 animate={{ 
                   y: [0, -20, 0],
                   rotate: [0, 1.5, -1.5, 0]
                 }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                 className="relative"
               >
                 <div className="relative">
                   <img src={heroIllustration} alt="Corporate training" className="w-full h-auto" />
                   
                   <motion.div
                     className="absolute -top-6 -right-6 bg-card/95 backdrop-blur shadow-xl rounded-2xl px-5 py-3 border border-primary/20"
                     animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                         <TrendingUp className="h-5 w-5 text-primary-foreground" />
                       </div>
                       <div>
                         <p className="text-lg font-bold text-primary">10+</p>
                         <p className="text-xs text-muted-foreground">Years Experience</p>
                       </div>
                     </div>
                   </motion.div>
                 </div>
               </motion.div>
             </motion.div>
           </div>
         </div>
       </section>

       {/* Stats Section */}
       <section className="py-20 bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
         <div className="container relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
             {stats.map((stat, index) => (
               <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} delay={index * 0.15} />
             ))}
           </div>
         </div>
       </section>

       {/* Trusted Companies Infinite Scroll */}
       <section className="py-20 bg-background border-b overflow-hidden">
         <div className="container mb-12 text-center">
           <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Trusted by Industry Leaders</p>
         </div>
         <div className="flex relative overflow-hidden">
           <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10" />
           <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10" />
           <motion.div
             initial={{ x: 0 }}
             animate={{ x: "-50%" }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="flex gap-24 px-4 min-w-max items-center"
           >
             {[...Array(2)].map((_, i) => (
               <div key={i} className="flex gap-24 items-center">
                 {["TechGlobal", "InnovateX", "FutureScale", "AlphaCorp", "OmegaSystems", "PrimeGroup", "ElevateInc", "SummitPeak"].map((company, index) => (
                   <div key={index} className="flex items-center gap-3 group cursor-default">
                     <div className="h-8 w-8 rounded bg-foreground/5 group-hover:bg-primary/20 transition-colors duration-300" />
                     <span className="text-2xl font-bold text-foreground/20 group-hover:text-foreground/80 transition-colors duration-300">
                       {company}
                     </span>
                   </div>
                 ))}
               </div>
             ))}
           </motion.div>
         </div>
       </section>

       {/* Mission & Vision Section */}
       <MissionVision />
 
       {/* Services Section */}
       <section className="py-24">
         <div className="container">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16"
           >
             <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
               What We Offer
             </span>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Services</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Comprehensive solutions tailored to meet your organization's unique needs and drive measurable results
             </p>
           </motion.div>
           
           <motion.div
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
           >
             {services.map((service) => (
               <motion.div key={service.title} variants={itemVariants}>
                 <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <CardHeader className="relative">
                     <motion.div
                       className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                       whileHover={{ rotate: [0, -10, 10, 0] }}
                       transition={{ duration: 0.5 }}
                     >
                       <service.icon className="h-7 w-7 text-primary" />
                     </motion.div>
                     <CardTitle className="text-xl">{service.title}</CardTitle>
                   </CardHeader>
                   <CardContent className="relative">
                     <CardDescription className="text-base mb-4">{service.description}</CardDescription>
                     <ul className="space-y-2 mb-6">
                       {service.features.map((feature) => (
                         <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                           <CheckCircle2 className="h-4 w-4 text-primary" />
                           {feature}
                         </li>
                       ))}
                     </ul>
                     <Link to={service.link} className="text-primary font-medium inline-flex items-center hover:underline group/link">
                       Learn more
                       <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                     </Link>
                   </CardContent>
                 </Card>
               </motion.div>
             ))}
           </motion.div>
         </div>
       </section>
 
       <TeamSection />
       <Testimonials />
 
       {/* CTA Section */}
       <section className="py-20">
         <div className="container">
           <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground px-6 py-16 md:px-16 md:py-24 text-center shadow-2xl">
             {/* Abstract Background Shapes */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
               <div className="absolute -top-[50%] -left-[20%] w-[70%] h-[70%] rounded-full bg-white/5 blur-3xl" />
               <div className="absolute -bottom-[50%] -right-[20%] w-[70%] h-[70%] rounded-full bg-white/10 blur-3xl" />
             </div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true }} 
               transition={{ duration: 0.6 }}
               className="relative z-10 max-w-3xl mx-auto"
             >
               <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                 Ready to Transform Your Organization?
               </h2>
               <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
                 Join 50+ companies that have elevated their workforce with Elite Eight's expert solutions
               </p>
               
               <Button size="lg" variant="secondary" className="h-12 px-8 text-base rounded-full group" asChild>
                 <Link to="/contact">
                   Start Your Journey
                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </Button>
             </motion.div>
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Index;