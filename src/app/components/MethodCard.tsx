import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MethodCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export function MethodCard({ icon, title, description, gradient }: MethodCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
    >
      <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}