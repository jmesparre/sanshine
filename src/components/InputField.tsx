"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type InputFieldProps = HTMLMotionProps<"input"> & {
  label: string;
};

const InputField = ({ label, ...props }: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <motion.input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        whileFocus={{ scale: 1.02 }}
        {...props}
      />
    </div>
  );
};

export default InputField;
