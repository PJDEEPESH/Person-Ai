import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface QuickActionProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  imageUrl?: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, subtitle, icon: Icon, imageUrl }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6 flex items-center gap-4">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="p-2 rounded-full bg-indigo-100 dark:bg-gray-700">
            <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickAction;