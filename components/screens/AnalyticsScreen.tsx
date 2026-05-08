'use client';

import { motion } from "motion/react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Activity, Clock, Heart, Share2, Eye, ChevronLeft } from "lucide-react";

const radarData = [
  { subject: 'Attention', A: 96, fullMark: 100 },
  { subject: 'Replay', A: 85, fullMark: 100 },
  { subject: 'Shares', A: 92, fullMark: 100 },
  { subject: 'Saves', A: 78, fullMark: 100 },
  { subject: 'Comments', A: 65, fullMark: 100 },
  { subject: 'Watch Time', A: 90, fullMark: 100 },
];

export function AnalyticsScreen() {
  return (
    <div className="w-full h-full flex flex-col px-5 py-2 overflow-y-auto hide-scrollbar text-white relative">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-fuchsia-600/10 rounded-full blur-[80px] -z-10" />

      {/* Header */}
      <header className="flex items-center justify-between mt-2 mb-6 z-10">
        <button className="w-8 h-8 rounded-full glass border-white/10 flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-white/80" />
        </button>
        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest font-outfit">Viral Radar</span>
        <div className="w-8 h-8 flex items-center justify-center">
           <Activity className="w-4 h-4 text-fuchsia-400" />
        </div>
      </header>

      {/* Hero Dial / Score */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center justify-center mb-6 relative"
      >
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Decorative dial background */}
          <div className="absolute inset-0 rounded-full border-[6px] border-white/5" />
          {/* Fake continuous progress circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
             <circle 
               cx="72" cy="72" r="69" 
               fill="none" 
               stroke="url(#gradientDial)" 
               strokeWidth="6" 
               strokeDasharray="433" 
               strokeDashoffset="30"
               strokeLinecap="round"
             />
             <defs>
               <linearGradient id="gradientDial" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#c084fc" />
                 <stop offset="100%" stopColor="#3b82f6" />
               </linearGradient>
             </defs>
          </svg>

          <div className="flex flex-col items-center z-10">
            <span className="text-4xl font-bold font-outfit text-white text-glow">94</span>
            <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Score</span>
          </div>
        </div>
        
        <div className="mt-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
          <span className="text-xs text-blue-300 font-inter font-medium flex items-center gap-1.5"><FlameIcon /> Highly Viral</span>
        </div>
      </motion.div>

      {/* Radar Chart */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full h-[180px] mb-6 relative z-10"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'sans-serif' }} />
            <Radar name="Video" dataKey="A" stroke="#a855f7" strokeWidth={2} fill="#a855f7" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Engagement Stats Grids */}
      <div className="grid grid-cols-2 gap-3 pb-8">
        {[
          { icon: Eye, label: "Est. Views", value: "3.2M", glow: "text-blue-400" },
          { icon: Share2, label: "Share Ratio", value: "1:15", glow: "text-green-400" },
          { icon: Heart, label: "Engagement", value: "14.2%", glow: "text-red-400" },
          { icon: Clock, label: "Optimal Time", value: "6 PM EST", glow: "text-purple-400" }
        ].map((stat, i) => (
          <motion.div 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            key={i} 
            className="p-3 rounded-2xl glass border-purple-500/10 flex flex-col gap-2"
          >
            <stat.icon className={`w-4 h-4 ${stat.glow}`} />
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</p>
              <p className="text-sm font-semibold font-inter text-white/90">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FlameIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>
    </svg>
  )
}
