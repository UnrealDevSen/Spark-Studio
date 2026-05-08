'use client';

import { motion } from "motion/react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import { Activity, Clock, Eye, ChevronLeft, MessageCircle } from "lucide-react";

const radarData = [
  { subject: 'Viewer Peak', A: 96, fullMark: 100 },
  { subject: 'Retention', A: 85, fullMark: 100 },
  { subject: 'Chat Spd', A: 92, fullMark: 100 },
  { subject: 'New Subs', A: 78, fullMark: 100 },
  { subject: 'Donations', A: 65, fullMark: 100 },
  { subject: 'Av Duration', A: 90, fullMark: 100 },
];

const peakData = [
  { time: '18:00', viewers: 400 },
  { time: '19:00', viewers: 800 },
  { time: '20:00', viewers: 2100 }, // Peak
  { time: '21:00', viewers: 1800 },
  { time: '22:00', viewers: 1200 },
];

export function AnalyticsScreen() {
  return (
    <div className="w-full h-full flex flex-col px-5 py-2 overflow-y-auto hide-scrollbar text-white relative pb-24">
      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] -z-10" />

      {/* Header */}
      <header className="flex items-center justify-between mt-2 mb-6 z-10">
        <button className="w-8 h-8 rounded-full glass flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-white/80" />
        </button>
        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest font-outfit">Deep Analytics</span>
        <div className="w-8 h-8 flex items-center justify-center">
           <Activity className="w-4 h-4 text-blue-400" />
        </div>
      </header>

      {/* Audience Peak Graph */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full rounded-2xl glass p-4 mb-6 relative border-blue-500/20"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold font-outfit text-white/90">Audience Peaks</span>
          <span className="text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-full">+12% vs Average</span>
        </div>
        <div className="h-[120px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={peakData}>
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(2, 6, 23, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="viewers" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#020617', stroke: '#3b82f6', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Stream DNA Radar */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full mb-6 relative z-10 bg-white/5 rounded-2xl border border-white/10 p-4"
      >
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-[0.1em] font-outfit mb-2 text-center">Live DNA Profile</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'sans-serif' }} />
              <Radar name="Stream" dataKey="A" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Engagement Stats Grids */}
      <h3 className="text-sm font-semibold text-white/80 font-outfit mb-3">Live Metrics Snapshot</h3>
      <div className="grid grid-cols-2 gap-3 pb-8">
        {[
          { icon: Eye, label: "Max Viewers", value: "2.1K", glow: "text-blue-400" },
          { icon: Clock, label: "Avg Retention", value: "42 min", glow: "text-green-400" },
          { icon: MessageCircle, label: "Active Chatters", value: "840", glow: "text-purple-400" },
          { icon: Activity, label: "Overall Rating", value: "S Tier", glow: "text-yellow-400" }
        ].map((stat, i) => (
          <motion.div 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            key={i} 
            className="p-3 rounded-2xl glass border-white/5 flex flex-col gap-2"
          >
            <stat.icon className={`w-4 h-4 ${stat.glow}`} />
            <div>
              <p className="text-lg font-bold font-outfit text-white">{stat.value}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
