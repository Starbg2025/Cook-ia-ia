import { motion } from 'motion/react';
import React from 'react';
import { ChefHat } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex h-screen w-full bg-[#080808] text-white selection:bg-amber-500/30 overflow-hidden">
      {/* Left Branding Section */}
      <div className="relative hidden w-3/5 flex-col justify-center border-r border-white/5 px-20 lg:flex">
        {/* Animated Background Effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-600/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-orange-900/20 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="mb-8 flex items-center gap-6"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.3)] border border-white/20 transform rotate-6">
              <ChefHat className="text-white h-10 w-10" />
            </div>
            <div>
              <h1 className="text-5xl font-serif font-light tracking-tight">Cook <span className="text-amber-500 font-bold italic">IA</span></h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1 italic">L'intelligence Culinaire & Code</p>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-light leading-tight mb-8 max-w-md"
          >
            Transformez vos <span className="italic font-serif">idées</span> en <span className="text-amber-200 underline decoration-amber-500/50 underline-offset-8">réalité</span> avec précision.
          </motion.h2>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3 text-white/60">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span className="text-sm font-light">Génération de code en temps réel</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span className="text-sm font-light">Synchronisation instantanée Supabase</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span className="text-sm font-light">Sécurité de niveau bancaire (Auth v2)</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-20 flex gap-12 text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">
          <div>© 2024 COOK IA STUDIO</div>
          <div>STABLE RELEASE 2.4.0</div>
        </div>
      </div>

      {/* Right Auth Section */}
      <div className="flex w-full flex-col justify-center bg-[#0a0a0a] px-8 lg:w-2/5 lg:px-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-white/40 text-sm">{subtitle}</p>
          </div>
          
          {children}

          {/* Micro-Interactions States */}
          <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-6 opacity-40">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-[9px] uppercase tracking-widest font-bold">Serveur Cloud Ok</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <span className="text-[9px] uppercase tracking-widest font-bold">SSL 256-bit</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
