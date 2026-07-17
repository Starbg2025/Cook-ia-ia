import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, Terminal, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignup: () => void;
  onSwitchToForgot: () => void;
  onOpenPolicy?: (tab: 'tos' | 'privacy' | 'cookies') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  onSwitchToSignup, 
  onSwitchToForgot,
  onOpenPolicy 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const isEmailValid = validateEmail(email);

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(
        authError.message === 'Invalid login credentials' 
          ? 'Identifiants ou mot de passe incorrects.' 
          : authError.message
      );
      setIsLoading(false);
    } else {
      if (data.user) {
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold">Adresse Email</label>
            {email && (
              <span className={cn(
                "text-[10px] flex items-center gap-1 font-bold",
                isEmailValid ? "text-green-500" : "text-red-500"
              )}>
                {isEmailValid ? (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path></svg>
                    VALIDE
                  </>
                ) : "INVALIDE"}
              </span>
            )}
          </div>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/20" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chef.creative@cookia.ai"
              className={cn(
                "w-full bg-white/5 border border-white/10 rounded-lg pr-4 pl-10 py-3 text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner font-medium text-white placeholder-white/20",
                error && !isEmailValid ? "border-red-500/50" : ""
              )}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold">Mot de passe</label>
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[10px] uppercase tracking-widest text-amber-500 hover:text-amber-400 font-bold"
            >
              {showPassword ? "Masquer" : "Afficher"}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/20" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-lg pr-10 pl-10 py-3 text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner font-medium text-white placeholder-white/20 tracking-widest"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSwitchToForgot}
          className="text-xs text-white/40 hover:text-white transition-colors"
        >
          Mot de passe oublié ?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 py-3.5 rounded-lg font-bold text-sm shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-white"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Se Connecter
            <ArrowRight className="h-4 w-4 stroke-[2.5px]" />
          </>
        )}
      </button>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] text-white/20">
          <span className="bg-[#0a0a0a] px-3 font-bold">ou continuer avec</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleOAuthSignIn('google')}
          className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-lg hover:bg-white/10 transition-all text-white"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.48 10.92V13.84H21.5C21.31 14.88 20.3 17.15 17.5 19.06L17.48 19.18L19.8 20.98L19.96 20.99C21.43 19.64 22.28 17.65 22.28 15.28C22.28 14.62 22.22 13.96 22.1 13.31L12.48 10.92Z" />
            <path d="M12.48 24C15.18 24 17.44 23.11 19.14 21.61L16.74 19.75C16.08 20.2 15.18 20.5 14.1 20.5C11.51 20.5 9.31 18.73 8.52 16.32L8.4 16.33L5.99 18.2L5.95 18.31C7.6 21.61 11.02 24 14.7 24H12.48Z" />
            <path d="M8.52 16.32C8.33 15.74 8.22 15.12 8.22 14.48C8.22 13.84 8.33 13.22 8.52 12.64L8.51 12.51L6.07 10.62L5.99 10.65C5.35 11.93 5 13.38 5 14.88C5 16.38 5.35 17.83 5.99 19.11L8.52 16.32Z" />
            <path d="M12.48 8.48C14.36 8.48 15.63 9.29 16.34 9.98L18.81 7.57C17.22 6.09 15.18 5.2 12.48 5.2C8.8 5.2 5.38 7.59 3.73 10.89L6.25 12.84C7.04 10.43 9.24 8.66 11.83 8.66" />
          </svg>
          <span className="text-xs font-medium">Google</span>
        </button>
        <button
          type="button"
          onClick={() => handleOAuthSignIn('github')}
          className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-lg hover:bg-white/10 transition-all text-white"
        >
          <Terminal className="h-4 w-4" />
          <span className="text-xs font-medium">GitHub</span>
        </button>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-white/40">
          Nouveau ici ?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-amber-500 font-bold hover:underline underline-offset-4"
          >
            Créer un compte
          </button>
        </p>

        <p className="mt-8 text-[10px] text-white/30 leading-relaxed max-w-xs mx-auto">
          En vous connectant, vous acceptez nos{' '}
          <button
            type="button"
            onClick={() => onOpenPolicy?.('tos')}
            className="text-amber-500/80 hover:text-amber-400 font-bold hover:underline"
          >
            Règles d'utilisation
          </button>{' '}
          et notre{' '}
          <button
            type="button"
            onClick={() => onOpenPolicy?.('privacy')}
            className="text-amber-500/80 hover:text-amber-400 font-bold hover:underline"
          >
            Politique de Confidentialité & Cookies
          </button>
          .
        </p>
      </div>
    </form>
  );
};
