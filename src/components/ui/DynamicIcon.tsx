"use client";

import React from 'react';
import * as icons from 'lucide-react';

interface DynamicIconProps {
  name: keyof typeof icons;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className }) => {
  const LucideIcon = icons[name] as React.ElementType;

  if (!LucideIcon) {
    // Fallback icon or null
    return <icons.HelpCircle className={className} />;
  }

  return <LucideIcon className={className} />;
};

export default DynamicIcon;
