'use client';

import { motion } from "motion/react";
import { Sparkles, Hash, Copy, CheckCircle2, ChevronRight } from "lucide-react";

export function AIGenScreen() {
  return (
    <div className="w-full h-full flex flex-col px-5 py-2 overflow-y-auto hide-scrollbar text-white relative">
      {/* Background ambient */}
      <div className="absolute top-1/3 -left-10 w-48 h-48 bg-fuchsia-600/20 rounded-full blur-[60px] -z-10" />

      {/* Header */}
      <header className="flex items-center justify-between mt-2 mb-6 z-10">
        <h2 className="text-lg font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Spark AI
        </h2>
        <div className="w-8 h-8 rounded-full glow-purple glass flex items-center justify-center border-purple-500/20">
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
        </div>
      </header>

      {/* Input Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full rounded-3xl glass p-1 mb-6 relative group border-pink-500/20 shadow-2xl shadow-purple-900/20"
      >
        <div className="w-full bg-[#020617] rounded-[22px] p-4 border border-transparent group-hover:border-white/5 transition-colors">
          <textarea 
            placeholder="Type a topic (e.g. Morning routine for developers)..." 
            className="w-full bg-transparent text-sm resize-none focus:outline-none text-white/90 placeholder:text-white/30 h-20 font-inter"
            defaultValue="5 hidden iOS features nobody uses"
          />
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
            <span className="text-[10px] text-white/30 font-mono">36 chars</span>
            <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold font-inter flex items-center gap-1.5 glow-purple">
              <Sparkles className="w-3 h-3" /> Generate
            </button>
          </div>
        </div>
      </motion.div>

      {/* Result Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/80 font-outfit">Top Hook Options</h3>
          <span className="text-xs text-blue-400 font-medium">94/100 predicted</span>
        </div>

        {[
          "Stop using your iPhone like a boomer. Use these 5 hacks.",
          "Apple is hiding these 5 features from you on purpose.",
        ].map((hook, i) => (
          <div key={i} className={`p-4 rounded-2xl glass border ${i === 0 ? 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-blue-500/10' : 'border-white/10'} backdrop-blur-sm relative`}>
            {i === 0 && <div className="absolute top-3 right-3"><CheckCircle2 className="w-4 h-4 text-blue-400" /></div>}
            <p className="text-sm font-inter text-white/90 leading-relaxed pr-6">{hook}</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
              <button className="text-[10px] text-white/50 hover:text-white flex items-center gap-1 uppercase tracking-wider font-semibold">
                <Copy className="w-3 h-3" /> Copy
              </button>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <button className="text-[10px] text-fuchsia-400 flex items-center uppercase tracking-wider font-semibold">
                Visual Idea <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Suggested Hashtags */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-white/80 font-outfit mb-3">Viral Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["#ios18", "#applehacks", "#techy", "#iphone15", "#productivity"].map((tag, i) => (
            <div key={i} className="px-3 py-1.5 rounded-full glass border border-white/10 flex items-center gap-1">
              <Hash className="w-3 h-3 text-fuchsia-400" />
              <span className="text-xs text-white/70 font-inter">{tag.replace('#', '')}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
