'use client';

import { motion } from "motion/react";
import { ChevronLeft, Bell, AlertCircle, TrendingUp } from "lucide-react";

export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full h-full flex flex-col px-5 py-2 overflow-y-auto hide-scrollbar text-white relative pb-24">
      {/* Background ambient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-600/20 rounded-full blur-[60px] -z-10" />

      {/* Header */}
      <header className="flex items-center justify-between mt-2 mb-6 z-10">
        <button className="w-8 h-8 rounded-full glass flex items-center justify-center cursor-pointer" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 text-white/80" />
        </button>
        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest font-outfit">Notifications</span>
        <div className="w-8 h-8 flex items-center justify-center">
           <Bell className="w-4 h-4 text-fuchsia-400" />
        </div>
      </header>

      <div className="flex flex-col gap-3">
        {[
          { title: "Peak Audience Approaching", message: "Your audience is expected to peak at 20:00 today.", icon: AlertCircle, color: "text-blue-400", bg: "bg-blue-500/20" },
          { title: "Weekly Report Ready", message: "You gained 1.2k new followers this week. See report.", icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/20" },
          { title: "New Trend Detected", message: "Just Chatting is trending hard right now.", icon: Bell, color: "text-purple-400", bg: "bg-purple-500/20" },
        ].map((notif, i) => (
          <motion.div 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            key={i} 
            className="p-4 rounded-2xl glass border-white/5 flex gap-4 items-start"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.bg}`}>
              <notif.icon className={`w-5 h-5 ${notif.color}`} />
            </div>
            <div>
              <h4 className="text-sm font-semibold font-inter text-white">{notif.title}</h4>
              <p className="text-xs text-white/60 mt-1">{notif.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
