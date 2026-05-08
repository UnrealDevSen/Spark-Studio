'use client';

import { motion } from "motion/react";
import { Sparkles, Copy, CheckCircle2, ChevronRight, Video, Tv, ScanSearch } from "lucide-react";

export function AIGenScreen() {
  return (
    <div className="w-full h-full flex flex-col px-5 py-2 overflow-y-auto hide-scrollbar text-white relative pb-24">
      {/* Background ambient */}
      <div className="absolute top-1/3 -left-10 w-48 h-48 bg-fuchsia-600/20 rounded-full blur-[60px] -z-10" />

      {/* Header */}
      <header className="flex items-center justify-between mt-2 mb-6 z-10">
        <h2 className="text-lg font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Spark AI Copilot
        </h2>
        <div className="w-8 h-8 rounded-full glow-purple glass flex items-center justify-center border-purple-500/20">
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
        </div>
      </header>

      {/* Generation Toggles */}
      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
        {['Live Titles', 'Stream Scripts', 'Chat Interactions'].map((tab, i) => (
          <div key={tab} className={`px-4 py-2 shrink-0 rounded-full text-xs font-semibold font-outfit border ${i === 0 ? 'bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.2)]' : 'bg-white/5 border-white/10 text-white/60'}`}>
            {tab}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-full bg-[#020617] rounded-[22px] p-4 border border-transparent group-hover:border-white/5 transition-colors">
          <textarea 
            placeholder="What's your stream about? (e.g. Building AI apps live)..." 
            className="w-full bg-transparent text-sm resize-none focus:outline-none text-white/90 placeholder:text-white/30 h-20 font-inter"
            defaultValue="Speedrunning web dev challenges with viewer input"
          />
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
            <span className="text-[10px] text-white/30 font-mono">Select target platform:</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center"><Video className="w-3 h-3 text-white/70" /></div>
              <div className="w-6 h-6 rounded-md bg-purple-500/30 flex items-center justify-center border border-purple-500/50"><Tv className="w-3 h-3 text-purple-300" /></div>
            </div>
          </div>
          <div className="mt-3">
             <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold font-inter flex items-center justify-center gap-1.5 glow-purple">
               <Sparkles className="w-3 h-3" /> Generate Ideas
             </button>
          </div>
        </div>
      </motion.div>

      {/* Suggested Hooks */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 mb-6 mt-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/80 font-outfit">Top Stream Titles</h3>
          <span className="text-xs text-blue-400 font-medium">Competitor Analyzed</span>
        </div>

        {[
          "CAN CHAT BUILD A FULL APP? (Letting chat write my code) 🔴",
          "Speedrunning Frontend Challenges (10 min timer) !rules",
        ].map((hook, i) => (
          <div key={i} className={`p-4 rounded-2xl glass border ${i === 0 ? 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-blue-500/10' : 'border-white/10'} backdrop-blur-sm relative`}>
            {i === 0 && <div className="absolute top-3 right-3"><CheckCircle2 className="w-4 h-4 text-blue-400" /></div>}
            <p className="text-sm text-white/90 font-inter pr-6">{hook}</p>
            <div className="flex items-center gap-3 mt-3">
              <button className="text-[10px] text-white/50 flex items-center gap-1 hover:text-white transition-colors">
                <Copy className="w-3 h-3" /> Copy
              </button>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <button className="text-[10px] text-fuchsia-400 flex items-center uppercase tracking-wider font-semibold">
                Generate Script <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Trending Categories */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <ScanSearch className="w-4 h-4 text-white/50" />
          <h3 className="text-sm font-semibold text-white/80 font-outfit">Trending Categories</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Software & Game Dev", "Just Chatting", "Tech Talk"].map((tag, i) => (
            <div key={i} className={`px-3 py-1.5 rounded-full glass border ${i===0 ? 'border-purple-500/40 bg-purple-500/10' : 'border-white/10'} flex items-center gap-1`}>
              <span className={`text-xs ${i===0 ? 'text-purple-300 font-bold' : 'text-white/70 font-inter'}`}>{tag}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
