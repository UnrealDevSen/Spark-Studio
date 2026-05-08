'use client';

import { useState, useEffect } from "react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { DashboardScreen } from "@/components/screens/DashboardScreen";
import { AIGenScreen } from "@/components/screens/AIGenScreen";
import { AnalyticsScreen } from "@/components/screens/AnalyticsScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { NotificationsScreen } from "@/components/screens/NotificationsScreen";
import { Home, Sparkles, Activity, User, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "@/hooks/useAuth";

type Tab = 'dashboard' | 'ai' | 'analytics' | 'profile';

export default function App() {
  const { user, loading } = useAuth();
  const [started, setStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const isAppStarted = started || (user && !loading);

  return (
    <div className="min-h-screen bg-[#020617] mesh-gradient flex items-center justify-center relative overflow-hidden p-4 sm:p-12">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full z-0" />
        
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        
        <PhoneMockup delay={0.2}>
          <AnimatePresence mode="wait">
            {loading ? (
               <motion.div
                 key="loading"
                 className="w-full h-full flex flex-col items-center justify-center"
               >
                 <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
               </motion.div>
            ) : !isAppStarted ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full"
              >
                <WelcomeScreen onStart={() => setStarted(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="app"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative bg-[#0A0B13]"
              >
                <div className="absolute inset-0 overflow-hidden">
                  {showNotifications ? (
                    <NotificationsScreen onBack={() => setShowNotifications(false)} />
                  ) : activeTab === 'dashboard' ? (
                    <DashboardScreen onProfileClick={() => setActiveTab('profile')} onNotificationsClick={() => setShowNotifications(true)} />
                  ) : activeTab === 'ai' ? (
                    <AIGenScreen />
                  ) : activeTab === 'analytics' ? (
                    <AnalyticsScreen />
                  ) : (
                    <ProfileScreen />
                  )}
                </div>

                {/* Bottom Navigation */}
                <div className="absolute bottom-4 inset-x-4 h-14 rounded-2xl glass border border-white/10 flex items-center justify-around px-2 z-50 shadow-2xl">
                  <NavItem 
                    icon={<Home className="w-5 h-5" />} 
                    label="Home" 
                    isActive={activeTab === 'dashboard'} 
                    onClick={() => { setActiveTab('dashboard'); setShowNotifications(false); }} 
                  />
                  <NavItem 
                    icon={<Sparkles className="w-5 h-5" />} 
                    label="AI Gen" 
                    isActive={activeTab === 'ai'} 
                    onClick={() => { setActiveTab('ai'); setShowNotifications(false); }} 
                  />
                  <NavItem 
                    icon={<Activity className="w-5 h-5" />} 
                    label="Analytics" 
                    isActive={activeTab === 'analytics'} 
                    onClick={() => { setActiveTab('analytics'); setShowNotifications(false); }} 
                  />
                  <NavItem 
                    icon={<User className="w-5 h-5" />} 
                    label="Profile" 
                    isActive={activeTab === 'profile'} 
                    onClick={() => { setActiveTab('profile'); setShowNotifications(false); }} 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </PhoneMockup>

        {/* Desktop presentation text (hidden on small screens) */}
        <div className="hidden md:flex flex-col text-white max-w-md">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
             <h1 className="text-5xl font-bold font-outfit mb-4 text-glow">Creator Copilot.</h1>
             <p className="text-lg text-white/70 font-inter leading-relaxed">
               Connect your Twitch, YouTube, and Instagram accounts. Let AI analyze your audience, predict trends, and write your next viral stream title.
             </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-14 h-full relative transition-colors ${isActive ? 'text-fuchsia-400' : 'text-white/40 hover:text-white/70'}`}
    >
      {isActive && (
        <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white/5 rounded-xl border border-white/10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
      )}
      <div className="relative z-10 flex flex-col items-center gap-1">
        {icon}
        {isActive && <span className="text-[9px] font-bold tracking-wider">{label}</span>}
      </div>
    </button>
  );
}
