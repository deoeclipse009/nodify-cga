import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface BigSectionProps {
  icon: ReactNode;
  title: string;
  gradient: string;
  delay: number;
  side: "left" | "right";
  children: ReactNode;
}

export function BigSection({ icon, title, gradient, delay, side, children }: BigSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      className="mb-32"
    >
      <div className="flex items-center justify-center mb-8">
        <div className={`p-4 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg`}>
          {icon}
        </div>
      </div>
      <h2 className="text-5xl font-bold text-center mb-12">{title}</h2>
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </motion.div>
  );
}