import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, ShieldAlert, Settings } from 'lucide-react';

interface CookieBannerProps {
  onOpenPolicy: (tab: 'tos' | 'privacy' | 'cookies') => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already responded to cookies
    const consent = localStorage.getItem('cookia-cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly for better visual entry pacing
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookia-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem('cookia-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-lg z-[100]"
        >
          {/* Glassmorphism Outer Box */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-[#0a0a0af2] p-5 shadow-2xl backdrop-blur-xl text-white">
            {/* Ambient Background glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-36 w-36 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />

            {/* Banner Header Info */}
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Cookie className="h-5 w-5 text-amber-500 animate-pulse" />
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <h4 className="text-sm font-serif font-semibold text-white tracking-wide">
                  Respect de votre vie privée <span className="italic text-amber-400">& Cookies</span>
                </h4>
                <p className="text-[11px] text-white/60 leading-relaxed font-light">
                  Cook IA utilise des cookies essentiels pour vous authentifier de manière sécurisée (Supabase) et des cookies de personnalisation pour sauvegarder votre historique de recettes.
                </p>
              </div>

              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Fermer la notification"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Action buttons list */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => onOpenPolicy('cookies')}
                className="text-[10px] font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Settings className="h-3 w-3" />
                <span>Personnaliser / En savoir plus</span>
              </button>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDeclineAll}
                  className="flex-1 sm:flex-none px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-all cursor-pointer bg-black/20"
                >
                  Refuser
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-black rounded-lg cursor-pointer shadow-md shadow-amber-500/10 transition-all font-semibold"
                >
                  Accepter tout
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
