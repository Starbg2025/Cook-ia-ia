import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Cookie, ChevronRight, Check, CheckSquare } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'tos' | 'privacy' | 'cookies';
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, defaultTab = 'tos' }) => {
  const [activeTab, setActiveTab] = useState<'tos' | 'privacy' | 'cookies'>(defaultTab);

  const tabs = [
    { id: 'tos', label: 'Règles d\'utilisation', icon: FileText },
    { id: 'privacy', label: 'Confidentialité', icon: Shield },
    { id: 'cookies', label: 'Politique des Cookies', icon: Cookie },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-3xl h-[85vh] sm:h-[75vh] flex flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 p-5 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Shield className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-light text-white uppercase tracking-wider">
                    Règles & <span className="text-amber-400 italic">Politique du Site</span>
                  </h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Dernière mise à jour : Juillet 2026</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-white/40 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Inner Content & Tab Layout */}
            <div className="flex flex-1 flex-col sm:flex-row overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-white/5 p-4 space-y-1.5 bg-black/20 shrink-0">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-transparent border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.02]'
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-amber-500' : ''}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Content Pane */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/5 bg-black/10">
                {activeTab === 'tos' && (
                  <div className="space-y-4 text-xs text-white/60 leading-relaxed font-light">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide border-b border-white/5 pb-2">
                      1. Conditions d'Utilisation de Cook IA
                    </h4>
                    <p>
                      Bienvenue sur <strong>Cook IA Studio</strong> ("le Service"). En accédant à cette plateforme ou en créant un compte, vous acceptez de vous conformer aux présentes conditions générales d'utilisation.
                    </p>

                    <h5 className="font-semibold text-white uppercase tracking-wider text-[10px] mt-4">
                      2. Sécurité des Comptes & Accès
                    </h5>
                    <p>
                      Vous êtes entièrement responsable de la confidentialité des identifiants de votre compte (fournis via Supabase Authentication). Toute activité suspecte sur votre compte doit être immédiatement notifiée à notre équipe de support à l'adresse <span className="text-amber-400 font-medium">benit800@gmail.com</span>.
                    </p>

                    <h5 className="font-semibold text-white uppercase tracking-wider text-[10px] mt-4">
                      3. Propriété de Code & Recettes IA
                    </h5>
                    <p>
                      Toutes les recettes et codes générés via nos modules IA (Vite, Alpine.js, GSAP) appartiennent pleinement à l'utilisateur qui les a créés. Cook IA n'exerce aucun droit de brevet ou de licence commerciale sur vos créations logicielles.
                    </p>

                    <h5 className="font-semibold text-white uppercase tracking-wider text-[10px] mt-4">
                      4. Usage Acceptable
                    </h5>
                    <p>
                      Il est interdit d'exploiter nos serveurs de calcul IA à des fins malveillantes, de scraper nos modèles d'apprentissage, ou de générer du contenu enfreignant la législation internationale sur le droit d'auteur.
                    </p>

                    <h5 className="font-semibold text-white uppercase tracking-wider text-[10px] mt-4">
                      5. Limitation de Responsabilité
                    </h5>
                    <p>
                      Bien que nos algorithmes visent l'excellence et une fidélité visuelle chirurgicale, Cook IA ne garantit pas l'absence absolue de bugs ou d'interruptions temporaires sur notre environnement de démonstration cloud.
                    </p>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-4 text-xs text-white/60 leading-relaxed font-light">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide border-b border-white/5 pb-2">
                      Charte de Protection des Données Personnelles (RGPD)
                    </h4>
                    <p>
                      La protection de vos données d'identité numérique est une priorité absolue pour Cook IA. Nous adhérons scrupuleusement aux règlements de l'Union Européenne (RGPD).
                    </p>

                    <h5 className="font-semibold text-white uppercase tracking-wider text-[10px] mt-4">
                      1. Collecte de données
                    </h5>
                    <p>
                      Nous collectons uniquement les données strictement nécessaires au bon fonctionnement de votre espace créatif :
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-white/50">
                      <li>Adresse e-mail (pour l'authentification et les notifications)</li>
                      <li>Nom d'utilisateur d'exception / Profil personnalisé</li>
                      <li>Historique de vos recettes et conversations de génération d'IA</li>
                    </ul>

                    <h5 className="font-semibold text-white uppercase tracking-wider text-[10px] mt-4">
                      2. Sécurité de Stockage
                    </h5>
                    <p>
                      Vos données et jetons de sécurité sont chiffrés et hébergés dans l'infrastructure décentralisée de <strong>Supabase & PostgreSQL</strong>, garantissant une protection bancaire avec chiffrement AES-256.
                    </p>

                    <h5 className="font-semibold text-white uppercase tracking-wider text-[10px] mt-4">
                      3. Vos Droits
                    </h5>
                    <p>
                      Conformément à la réglementation RGPD, vous disposez d'un droit permanent d'accès, de rectification et d'effacement complet de vos informations personnelles. Vous pouvez demander la suppression immédiate de votre compte dans l'onglet Profil ou en écrivant directement à <span className="text-amber-400 font-medium">benit800@gmail.com</span>.
                    </p>
                  </div>
                )}

                {activeTab === 'cookies' && (
                  <div className="space-y-4 text-xs text-white/60 leading-relaxed font-light">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide border-b border-white/5 pb-2">
                      Gestion de vos préférences de Cookies
                    </h4>
                    <p>
                      Cook IA utilise des cookies et technologies similaires de stockage local pour vous offrir l'expérience de création de code la plus fluide possible.
                    </p>

                    {/* Styled list of cookies we use */}
                    <div className="space-y-3 pt-2">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Cookies Essentiels (Requis)</span>
                          <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase">Actif</span>
                        </div>
                        <p className="text-[11px] text-white/40">
                          Utilisés par Supabase Authentication pour maintenir votre session active de manière sécurisée (tokens JWT, cookie d'auth).
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Cookies de Personnalisation</span>
                          <span className="text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold uppercase">Optionnel</span>
                        </div>
                        <p className="text-[11px] text-white/40">
                          Permettent de retenir vos paramètres d'interfaces, états réduits des sidebars, et historique de recettes préférées en local (localStorage).
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Cookies Statistiques anonymes</span>
                          <span className="text-[8px] bg-white/5 border border-white/10 text-white/40 px-1.5 py-0.5 rounded font-bold uppercase">Anonyme</span>
                        </div>
                        <p className="text-[11px] text-white/40">
                          Mesurent les performances globales des compilations et temps de réponse de l'assistant de manière totalement anonymisée pour améliorer le service.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer banner action */}
            <div className="border-t border-white/5 p-4 bg-black/40 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2 text-[10px] text-white/40 font-medium">
                <Check className="h-4.5 w-4.5 text-amber-500" />
                <span>En utilisant Cook IA, vous contribuez à un internet plus sécurisé.</span>
              </div>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md shadow-amber-500/10 transition-all"
              >
                J'ai compris
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
