import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const team = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    image: "",
    bio: "20+ years in corporate training and HR consulting",
    linkedin: "#",
    email: "arjun@eliteeight.com",
  },
  {
    name: "Kavitha Rao",
    role: "Head of Training",
    image: "",
    bio: "Expert in behavioral training & leadership development",
    linkedin: "#",
    email: "kavitha@eliteeight.com",
  },
  {
    name: "Vikram Joshi",
    role: "Compliance Director",
    image: "",
    bio: "Specialist in PoSH and regulatory compliance",
    linkedin: "#",
    email: "vikram@eliteeight.com",
  },
  {
    name: "Sneha Kapoor",
    role: "Recruitment Lead",
    image: "",
    bio: "Talent acquisition expert with Fortune 500 experience",
    linkedin: "#",
    email: "sneha@eliteeight.com",
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const TeamSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Meet the Experts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry veterans with decades of combined experience in transforming organizations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {team.map((member, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="h-28 w-28 mx-auto mb-4 border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                      <AvatarImage src={member.image} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-2xl font-bold">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <a
                      href={member.linkedin}
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
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
