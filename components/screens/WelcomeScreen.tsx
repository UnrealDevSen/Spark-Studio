'use client';

import { useState } from 'react';
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { loginWithGoogle } from "@/lib/firebase";

export function WelcomeScreen({ onStart }: { onStart?: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      if (onStart) onStart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between px-6 pb-8 pt-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-20%] w-64 h-64 bg-fuchsia-600/30 rounded-full blur-[80px]" />
      <div className="absolute top-[40%] right-[-20%] w-48 h-48 bg-blue-600/30 rounded-full blur-[80px]" />

      <div className="z-10 mt-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-blue-500 flex items-center justify-center p-0.5 mb-8 shadow-2xl shadow-fuchsia-900/50"
        >
          <div className="w-full h-full bg-[#0A0B13] rounded-[14px] flex items-center justify-center">
             <Sparkles className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold tracking-tighter text-white text-glow mb-4 leading-tight font-outfit"
        >
          Scale your<span className="text-blue-400">.</span><br/>spark<span className="text-purple-400">.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-white/60 text-sm font-inter leading-relaxed max-w-[280px]"
        >
          Connect your platforms. Let AI find your best content hooks and viral moments.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full mt-auto"
      >
        <button 
          onClick={handleLogin} 
          disabled={loading}
          className="relative w-full group overflow-hidden rounded-2xl glow-blue disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-white" />
          <div className="relative px-6 py-4 flex items-center justify-center gap-2">
            {loading ? (
              <Loader2 className="w-5 h-5 text-black animate-spin" />
            ) : (
              <>
                <span className="text-black font-bold text-sm tracking-wide">CONTINUE WITH GOOGLE</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            )}
          </div>
        </button>

        <div className="mt-4 flex flex-col items-center gap-2 text-white/40 text-xs font-inter">
          <p>By connecting, you agree to our Terms.</p>
        </div>
      </motion.div>
    </div>
  );
}
