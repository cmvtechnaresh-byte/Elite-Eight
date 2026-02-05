import { motion } from "framer-motion";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
}));

export const FloatingGraphics = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-radial from-secondary/20 via-secondary/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-gradient-radial from-accent/30 via-accent/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Large gradient orb */}
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-primary/40 to-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary orb */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/30 to-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-20 left-[10%] w-8 h-8 border-2 border-primary/40 rounded-lg"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-[20%] w-12 h-12 border-2 border-secondary/30 rounded-full"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-[30%] w-6 h-6 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-60 right-[10%] w-16 h-16 border border-primary/20"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        animate={{
          rotate: [0, 180, 360],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glowing lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{
          x: ["-100%", "200%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
        animate={{
          x: ["100%", "-200%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
};
