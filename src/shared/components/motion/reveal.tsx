"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type TargetAndTransition,
} from "framer-motion";
import { voiceboxTokens } from "@/core/design-system/tokens";

type RevealVariant = "lift" | "line" | "press";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variant?: RevealVariant;
};

const revealStates: Record<
  RevealVariant,
  {
    hidden: TargetAndTransition;
    visible: TargetAndTransition;
  }
> = {
  lift: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  line: {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
  },
  press: {
    hidden: { opacity: 0, scale: 0.985, y: 12 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
};

export function Reveal({
  children,
  delay = 0,
  transition,
  variant = "lift",
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const states = revealStates[variant];

  return (
    <motion.div
      initial={shouldReduceMotion ? false : states.hidden}
      transition={{
        duration: voiceboxTokens.motion.revealDuration,
        ease: voiceboxTokens.motion.revealEase,
        delay,
        ...transition,
      }}
      viewport={{ amount: 0.22, margin: "0px 0px -12% 0px", once: true }}
      whileInView={shouldReduceMotion ? undefined : states.visible}
      {...props}
    >
      {children}
    </motion.div>
  );
}
