import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { initialTeam } from "@/lib/initialData";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  linkedin?: string;
  email?: string;
}

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
  const [team, setTeam] = useState<any[]>(initialTeam);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "team"));
        if (!querySnapshot.empty) {
          const teamData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTeam(teamData);
        }
      } catch (err) {
        console.error("Failed to fetch team", err);
      }
    };
    fetchTeam();
  }, []);

  if (team.length === 0) {
    // Optional: Return null or a skeleton here if preferred. 
    // For now, if empty (e.g. first load), it just won't show cards, which is fine.
    // Or we can leave the section title but no cards.
  }

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
          {team.map((member) => (
            <motion.div key={member.id} variants={cardVariants}>
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
                  <p className="text-muted-foreground text-sm mb-4">{member.bio || "Team Member"}</p>
                  <div className="flex justify-center gap-3">
                    {member.linkedin && <a
                      href={member.linkedin}
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>}
                    {member.email && <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>}
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
