"use client";

import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center"
    >
      <div className="spinner"></div>
    </motion.div>
  );
};

export default Spinner;
