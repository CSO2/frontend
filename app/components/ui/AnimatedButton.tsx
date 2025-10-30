'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
}

export default function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
}: AnimatedButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-wso2-orange text-white hover:bg-wso2-orange-dark shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700',
    outline: 'border-2 border-wso2-orange text-wso2-orange hover:bg-wso2-orange hover:text-white',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={combinedClasses}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={combinedClasses}
    >
      {children}
    </motion.button>
  );
}
