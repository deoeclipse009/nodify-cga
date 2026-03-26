import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ProblemCardProps {
  text: string;
}

export function ProblemCard({ text }: ProblemCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-center space-x-4"
    >
      <div className="flex-shrink-0">
        <X className="w-8 h-8 text-red-500" />
      </div>
      <p className="text-lg text-red-800 font-medium">{text}</p>
    </motion.div>
  );
}