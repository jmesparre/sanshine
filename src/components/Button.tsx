"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "outline";
};

const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const baseClasses = "px-6 py-3 rounded-full font-semibold font-alegreya transition-colors duration-300 flex items-center justify-center";
  const variantClasses = {
    primary: "bg-gray-800 text-white hover:bg-gray-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
