 import { motion } from "framer-motion";
 import { Target, Eye, Rocket, Heart } from "lucide-react";
 
 const items = [
   {
     icon: Target,
     title: "Our Mission",
     description:
       "To transform organizations by delivering exceptional training programs, ensuring compliance excellence, and connecting businesses with top talent that drives measurable results.",
     gradient: "from-primary to-primary/60",
     delay: 0,
   },
   {
     icon: Eye,
     title: "Our Vision",
     description:
       "To be the most trusted partner for organizational excellence across India, known for our innovative approaches, unwavering commitment to quality, and lasting impact.",
     gradient: "from-secondary to-secondary/60",
     delay: 0.1,
   },
   {
     icon: Rocket,
     title: "Our Approach",
     description:
       "We combine data-driven insights with human-centric methodologies to create customized solutions that address your unique challenges and accelerate growth.",
     gradient: "from-primary to-secondary",
     delay: 0.2,
   },
   {
     icon: Heart,
     title: "Our Promise",
     description:
       "We are committed to building lasting partnerships based on trust, transparency, and shared success. Your growth is our priority.",
     gradient: "from-secondary to-primary",
     delay: 0.3,
   },
 ];
 
 export const MissionVision = () => {
   return (
     <section className="py-24 relative overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background" />
       <motion.div
         className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
         animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
         transition={{ duration: 8, repeat: Infinity }}
       />
       <motion.div
         className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
         animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
         transition={{ duration: 10, repeat: Infinity, delay: 2 }}
       />
 
       <div className="container relative z-10">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
         >
           <motion.span
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-primary mb-4"
           >
             <Target className="h-4 w-4" />
             <span className="text-sm font-medium">Who We Are</span>
           </motion.span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
             Driving{" "}
             <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
               Excellence
             </span>{" "}
             Forward
           </h2>
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             Our commitment to organizational transformation is backed by years of experience and a passion for results
           </p>
         </motion.div>
 
         <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
           {items.map((item, index) => (
             <motion.div
               key={item.title}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: item.delay }}
               className="group relative"
             >
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative bg-card border border-border/50 rounded-2xl p-8 h-full hover:border-primary/30 transition-all duration-500 hover:shadow-2xl">
                 {/* Icon with gradient background */}
                 <motion.div
                   className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}
                   whileHover={{ scale: 1.1, rotate: 5 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                   <item.icon className="h-8 w-8 text-primary-foreground" />
                 </motion.div>
 
                 <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                   {item.title}
                 </h3>
                 <p className="text-muted-foreground leading-relaxed">
                   {item.description}
                 </p>
 
                 {/* Decorative corner */}
                 <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-primary/10 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-secondary/10 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };