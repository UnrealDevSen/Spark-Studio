'use client';

import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

export function WelcomeScreen() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between px-6 pb-8 pt-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/30 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] -z-10" />

      {/* Top Header */}
      <div className="flex justify-center w-full mt-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass border-purple-500/20"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-white/80 uppercase tracking-[0.2em] font-inter">VERSION 2.0.4</span>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center mt-12 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative w-32 h-32 mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-60 animate-pulse glow-purple" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-600 rounded-3xl border border-white/20 backdrop-blur flex items-center justify-center">
             <Sparkles className="w-12 h-12 text-white glow-blue" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold tracking-tighter text-white text-glow mb-4 leading-tight"
        >
          Scale your<span className="text-blue-400">.</span><br/>spark<span className="text-purple-400">.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-white/50 text-sm max-w-[220px] font-inter leading-relaxed"
        >
          AI-powered growth, viral prediction, and analytics for the modern creator.
        </motion.p>
      </div>

      {/* Bottom Action */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full mt-auto"
      >
        <button className="relative w-full group overflow-hidden rounded-2xl glow-blue">
          <div className="absolute inset-0 bg-white" />
          <div className="relative px-6 py-4 flex items-center justify-center gap-2">
            <span className="text-black font-bold text-sm tracking-wide">GET STARTED</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </div>
        </button>

        <div className="flex justify-center gap-1.5 mt-6">
          <div className="w-6 h-1.5 rounded-full bg-white/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </motion.div>
    </div>
  );
}
