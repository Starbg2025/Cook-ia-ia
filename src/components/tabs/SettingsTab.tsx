import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  User as UserIcon, 
  Mail, 
  UserPlus, 
  Camera, 
  Check, 
  UserCheck, 
  ChevronRight, 
  X,
  Sparkles,
  RefreshCw,
  Heart,
  Upload,
  Database,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { User } from '../../types';

interface SettingsTabProps {
  user: User | null;
  onUpdateProfile: (name: string, avatarUrl: string) => void;
  supabaseSyncStatus: 'synced' | 'syncing' | 'fallback' | 'loading';
}

interface Invitation {
  email: string;
  role: string;
  status: 'pending' | 'accepted';
  date: string;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
];

export const SettingsTab: React.FC<SettingsTabProps> = ({ user, onUpdateProfile, supabaseSyncStatus }) => {
  const [username, setUsername] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || PRESET_AVATARS[0]);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const sqlSchema = `-- Créez la table des recettes dans l'éditeur SQL de votre projet Supabase
create table public.recipes (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  last_message text,
  timestamp timestamptz default now(),
  message_count integer default 0,
  messages jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- Activez la sécurité Row Level Security (RLS)
alter table public.recipes enable row level security;

-- Créez les politiques RLS pour que chaque utilisateur accède uniquement à ses recettes
create policy "Users can manage their own recipes" on public.recipes
  for all using (auth.uid() = user_id);`;

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Invitation Form States
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Designer');
  const [invitations, setInvitations] = useState<Invitation[]>([
    { email: 'collab-expert@cookia.io', role: 'Administrateur', status: 'pending', date: '2026-07-16' }
  ]);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    onUpdateProfile(username, avatarUrl);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newInvite: Invitation = {
      email: inviteEmail,
      role: inviteRole,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };

    setInvitations(prev => [newInvite, ...prev]);
    setInviteEmail('');
    setInviteSuccess(true);
    setTimeout(() => setInviteSuccess(false), 4000);
  };

  const handleCancelInvite = (emailToCancel: string) => {
    setInvitations(prev => prev.filter(inv => inv.email !== emailToCancel));
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#080808] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Panneau de Configuration
            </span>
            <Settings className="h-4 w-4 text-amber-500 animate-spin-slow" />
          </div>
          <h1 className="text-3xl font-serif font-light text-white">
            Paramètres & <span className="italic text-amber-400">Collaboration</span>
          </h1>
          <p className="text-xs text-white/40 mt-1">
            Personnalisez votre profil utilisateur, configurez vos avatars d'exception et invitez des collaborateurs à rejoindre votre espace.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Card Form */}
        <div className="bg-[#0a0a0a]/60 border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl relative">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <UserIcon className="h-5 w-5 text-amber-500" />
            <h3 className="text-base font-serif font-light text-white uppercase tracking-wider">Identité du Compte</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Avatar Selector */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">
                Photo de profil / Avatar d'exception
              </label>
              
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="avatar-upload-file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label 
                  htmlFor="avatar-upload-file" 
                  className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-lg group cursor-pointer block"
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={avatarUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="h-5 w-5 text-white/80" />
                  </div>
                </label>

                <div className="flex-1 space-y-2">
                  <span className="text-[11px] text-white/50 block">Sélectionnez ou téléchargez un avatar :</span>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex gap-2">
                      {PRESET_AVATARS.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setAvatarUrl(url)}
                          className={`h-10 w-10 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                            avatarUrl === url ? "border-amber-500 scale-105 shadow-md shadow-amber-500/10" : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          <img referrerPolicy="no-referrer" src={url} alt={`Preset ${i}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                    
                    <label
                      htmlFor="avatar-upload-file"
                      className="h-10 px-3 rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Importer</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Custom Image URL */}
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Ou entrez l'URL d'une image personnalisée..."
                  className="w-full px-3.5 py-2 text-xs bg-black/60 border border-white/10 rounded-lg text-white/80 placeholder-white/20 focus:outline-none focus:border-amber-500/40 transition-all"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Username field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/5 transition-all shadow-inner"
                placeholder="Ex: Benit"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email Field (Disabled) */}
            <div className="space-y-2 opacity-60">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">
                Adresse e-mail de connexion
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-black/30 border border-white/5 rounded-xl text-xs text-white/50 cursor-not-allowed"
                value={user?.email || 'benit800@gmail.com'}
                disabled
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <span>Sauvegarder les modifications</span>
                <Check className="h-4 w-4" />
              </motion.button>

              {isSaved && (
                <span className="text-xs text-emerald-400 font-medium animate-fadeIn flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Profil mis à jour !
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Invite Person Card Form */}
        <div className="bg-[#0a0a0a]/60 border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2.5">
              <UserPlus className="h-5 w-5 text-amber-500" />
              <h3 className="text-base font-serif font-light text-white uppercase tracking-wider">Inviter un Collaborateur</h3>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Multi-utilisateurs
            </span>
          </div>

          <form onSubmit={handleSendInvite} className="space-y-4">
            {/* Invite Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">
                Adresse email du collaborateur
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="email"
                  required
                  placeholder="Ex: developpeur@cookia.io"
                  className="w-full pl-11 pr-4 py-3 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/5 transition-all shadow-inner"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Select Role */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">
                Sélectionner le rôle projet
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Designer', 'Développeur', 'Administrateur'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setInviteRole(role)}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                      inviteRole === role
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : "bg-black/40 border-white/5 text-white/40 hover:text-white/80"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <UserPlus className="h-4 w-4 text-amber-500" />
              <span>Envoyer l'invitation</span>
            </motion.button>

            {inviteSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-400 font-medium animate-fadeIn">
                Invitation envoyée avec succès à l'adresse indiquée !
              </div>
            )}
          </form>

          {/* Active Invitations List */}
          <div className="space-y-3.5 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 block">
              Invitations en cours ({invitations.length})
            </span>

            <div className="space-y-2 max-h-[140px] overflow-y-auto scrollbar-thin">
              {invitations.map((inv) => (
                <div 
                  key={inv.email} 
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-white/80 font-medium truncate">{inv.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                        {inv.role}
                      </span>
                      <span className="text-[8px] font-semibold text-white/40">Le {inv.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancelInvite(inv.email)}
                    className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                    title="Annuler l'invitation"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stockage Cloud Supabase Panel */}
      <div className="bg-[#0a0a0a]/60 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <Database className="h-5 w-5 text-amber-500" />
            <h3 className="text-base font-serif font-light text-white uppercase tracking-wider">Synchronisation Cloud Supabase</h3>
          </div>

          <div className="flex items-center gap-2">
            {supabaseSyncStatus === 'loading' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <RefreshCw className="h-3 w-3 animate-spin" /> Connexion en cours...
              </span>
            )}
            {supabaseSyncStatus === 'syncing' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                <RefreshCw className="h-3 w-3 animate-spin" /> Envoi au cloud...
              </span>
            )}
            {supabaseSyncStatus === 'synced' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-3 w-3" /> Synchronisé avec succès
              </span>
            )}
            {supabaseSyncStatus === 'fallback' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                ⚠️ Mode Local actif (Fallback)
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Par défaut, Cook IA conserve vos recettes et créations d'interfaces d'exception dans votre stockage local. Si vous avez configuré vos variables d'environnement Supabase, la plateforme synchronisera vos conceptions en temps réel de manière ultra-sécurisée.
            </p>
            <div className="p-4 rounded-xl bg-amber-500/[0.02] border border-amber-500/10 space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Pourquoi cette configuration ?</h4>
              <p className="text-[11px] text-white/50 leading-relaxed font-light">
                Pour assurer la persistance et le partage de vos recettes d'un appareil à un autre, Supabase requiert la création de la table <code className="font-mono text-amber-500">recipes</code>.
              </p>
            </div>
            {supabaseSyncStatus === 'fallback' && (
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-1">Action requise</h4>
                <p className="text-[11px] text-white/60 leading-relaxed font-light">
                  Si le mode local persiste, assurez-vous d'exécuter le script SQL ci-contre dans l'éditeur de requêtes SQL de votre console Supabase pour créer la table et activer le RLS.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Script SQL de Configuration</span>
              <button
                onClick={handleCopySQL}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-white/5 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copier le code</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-xl border border-white/5 bg-black/60 overflow-hidden shadow-inner">
              <pre className="p-4 overflow-x-auto text-[10px] font-mono text-white/70 leading-relaxed select-all max-h-[220px] scrollbar-thin">
                {sqlSchema}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple helper
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
