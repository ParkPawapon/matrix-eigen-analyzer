"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { voiceboxTokens } from "@/core/design-system/tokens";

type RevealProps = HTMLMotionProps<"div">;

export function Reveal({ children, transition, ...props }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: voiceboxTokens.motion.revealDuration,
        ease: voiceboxTokens.motion.revealEase,
        ...transition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
