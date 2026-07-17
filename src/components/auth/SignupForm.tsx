import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

interface SignupFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
  onOpenPolicy?: (tab: 'tos' | 'privacy' | 'cookies') => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onSwitchToLogin, onOpenPolicy }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTOS, setAcceptedTOS] = useState(false);

  const passwordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    let strength = 0;
    if (pass.length > 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = passwordStrength(password);
  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'][strength - 1] || 'bg-white/10';
  const strengthText = ['Faible', 'Moyen', 'Fort', 'Très fort'][strength - 1] || 'Trop court';

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!acceptedTOS) {
      setError('Veuillez accepter les conditions d\'utilisation.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
    } else {
      if (data.session) {
        onSuccess();
      } else {
        setError("Compte créé avec succès ! Un e-mail de confirmation vous a été envoyé si requis.");
        setIsLoading(false);
        setTimeout(() => {
          onSwitchToLogin();
        }, 3000);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Nom complet</label>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/20" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Chef Creative"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg pr-4 pl-10 py-2.5 text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner text-white placeholder-white/20"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Adresse Email</label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/20" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chef@cookia.ai"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg pr-4 pl-10 py-2.5 text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner text-white placeholder-white/20"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Mot de passe</label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/20" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg pr-4 pl-10 py-2.5 text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner text-white placeholder-white/20 tracking-widest"
            />
          </div>
          {/* Password Strength Indicator */}
          <div className="space-y-1 px-1 mt-2">
            <div className="flex h-1 gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-full flex-1 rounded-full transition-all duration-300",
                    i <= strength ? strengthColor : "bg-white/5"
                  )}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-wider text-white/30 font-bold">
              <span>Sécurité</span>
              <span>{strengthText}</span>
            </div>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Confirmer</label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/20" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg pr-4 pl-10 py-2.5 text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner text-white placeholder-white/20 tracking-widest"
            />
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3 py-2">
        <div className="flex h-5 items-center">
          <input
            id="tos"
            type="checkbox"
            checked={acceptedTOS}
            onChange={(e) => setAcceptedTOS(e.target.checked)}
            className="h-4 w-4 rounded border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 cursor-pointer"
          />
        </div>
        <label htmlFor="tos" className="text-[10px] text-white/40 leading-tight">
          J'accepte les{' '}
          <button 
            type="button" 
            onClick={() => onOpenPolicy?.('tos')}
            className="text-amber-500 font-bold hover:underline cursor-pointer"
          >
            conditions
          </button>{' '}
          et la{' '}
          <button 
            type="button" 
            onClick={() => onOpenPolicy?.('privacy')}
            className="text-amber-500 font-bold hover:underline cursor-pointer"
          >
            politique de confidentialité & cookies
          </button>
          .
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 py-3.5 rounded-lg font-bold text-sm shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-white mt-4"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Créer mon compte
            <ArrowRight className="h-4 w-4 stroke-[2.5px]" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-white/40 mt-6">
        Déjà un compte ?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-amber-500 font-bold hover:underline underline-offset-4"
        >
          Se connecter
        </button>
      </p>
    </form>
  );
};
