'use client';

import { motion } from "motion/react";
import { User, Settings, Camera, LogOut, ChevronRight, CheckCircle2, Crown, Shield, Download, Video, Tv } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function ProfileScreen() {
  const { user, profile } = useAuth();
  const [integrations, setIntegrations] = useState<Record<string, unknown>>({ twitchConnected: true, youtubeConnected: true, instagramConnected: false });

  useEffect(() => {
    if (user) {
      const fetchIntegrations = async () => {
        try {
          const docRef = doc(db, 'users', user.uid, 'integrations', 'status');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
             setIntegrations(docSnap.data());
          }
        } catch (error) {
          console.error("Failed to fetch integration data", error);
        }
      };
      
      fetchIntegrations();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="w-full h-full flex flex-col px-5 py-2 overflow-y-auto hide-scrollbar text-white relative pb-24">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-[80px] -z-10" />
      
      <header className="flex items-center justify-center mt-2 mb-6 z-10">
        <h2 className="text-sm font-semibold text-white/80 uppercase tracking-widest font-outfit">Creator Settings</h2>
      </header>

      {/* Avatar Section */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center mb-8 relative">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] mb-4 relative z-10 shadow-2xl shadow-purple-900/40">
             <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden border-[3px] border-[#020617]">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <>
                    <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent blur-sm" />
                    <User className="absolute w-8 h-8 text-white/50" />
                  </>
                )}
             </div>
          </div>
          <div className="absolute bottom-4 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#020617] z-20 shadow-lg glow-blue">
            <Camera className="w-4 h-4 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold font-outfit tracking-tight text-glow">{profile?.name || 'Loading...'}</h3>
        <p className="text-xs text-blue-400 font-inter mt-1 flex items-center gap-1 justify-center">
          <Crown className="w-3 h-3 text-yellow-400" /> {profile?.tier === 'premium' ? 'Premium Member' : 'Free Tier'}
        </p>
      </motion.div>

      {/* Connected Accounts */}
      <h3 className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] font-outfit mb-3 px-2 z-10">Connected Platforms</h3>
      <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col gap-2 mb-6 z-10">
         <div className={`flex items-center justify-between p-3 rounded-2xl glass ${integrations.twitchConnected ? 'border-purple-500/20' : 'border-white/5'}`}>
           <div className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${integrations.twitchConnected ? 'bg-purple-500/20 border-purple-500/40' : 'bg-white/5 border-white/10'}`}>
               <Tv className={`w-4 h-4 ${integrations.twitchConnected ? 'text-purple-400' : 'text-white/40'}`} />
             </div>
             <span className={`text-sm font-inter ${integrations.twitchConnected ? 'text-white/90' : 'text-white/50'}`}>Twitch</span>
           </div>
           {integrations.twitchConnected ? (
             <span className="text-[10px] text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Connected</span>
           ) : (
             <button className="text-[10px] bg-white/10 px-3 py-1 rounded-full text-white/70">Connect</button>
           )}
         </div>
         <div className={`flex items-center justify-between p-3 rounded-2xl glass ${integrations.youtubeConnected ? 'border-red-500/20' : 'border-white/5'}`}>
           <div className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${integrations.youtubeConnected ? 'bg-red-500/20 border-red-500/40' : 'bg-white/5 border-white/10'}`}>
               <Video className={`w-4 h-4 ${integrations.youtubeConnected ? 'text-red-500' : 'text-white/40'}`} />
             </div>
             <span className={`text-sm font-inter ${integrations.youtubeConnected ? 'text-white/90' : 'text-white/50'}`}>YouTube</span>
           </div>
           {integrations.youtubeConnected ? (
             <span className="text-[10px] text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Connected</span>
           ) : (
             <button className="text-[10px] bg-white/10 px-3 py-1 rounded-full text-white/70">Connect</button>
           )}
         </div>
         <div className={`flex items-center justify-between p-3 rounded-2xl glass ${integrations.instagramConnected ? 'border-pink-500/20' : 'border-white/5'}`}>
           <div className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${integrations.instagramConnected ? 'bg-pink-500/20 border-pink-500/40' : 'bg-white/5 border-white/10'}`}>
               <Camera className={`w-4 h-4 ${integrations.instagramConnected ? 'text-pink-400' : 'text-white/40'}`} />
             </div>
             <span className={`text-sm font-inter ${integrations.instagramConnected ? 'text-white/90' : 'text-white/50'}`}>Instagram</span>
           </div>
           {integrations.instagramConnected ? (
             <span className="text-[10px] text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Connected</span>
           ) : (
             <button className="text-[10px] bg-white/10 px-3 py-1 rounded-full text-white/70">Connect</button>
           )}
         </div>
      </motion.div>

      {/* Settings Options */}
      <h3 className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] font-outfit mb-3 px-2 z-10">Data & Security</h3>
      <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col gap-3 mb-6 z-10">
        {[
          { label: "Metrics & Privacy", icon: Shield, doc: "Control data usage" },
          { label: "Export Reports (PDF)", icon: Download, doc: "Download insights" },
          { label: "Custom Alerts", icon: Settings, doc: "Audience activity pings" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl glass border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                 <item.icon className="w-4 h-4 text-white/70" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-inter text-white/90">{item.label}</span>
                 <span className="text-[10px] text-white/40">{item.doc}</span>
               </div>
             </div>
             <div className="flex items-center gap-2">
               <ChevronRight className="w-4 h-4 text-white/30" />
             </div>
          </div>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.3 }} 
        className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-center justify-center gap-2 cursor-pointer z-10"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4 text-red-400" />
        <span className="text-sm font-semibold text-red-400">Sign Out</span>
      </motion.div>

    </div>
  );
}
