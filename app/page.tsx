'use client';

import { PhoneMockup } from "@/components/PhoneMockup";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { DashboardScreen } from "@/components/screens/DashboardScreen";
import { AIGenScreen } from "@/components/screens/AIGenScreen";
import { AnalyticsScreen } from "@/components/screens/AnalyticsScreen";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#020617] mesh-gradient flex items-center justify-center relative overflow-hidden p-4 sm:p-12">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Composition Wrapper - Designed for horizontal viewing */}
      <div className="relative z-10 w-full max-w-[1500px] flex gap-6 lg:gap-10 xl:gap-12 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-10 px-4 md:px-0">
        
        {/* Device 1: Welcome Screen */}
        <div className="snap-center shrink-0">
          <PhoneMockup delay={0.2}>
            <WelcomeScreen />
          </PhoneMockup>
        </div>

        {/* Device 2: Dashboard/Analytics Feed */}
        <div className="snap-center shrink-0">
          <PhoneMockup delay={0.4}>
            <DashboardScreen />
          </PhoneMockup>
        </div>

        {/* Device 3: AI Engine */}
        <div className="snap-center shrink-0">
          <PhoneMockup delay={0.6}>
            <AIGenScreen />
          </PhoneMockup>
        </div>

        {/* Device 4: Viral Radar / Deep Analytics */}
        <div className="snap-center shrink-0">
          <PhoneMockup delay={0.8}>
            <AnalyticsScreen />
          </PhoneMockup>
        </div>

      </div>
    </div>
  );
}
