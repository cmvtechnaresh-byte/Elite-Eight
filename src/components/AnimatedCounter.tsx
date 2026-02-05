import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  delay?: number;
}

export const AnimatedCounter = ({ value, label, delay = 0 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  // Extract numeric part and suffix (e.g., "500+" -> 500 and "+")
  const numericMatch = value.match(/(\d+)/);
  const targetNumber = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/\d+/, "");

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();
    const startDelay = delay * 1000;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime - startDelay;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * targetNumber);
        
        setDisplayValue(current.toString());

        if (progress >= 1) {
          clearInterval(interval);
          setDisplayValue(targetNumber.toString());
        }
      }, 16);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [isInView, targetNumber, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <motion.div
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2"
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
      >
        {displayValue}
        <span className="text-primary-foreground/80">{suffix}</span>
      </motion.div>
      <motion.div
        className="text-sm md:text-base text-primary-foreground/70 font-medium tracking-wide uppercase"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};
