import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Mail, Loader2, ArrowLeft, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (resetError) {
      setError(resetError.message);
      setIsLoading(false);
    } else {
      setIsSubmitted(true);
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-amber-500/10 p-4 ring-1 ring-amber-500/20">
            <Send className="h-8 w-8 text-amber-500" />
          </div>
        </div>
        <h4 className="text-xl font-bold text-white mb-2">E-mail envoyé !</h4>
        <p className="text-sm text-white/40 mb-8">
          Si un compte est associé à <span className="text-white font-medium">{email}</span>, vous recevrez des instructions pour réinitialiser votre mot de passe.
        </p>
        <button
          onClick={onBackToLogin}
          className="w-full bg-white/5 border border-white/10 py-3 rounded-lg font-bold text-sm hover:bg-white/10 transition-all text-white flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la connexion
        </button>
      </motion.div>
    );
  }

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

      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold ml-1">Adresse Email</label>
        <div className="relative">
          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/20" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="chef.creative@cookia.ai"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg pr-4 pl-10 py-3 text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner font-medium text-white placeholder-white/20"
          />
        </div>
        <p className="text-[10px] text-white/20 italic px-1">
          Nous vous enverrons un lien de réinitialisation sécurisé.
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 py-3.5 rounded-lg font-bold text-sm shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-white"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Envoyer les instructions
              <Send className="h-4 w-4" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full bg-white/5 border border-white/10 py-3 rounded-lg font-bold text-sm hover:bg-white/10 transition-all text-white flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>
      </div>
    </form>
  );
};
