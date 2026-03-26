import { motion } from "framer-motion";

interface StatBadgeProps {
  value: string;
  label: string;
}

export function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -5 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
    >
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </motion.div>
  );
}