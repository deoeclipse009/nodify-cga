import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SolutionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function SolutionCard({ icon, title, description }: SolutionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 flex items-start space-x-4"
    >
      <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
        <p className="text-green-700">{description}</p>
      </div>
    </motion.div>
  );
}