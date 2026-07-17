import React from 'react';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Clock, 
  Sparkles, 
  Crown, 
  Award,
  Send
} from 'lucide-react';
import { User } from '../../types';

interface ProfileTabProps {
  user: User | null;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ user }) => {
  const accountCreatedDate = '16 Juillet 2026';
  
  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#080808] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Espace Personnel
            </span>
            <Crown className="h-4 w-4 text-amber-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-serif font-light text-white">
            Mon <span className="italic text-amber-400">Compte</span>
          </h1>
          <p className="text-xs text-white/40 mt-1">
            Gérez votre abonnement, visualisez vos statistiques de création et découvrez l'équipe derrière l'architecture Cook IA.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: User Info Dashboard Card */}
        <div className="lg:col-span-1 bg-[#0a0a0a]/60 border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl relative flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
              <UserIcon className="h-5 w-5 text-amber-500" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Vos Informations</h3>
            </div>

            {/* Big Avatar Panel */}
            <div className="flex flex-col items-center text-center py-4 space-y-3">
              <div className="relative">
                <div className="h-24 w-24 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-lg">
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-amber-500 border border-black flex items-center justify-center">
                  <Crown className="h-3 w-3 text-black" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-serif font-light text-white leading-tight">
                  {user?.name || 'Utilisateur Cook IA'}
                </h4>
                <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mt-1">
                  Créateur Elite VIP
                </p>
              </div>
            </div>

            {/* Info Fields */}
            <div className="space-y-3.5 pt-2">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-white/40">
                  <Mail className="h-4 w-4" />
                  <span>E-mail</span>
                </div>
                <span className="text-xs text-white/80 font-medium truncate max-w-[180px]">
                  {user?.email || 'benit800@gmail.com'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-white/40">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Statut du compte</span>
                </div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  Actif
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-white/40">
                  <Clock className="h-4 w-4" />
                  <span>Inscrit le</span>
                </div>
                <span className="text-xs text-white/80 font-medium">
                  {accountCreatedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Premium tag */}
          <div className="pt-6">
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/25 flex items-center gap-3">
              <Award className="h-6 w-6 text-amber-400 shrink-0" />
              <div className="text-[10px] text-white/50 leading-relaxed font-medium">
                Vous bénéficiez de l'abonnement <span className="text-amber-400 font-bold uppercase">Cook Studio Enterprise</span>. Accès illimité aux générations GSAP et Alpine.js.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Elite Dedication for Founder - Benit Madimba */}
        <div className="lg:col-span-2 bg-[#0c0c0c] border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-amber-500/5 blur-[90px] -z-10 pointer-events-none animate-pulse" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-orange-600/5 blur-[70px] -z-10 pointer-events-none" />

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <Crown className="h-5 w-5 text-amber-500" />
                <h3 className="text-base font-serif font-light text-white uppercase tracking-wider">
                  Fondateur & <span className="text-amber-400 font-normal italic">Visionnaire</span>
                </h3>
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                Cook IA Creator
              </span>
            </div>

            {/* Founder presentation row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
              {/* Profile Image Frame */}
              <div className="relative shrink-0">
                <div className="h-28 w-28 rounded-2xl overflow-hidden border-2 border-amber-500 bg-amber-500/10 p-1 shadow-xl shadow-amber-500/10 transform -rotate-2 group">
                  <div className="h-full w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                    <UserIcon className="h-14 w-14 text-amber-500" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-black text-xs shadow-md">
                  ★
                </div>
              </div>

              {/* Bio & Description */}
              <div className="space-y-3 text-center sm:text-left min-w-0 flex-1">
                <div>
                  <h2 className="text-2xl font-serif text-white tracking-wide">
                    Benit Madimba
                  </h2>
                  <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mt-0.5">
                    Fondateur & Architecte Principal
                  </p>
                </div>

                <p className="text-xs text-white/60 leading-relaxed font-light">
                  "Concepteur visionnaire de la suite Cook IA, Benit Madimba a façonné cette plateforme pour permettre aux créateurs d'exprimer leur plein potentiel artistique et technique grâce aux modèles génératifs d'intelligence artificielle."
                </p>

                {/* Grid contact detail */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/5 flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-amber-500" />
                    <span className="text-xs text-white/50">Contact Fondateur :</span>
                    <span className="text-xs text-white font-semibold">benit800@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social connections or custom badges */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Heart className="h-4 w-4 text-amber-500 animate-pulse" />
              <span>Conçu pour l'élégance absolue et l'excellence.</span>
            </div>

            <div className="flex items-center gap-2">
              <a 
                href="mailto:benit800@gmail.com"
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/5"
              >
                <span>Envoyer un message</span>
                <Send className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
