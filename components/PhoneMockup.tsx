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
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-[320px] h-[692px] rounded-[48px] glass flex flex-col shrink-0 overflow-hidden border-white/20 shadow-2xl"
    >
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-[48px] shadow-[0_0_80px_rgba(139,92,246,0.15)] pointer-events-none" />

      {/* Hardware Details (Dynamic Island / Notch) */}
      <div className="absolute top-0 inset-x-0 h-8 flex justify-center z-50 pointer-events-none pt-2">
        <div className="w-[100px] h-6 bg-black rounded-full flex items-center justify-end px-2">
          {/* Camera Lens */}
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
      </div>
      
      {/* Inner Screen Border to simulate bevel */}
      <div className="absolute inset-[3px] rounded-[44px] border border-white/5 pointer-events-none" />

      {/* Screen Content Wrapper */}
      <div className="flex-1 w-full h-full overflow-y-auto hide-scrollbar z-10 pt-10 pb-6 mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]">
        {children}
      </div>
    </motion.div>
  );
}
