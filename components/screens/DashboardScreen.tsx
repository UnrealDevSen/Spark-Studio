'use client';

import { motion } from "motion/react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Bell, Search, Video, Image as ImageIcon, Flame } from "lucide-react";

const chartData = [
  { views: 400 },
  { views: 600 },
  { views: 500 },
  { views: 900 },
  { views: 1200 },
  { views: 1800 },
  { views: 2400 },
];

export function DashboardScreen() {
  return (
    <div className="w-full h-full flex flex-col px-5 py-2 overflow-y-auto hide-scrollbar text-white relative">
      {/* Background ambient */}
      <div className="absolute top-20 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-[60px] -z-10" />

      {/* Header */}
      <header className="flex items-center justify-between mt-2 mb-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#0A0B13] flex items-center justify-center overflow-hidden border border-white/10">
               <div className="w-full h-full bg-white/20 blur-[2px]" />
            </div>
          </div>
          <div>
            <p className="text-xs text-white/50 font-inter">Welcome back</p>
            <h2 className="text-base font-semibold font-outfit">Alex Studio</h2>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full glass flex items-center justify-center relative">
          <Bell className="w-4 h-4 text-white/80" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-fuchsia-500 rounded-full border-2 border-[#0A0B13]" />
        </div>
      </header>

      {/* Main Metric Card */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full rounded-3xl glass p-5 relative overflow-hidden mb-6 group border-blue-500/20 shadow-2xl shadow-blue-900/20"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <p className="text-sm text-white/60 font-inter mb-1">Total Reach</p>
            <h3 className="text-3xl font-bold font-outfit tracking-tight">2.4M</h3>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-semibold flex items-center gap-1">
            <Flame className="w-3 h-3" /> +124%
          </div>
        </div>

        {/* Chart */}
        <div className="h-[70px] w-[110%] -ml-[5%] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="views" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "New Video", icon: Video, color: "from-blue-500/20 to-cyan-500/5", border: "border-blue-500/20" },
          { label: "Concept", icon: ImageIcon, color: "from-fuchsia-500/20 to-purple-500/5", border: "border-fuchsia-500/20" }
        ].map((item, i) => (
          <motion.div 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            key={i} 
            className={`rounded-2xl glass p-4 flex flex-col items-center justify-center gap-2 ${item.border === 'border-blue-500/20' ? 'glow-blue' : 'glow-purple'}`}
          >
            <item.icon className="w-6 h-6 text-white/80" />
            <span className="text-xs font-semibold font-inter">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Viral Feed */}
      <h3 className="text-sm font-semibold text-white/80 font-outfit mb-3">Trending Concepts</h3>
      <div className="flex flex-col gap-3 pb-8">
        {[
          { title: "Day in the Life: Tech Edition", score: "94", type: "Reel" },
          { title: "React 19 Changes Explained", score: "88", type: "TikTok" }
        ].map((post, i) => (
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            key={i} 
            className="flex items-center justify-between p-3.5 rounded-2xl glass border-purple-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Video className="w-4 h-4 text-white/60" />
              </div>
              <div>
                <h4 className="text-sm font-medium font-inter text-white line-clamp-1 max-w-[140px]">{post.title}</h4>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">{post.type}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-fuchsia-400">{post.score}</span>
              <span className="text-[9px] text-white/40">Viral Score</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
