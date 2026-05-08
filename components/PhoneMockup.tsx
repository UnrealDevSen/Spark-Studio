'use client';

import { ReactNode } from "react";
import { motion } from "motion/react";

interface PhoneMockupProps {
  children: ReactNode;
  delay?: number;
}

export function PhoneMockup({ children, delay = 0 }: PhoneMockupProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay }}
      className="relative mx-auto border-[10px] border-[#1e1e24] rounded-[2.5rem] h-[800px] w-[375px] max-w-full shadow-2xl overflow-hidden bg-[#0A0B13] scale-[0.85] sm:scale-100 transform-origin-center shrink-0"
    >
      {/* Notch */}
      <div className="absolute top-0 inset-x-1/2 -translate-x-1/2 w-32 h-6 bg-[#1e1e24] rounded-b-3xl z-50 flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10" />
      </div>
      
      {/* Inner Screen Container */}
      <div className="relative w-full h-full overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}
