import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { ChefHat } from 'lucide-react';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]"
        >
          <div className="relative flex flex-col items-center">
            {/* 3D-ish Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotateY: 0 }}
              animate={{ scale: 1, rotateY: 360 }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 blur-3xl bg-amber-500/40 rounded-full" />
              <div className="relative rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 p-6 shadow-[0_0_50px_rgba(245,158,11,0.3)] border border-white/20 transform rotate-6">
                <ChefHat className="h-20 w-20 text-white italic font-black" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl font-serif font-light tracking-tight text-white">
                Cook <span className="text-amber-500 font-bold italic">IA</span>
              </h1>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40 italic">L'intelligence Culinaire & Code</p>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 240 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
