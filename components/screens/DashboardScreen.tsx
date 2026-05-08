'use client';

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Bell, Video, MessageSquare, Clock, TrendingUp, AlertCircle, Tv, Camera } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

const chartData = [
  { time: '10m', viewers: 400 },
  { time: '20m', viewers: 600 },
  { time: '30m', viewers: 850 },
  { time: '40m', viewers: 1200 },
  { time: '50m', viewers: 1800 },
  { time: '60m', viewers: 1600 },
  { time: '70m', viewers: 2100 },
];

interface DashboardScreenProps {
  onProfileClick: () => void;
  onNotificationsClick: () => void;
}

export function DashboardScreen({ onProfileClick, onNotificationsClick }: DashboardScreenProps) {
  const { user, profile } = useAuth();
  const [streams, setStreams] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    if (user) {
      const fetchStreams = async () => {
        try {
          const q = query(
            collection(db, 'users', user.uid, 'streams'),
            orderBy('createdAt', 'desc'),
            limit(5)
          );
          const snap = await getDocs(q);
          const fetched = snap.docs.map(doc => doc.data() as Record<string, unknown>);
          setStreams(fetched);
        } catch (error) {
          console.error("Failed to fetch streams", error);
        }
      };
      fetchStreams();
    }
  }, [user]);

  const peakViewers = streams.length > 0 ? Math.max(...streams.map(s => Number(s.peakViewers) || 0)) : 0;
  const avgRetention = streams.length > 0 ? Math.round(streams.reduce((acc, s) => acc + (Number(s.avgRetention) || 0), 0) / streams.length) : 0;
  const avgChat = streams.length > 0 ? Math.round(streams.reduce((acc, s) => acc + (Number(s.chatEngaged) || 0), 0) / streams.length) : 0;

  return (
    <div className="w-full h-full flex flex-col px-5 py-2 overflow-y-auto hide-scrollbar text-white relative pb-24">
      {/* Background ambient */}
      <div className="absolute top-20 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-[60px] -z-10" />

      {/* Header */}
      <header className="flex items-center justify-between mt-2 mb-6 z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onProfileClick}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#0A0B13] flex items-center justify-center overflow-hidden border border-white/10">
              {profile?.photoURL ? (
                 <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                 <div className="w-full h-full bg-white/20 blur-[2px]" />
              )}
            </div>
          </div>
          <div>
            <p className="text-xs text-white/50 font-inter">Creator Dashboard</p>
            <h2 className="text-base font-semibold font-outfit truncate max-w-[140px]">{profile?.name || 'Loading...'}</h2>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full glass flex items-center justify-center relative cursor-pointer" onClick={onNotificationsClick}>
          <div className="absolute top-2 right-2 w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,1)]" />
          <Bell className="w-4 h-4 text-white" />
        </div>
      </header>

      {/* Connected Platforms */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex -space-x-2">
           <div className="w-8 h-8 rounded-full glass border-purple-500/50 flex items-center justify-center bg-purple-500/20 z-30">
             <Tv className="w-4 h-4 text-white" />
           </div>
           <div className="w-8 h-8 rounded-full glass border-red-500/50 flex items-center justify-center bg-red-500/20 z-20">
             <Video className="w-4 h-4 text-white" />
           </div>
           <div className="w-8 h-8 rounded-full glass border-pink-500/50 flex items-center justify-center bg-pink-500/20 z-10">
             <Camera className="w-4 h-4 text-white" />
           </div>
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-outfit">Active Integrations</span>
      </div>

      {/* AI Insight Alert */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="w-full rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 p-3 mb-4 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
          <AlertCircle className="w-4 h-4 text-blue-400" />
        </div>
        <p className="text-xs font-inter text-white/90">
          <strong className="text-blue-300 font-semibold">AI Insight:</strong> Your audience is expected to peak at <strong>20:00 (8 PM)</strong> today. Plan your next stream accordingly.
        </p>
      </motion.div>

      {/* Main Metric Card */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full rounded-3xl glass p-5 relative overflow-hidden mb-6 group border-purple-500/20 shadow-2xl shadow-purple-900/20"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <p className="text-sm text-white/60 font-inter mb-1">Peak Concurrent Viewers</p>
            <h3 className="text-3xl font-bold font-outfit tracking-tight">{peakViewers >= 1000 ? (peakViewers/1000).toFixed(1) + 'K' : peakViewers}</h3>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +15%
          </div>
        </div>

        <div className="h-[90px] w-[110%] -ml-[5%] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="viewers" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Metrics Grids */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "Avg Retention", value: `${avgRetention}m`, icon: Clock, color: "from-blue-500/20 to-cyan-500/5", border: "border-blue-500/20" },
          { label: "Chat Engaged", value: `${avgChat} msg/m`, icon: MessageSquare, color: "from-fuchsia-500/20 to-purple-500/5", border: "border-fuchsia-500/20" }
        ].map((item, i) => (
          <motion.div 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            key={i} 
            className={`rounded-2xl glass p-4 flex flex-col items-start gap-3 ${item.border === 'border-blue-500/20' ? 'glow-blue' : 'glow-purple'}`}
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
               <item.icon className="w-4 h-4 text-white/80" />
            </div>
            <div>
              <p className="text-white text-lg font-bold tracking-tight">{item.value}</p>
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-inter">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Streams Analysis */}
      <h3 className="text-sm font-semibold text-white/80 font-outfit mb-3">Recent Streams</h3>
      <div className="flex flex-col gap-3 pb-8">
        {streams.length === 0 ? (
          <p className="text-xs text-white/50 text-center py-4 bg-white/5 rounded-2xl border border-white/5">No streams recorded yet.</p>
        ) : streams.map((stream, i) => (
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            key={i}
            className="flex items-center justify-between p-3.5 rounded-2xl glass border-purple-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden relative shrink-0">
                 {stream.platform === 'YouTube' ? <Video className="w-5 h-5 text-red-500" /> : <Tv className="w-5 h-5 text-purple-500" />}
              </div>
              <div>
                <h4 className="text-sm font-medium font-inter text-white line-clamp-1 pr-2">{String(stream.title || '')}</h4>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{String(stream.platform || '')}</p>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-xs font-bold text-white">
                {Number(stream.views || 0) >= 1000 ? (Number(stream.views || 0)/1000).toFixed(1) + 'K' : Number(stream.views || 0)}
              </span>
              <span className="text-[9px] text-white/40">Views</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
