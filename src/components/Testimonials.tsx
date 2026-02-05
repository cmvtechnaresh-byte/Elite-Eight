import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "HR Director",
    company: "Tech Mahindra",
    image: "",
    content: "Elite Eight transformed our sales team's performance. Their training programs are practical, engaging, and delivered measurable results within weeks.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "CEO",
    company: "StartUp Innovations",
    image: "",
    content: "The PoSH workshop was eye-opening. Professional delivery, comprehensive content, and our team now feels more confident about workplace safety.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Operations Head",
    company: "Global Finance Corp",
    image: "",
    content: "Their recruitment services helped us find exceptional talent. The candidates were pre-screened perfectly and fit our culture seamlessly.",
    rating: 5,
  },
  {
    name: "Neha Singh",
    role: "Managing Director",
    company: "Manufacturing Ltd",
    image: "",
    content: "Organizational development consulting from Elite Eight helped us streamline operations and boost employee engagement by 40%.",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what leaders across industries say about working with Elite Eight.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
                <CardContent className="p-6 md:p-8">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
