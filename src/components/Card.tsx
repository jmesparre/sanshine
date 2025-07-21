"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Card = ({
  title,
  description,
  imageUrl,
  buttonText,
  onButtonClick,
}: CardProps) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <Image src={imageUrl} alt={title} width={400} height={192} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Button onClick={onButtonClick} variant="secondary">
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

export default Card;
