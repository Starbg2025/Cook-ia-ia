import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  Loader2,
  Brain,
  ChevronRight,
  Sparkles,
  Globe,
  ShoppingBag,
  Check,
  Plus,
  X,
  UploadCloud,
  Link,
  Compass
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../../lib/utils';
import { ChatMessage, User } from '../../types';
import { parseCodeBlocks } from '../../lib/codeParser';

interface ChatInterfaceProps {
  user?: User | null;
  onThinkingChange?: (isThinking: boolean, step: string) => void;
  onCodeGenerated?: (blocks: Array<{ language: string; code: string }>) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

// Highly stylized category images
const IMAGE_CATEGORIES = [
  {
    id: 'fashion',
    title: 'Mode & Mannequin',
    description: 'Portraits mode studio et lifestyle haute couture',
    images: [
      { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80', desc: 'Mannequin Manteau d\'Automne' },
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', desc: 'Robes de Créateur d\'Eté' },
      { url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80', desc: 'Haute Couture Portrait' },
      { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', desc: 'Lookbook Urbain Moderne' }
    ]
  },
  {
    id: 'jewelry',
    title: 'Bijoux & Joaillerie',
    description: 'Bagues, colliers et montres de luxe',
    images: [
      { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80', desc: 'Bague en Or et Diamants' },
      { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80', desc: 'Montre Chronographe de Luxe' },
      { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80', desc: 'Collier d\'Emeraudes' },
      { url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80', desc: 'Bracelets Argent Minimalistes' }
    ]
  },
  {
    id: 'tech',
    title: 'Technologie & Gadgets',
    description: 'Casques, téléphones et set-ups du futur',
    images: [
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', desc: 'Casque Audio Studio Noir' },
      { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', desc: 'Smartphones Minimalistes' },
      { url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80', desc: 'Clavier Mécanique RGB Custom' },
      { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80', desc: 'Tablette Pro avec Stylet' }
    ]
  },
  {
    id: 'furniture',
    title: 'Mobilier & Décoration',
    description: 'Chaises design, lampes et intérieurs scandinaves',
    images: [
      { url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80', desc: 'Fauteuil Design Scandinave' },
      { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80', desc: 'Salon Lumineux Epuré' },
      { url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80', desc: 'Lampe d\'Ambiance Art Déco' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', desc: 'Set-up de Bureau Bois & Plante' }
    ]
  }
];

// Presets for website cloning
const CLONE_PRESETS = [
  {
    name: 'Apple Store Concept',
    icon: 'apple',
    description: 'Landing page ultra-premium, cartes interactives avec effet de zoom, fenêtres d\'achat animées, typographie géante et somptueuse.',
    prompt: 'Crée un clone du site d\'Apple. Un design haut de gamme avec une grille de produits (iPad, iPhone, MacBook) utilisant des fonds sombres et épurés, des transitions fluides, un menu de navigation transparent ("glassmorphism"), de gros titres élégants en Space Grotesk, et des boutons d\'achat qui ouvrent un panneau de configuration animé de chaque accessoire.'
  },
  {
    name: 'Stripe Landing Page',
    icon: 'credit-card',
    description: 'Grilles de features futuristes, dégradés multicolores en arrière-plan avec animations de particules, interfaces de paiement interactives.',
    prompt: 'Crée un site dans le style de Stripe. Utilise un fond sombre avec un dégradé lumineux animé en arrière-plan (bleu, violet, orange). Ajoute une barre de navigation fluide, un héro percutant à gauche avec un formulaire interactif de carte de paiement en direct à droite, et une section "Fonctionnalités" organisée sous forme de Bento Grid moderne avec des icônes lumineuses.'
  },
  {
    name: 'Airbnb Voyage Immersif',
    icon: 'compass',
    description: 'Barre de recherche de destinations dynamique, bento de cartes d\'hôtels avec survol fluide, filtres par icônes et sélections de dates.',
    prompt: 'Crée un clone d\'Airbnb avec une barre de recherche fixe haut de gamme qui s\'agrandit au clic, une grille d\'hébergements de luxe avec un carrousel d\'images fonctionnel pour chaque logement, un filtre de catégories par icônes animées (Cabanes, Bord de mer, Design) et une carte interactive simplifiée sur le côté.'
  },
  {
    name: 'Tesla Design Lab',
    icon: 'zap',
    description: 'Fond vidéo ou image pleine largeur, jauges d\'accélération animées, panneau latéral de personnalisation de la couleur de la voiture.',
    prompt: 'Crée un configurateur de véhicule Tesla immersif en plein écran. Inclut un grand visuel central avec des boutons pour changer de couleur en direct, des statistiques dynamiques de performances (0 à 100 km/h, Autonomie, Vitesse Max) qui s\'animent avec des barres de progression au chargement, et un bouton de commande avec formulaire de réservation instantané.'
  }
];

// E-commerce presets & links creator
const ECOMMERCE_PRESETS = [
  {
    name: 'Joaillerie d\'Or Rose',
    type: 'Bijoux & Accessoires',
    description: 'E-boutique luxueuse de colliers, boucles d\'oreilles et montres, panier d\'achat animé et panneau de paiement élégant.',
    prompt: 'Crée un site e-commerce de joaillerie de luxe en Or Rose. Utilise un thème clair beige poudré et or, une typographie Serif prestigieuse (Playfair Display), des galeries d\'images zoomables pour les produits, un panier d\'achat coulissant interactif qui calcule les taxes et frais de port en direct, et un simulateur de paiement avec ticket de caisse imprimable.'
  },
  {
    name: 'Sneaker Lab Elite',
    type: 'Mode & Chaussures',
    description: 'Plateforme e-commerce pour baskets haut de gamme avec sélecteur de pointure en grille, badges de stock et animations de panier.',
    prompt: 'Crée un e-commerce moderne de sneakers édition limitée. Design sombre et énergique (noir et rouge fluo), un sélecteur de pointures interactif (grille 38-45), un indicateur de stock dynamique en temps réel, un panier d\'achat interactif avec badge de notification animé à chaque ajout, et une page de checkout fluide.'
  },
  {
    name: 'Cyberpunk Tech Shop',
    type: 'Gadgets & Audio',
    description: 'Boutique d\'accessoires futuristes de réalité virtuelle et audio, néons colorés, filtres par prix et recherche instantanée.',
    prompt: 'Crée un site e-commerce de gadgets cyberpunk et réalité virtuelle. Fond noir profond avec lueurs néon cyan et magenta. Ajoute un champ de recherche instantanée qui filtre les produits à la saisie, un curseur de prix dynamique interactif, des boutons de favoris animés (cœur qui bat), et un système de commande finale avec code promo activable.'
  }
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  user, 
  onThinkingChange, 
  onCodeGenerated,
  messages,
  setMessages
}) => {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState<'Analyse' | 'Planification' | 'Génération' | 'Vérification'>('Analyse');
  const [isSaving, setIsSaving] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal active states: 'images' | 'clone' | 'ecommerce' | null
  const [activeModal, setActiveModal] = useState<'images' | 'clone' | 'ecommerce' | null>(null);
  const [uploadedImages, setUploadedImages] = useState<Array<{ name: string; url: string }>>([]);
  const [copiedImageIndex, setCopiedImageIndex] = useState<number | null>(null);
  const [cloneUrl, setCloneUrl] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    onThinkingChange?.(isThinking, thinkingStep);
  }, [isThinking, thinkingStep, onThinkingChange]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Auto-save simulation
  useEffect(() => {
    if (input.length > 0) {
      const timer = setTimeout(() => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 800);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);
    setThinkingStep('Analyse');

    try {
      const steps: Array<'Analyse' | 'Planification' | 'Génération' | 'Vérification'> = ['Analyse', 'Planification', 'Génération', 'Vérification'];
      for (let i = 0; i < steps.length; i++) {
        setThinkingStep(steps[i]);
        await new Promise(r => setTimeout(r, 800));
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.content,
          history: messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          }))
        })
      });

      if (!response.ok) throw new Error('Erreur lors de la génération');
      
      const data = await response.json();
      const { blocks, cleanText } = parseCodeBlocks(data.content);

      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.content,
        cleanContent: cleanText,
        codeBlocks: blocks,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

      if (blocks.length > 0 && onCodeGenerated) {
        onCodeGenerated(blocks);
      }
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Désolé, une erreur est survenue lors de la préparation de votre demande. Veuillez réessayer.",
        timestamp: new Date().toISOString(),
        status: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImg = { name: file.name, url: reader.result as string };
        setUploadedImages(prev => [newImg, ...prev]);
        
        // Auto-append description of the image to the prompt
        setInput(prev => {
          const sep = prev ? '\n' : '';
          return prev + sep + `[Image importée : "${file.name}" (source: ${reader.result})]`;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImageIntoPrompt = (url: string, desc: string, index: number) => {
    setCopiedImageIndex(index);
    setTimeout(() => setCopiedImageIndex(null), 1200);

    setInput(prev => {
      const sep = prev ? ' ' : '';
      return prev + sep + `![${desc}](${url})`;
    });
  };

  const applyPreset = (promptText: string) => {
    setInput(promptText);
    setActiveModal(null);
  };

  const handleCustomClone = (url: string) => {
    if (!url.trim()) return;
    const prompt = `Crée un clone d'une élégance absolue, ultra-complet, prestigieux et parfaitement animé inspiré du site à l'adresse suivante : ${url}. 
Analyse attentivement sa structure visuelle, ses rubriques clés (Héro, Grilles de fonctionnalités, Galerie, Section d'action, Pied de page), sa palette chromatique et sa disposition globale. 
Réalise un rendu extrêmement haut de gamme avec des effets d'arrière-plan modernes ('glassmorphism'), des polices prestigieuses ('Space Grotesk' et 'Outfit') et des animations interactives extrêmement fluides propulsées par GSAP et AlpineJS. Tout le code doit être parfaitement structuré et rangé (ex: accueil.html, style.css, script.js).`;
    setInput(prompt);
    setActiveModal(null);
    setCloneUrl('');
  };

  const handleCustomEcommerce = (url: string, name: string) => {
    if (!url.trim()) return;
    const prompt = `Crée un site e-commerce moderne, ultra-complet, prestigieux et haut de gamme pour l'accessoire/produit issu de ce lien : ${url}${name ? ` (Nom de l'accessoire: "${name}")` : ''}.
Le site doit être une plateforme e-commerce entièrement interactive et intégrer :
1. Une page d'accueil d'une splendeur digne des plus grandes marques, présentant l'accessoire sous tous ses angles avec des animations de survol fluides, des grilles asymétriques épurées, et des typographies haut de gamme ('Playfair Display' et 'Plus Jakarta Sans').
2. Une section d'achat dynamique avec un sélecteur d'options d'accessoires (ex: choix du matériau en or rose/argent, taille, options de gravure personnalisée) géré avec réactivité via AlpineJS.
3. Un panier d'achat coulissant ("drawer") de toute beauté, s'ouvrant au clic sur "Ajouter au panier", avec un badge de notification animé, et le calcul du montant total, des taxes et des frais de livraison en direct.
4. Une section de commande / checkout avec formulaire complet et un simulateur de paiement avec ticket de caisse imprimable ou reçu détaillé d'une grande finesse esthétique.
Organise parfaitement le code sous forme de fichiers bien nommés (accueil.html, style.css, script.js).`;
    setInput(prompt);
    setActiveModal(null);
    setProductUrl('');
    setProductName('');
  };

  return (
    <div className="flex h-full flex-col bg-[#080808]">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/5"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center py-12 px-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="mb-6 rounded-2xl bg-amber-500/10 p-5 border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.1)] relative"
            >
              <Brain className="h-12 w-12 text-amber-500" />
              <div className="absolute -inset-1 rounded-2xl bg-amber-500/10 blur-xl -z-10 animate-pulse" />
            </motion.div>
            <h2 className="text-3xl font-serif font-light tracking-tight text-white mb-3">
              Comment puis-je <span className="italic text-amber-400">vous aider</span> aujourd'hui{user?.name ? `, ${user.name}` : ''} ?
            </h2>
            <p className="text-white/40 max-w-md text-sm leading-relaxed">
              Je suis Cook IA, votre assistant de création d'exception. Je suis prêt à concevoir des applications de prestige, à cloner des interfaces célèbres ou à bâtir des plateformes e-commerce interactives.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
              "flex flex-col gap-2",
              msg.role === 'user' ? "items-end" : "items-start"
            )}
          >
            <div className={cn(
              "max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-inner",
              msg.role === 'user' 
                ? "bg-white/5 text-white border border-white/5" 
                : "bg-white/5 text-white/90 border border-white/5"
            )}>
              <div className="prose prose-invert max-w-none prose-p:my-1 prose-headings:font-serif prose-headings:font-normal">
                <ReactMarkdown>{msg.cleanContent || msg.content}</ReactMarkdown>
              </div>
              <div className="mt-2 text-[9px] text-white/20 font-bold uppercase tracking-widest">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}

        {isThinking && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/5 px-5 py-4">
              <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">{thinkingStep}...</span>
                <div className="mt-1.5 h-[2px] w-48 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/2 bg-amber-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-8">
        <div className="relative mx-auto max-w-4xl">
          {/* Action Row just above the input */}
          <div className="flex flex-wrap items-center gap-2 mb-3 px-1">
            <button
              onClick={() => setActiveModal('images')}
              className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Images Illimitées</span>
            </button>
            <button
              onClick={() => setActiveModal('clone')}
              className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-sky-400 bg-sky-500/10 hover:bg-sky-500/15 border border-sky-500/20 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Cloner un Site</span>
            </button>
            <button
              onClick={() => setActiveModal('ecommerce')}
              className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Lien & E-Commerce</span>
            </button>
          </div>

          {/* Status Bar */}
          <AnimatePresence>
            {isSaving && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-8 left-4 flex items-center gap-2 text-[10px] text-amber-500/60 font-bold uppercase tracking-widest"
              >
                <div className="h-1 w-1 rounded-full bg-amber-500 animate-ping" />
                Synchronisation de l'espace...
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Area Container with interactive glows & custom border transitions */}
          <div className={cn(
            "relative flex flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] p-2 transition-all duration-500 shadow-2xl overflow-hidden",
            "focus-within:border-amber-500/40 focus-within:ring-4 focus-within:ring-amber-500/5 focus-within:shadow-[0_0_50px_rgba(245,158,11,0.06)]"
          )}>
            {/* Ambient Background Glow Effect when typing */}
            {input.length > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/2 via-transparent to-emerald-500/2 opacity-60 pointer-events-none" />
            )}

            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Décrivez votre idée (ex: 'un site d'accessoires de luxe or rose avec panier fluide')..."
              className="w-full resize-none bg-transparent px-5 py-4 text-sm text-white placeholder-white/20 outline-none leading-relaxed z-10"
            />
            
            <div className="flex items-center justify-between px-3 pb-3 pt-2 z-10">
              <div className="flex items-center gap-1.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  title="Importer des images"
                  className="rounded-xl p-2.5 text-white/30 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                >
                  <Paperclip className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveModal('images')}
                  title="Galerie d'images premium"
                  className="rounded-xl p-2.5 text-white/30 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                >
                  <ImageIcon className="h-4 w-4" />
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                {/* Micro active indicator */}
                {input.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden sm:flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Assistant Prêt
                  </motion.div>
                )}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  animate={{
                    scale: input.trim() ? 1 : 0.95,
                    opacity: input.trim() ? 1 : 0.3,
                  }}
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-xl px-4 sm:px-6 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer relative group overflow-hidden",
                    input.trim() 
                      ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-900/20" 
                      : "bg-white/5 text-white/40"
                  )}
                >
                  {input.trim() && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  )}
                  <span className="hidden sm:inline">Créer</span>
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Engine Features Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[9px] text-white/20 font-bold uppercase tracking-[0.2em] text-center">
          <span>Cook Engine v3.0 Ultra</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-amber-500/60 flex items-center gap-1">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Accélérateur d'animations GSAP & AlpineJS
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Responsive Pro</span>
        </div>
      </div>

      {/* MODALS PANEL SYSTEM */}
      <AnimatePresence>
        {activeModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 sm:p-8 shadow-2xl z-10 scrollbar-thin scrollbar-thumb-white/10"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/5 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase font-bold text-amber-500 tracking-widest">
                      Outil d'Accélération
                    </span>
                    <Sparkles className="h-3 w-3 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-serif text-white">
                    {activeModal === 'images' && "Banque d'Images Illimitées & Import"}
                    {activeModal === 'clone' && "Clonage d'Interfaces Célèbres"}
                    {activeModal === 'ecommerce' && "Générateur d'E-Commerce & Accessoires"}
                  </h3>
                  <p className="text-xs text-white/40 mt-1">
                    {activeModal === 'images' && "Copiez/insérez instantanément des images d'accessoires ou importez vos propres images."}
                    {activeModal === 'clone' && "Sélectionnez un modèle pour générer automatiquement les structures et styles de sites reconnus."}
                    {activeModal === 'ecommerce' && "Lancez un modèle e-commerce haut de gamme de bijoux, chaussures ou tech avec panier intégré."}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* MODAL CONTENT: IMAGES */}
              {activeModal === 'images' && (
                <div className="space-y-8">
                  {/* Local Uploader */}
                  <div className="border border-dashed border-white/10 rounded-xl bg-white/[0.01] p-6 text-center hover:bg-white/[0.02] hover:border-amber-500/20 transition-all relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      multiple
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Glissez-déposez vos images de marque</h4>
                    <p className="text-[10px] text-white/40">Fichiers PNG, JPG jusqu'à 10MB. Import illimité dans le prompt de génération.</p>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Images Importées ({uploadedImages.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {uploadedImages.map((img, i) => (
                          <div key={i} className="group relative rounded-lg overflow-hidden border border-white/5 aspect-square bg-[#151515]">
                            <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                              <span className="text-[10px] text-white font-mono truncate max-w-full">{img.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories Grid */}
                  <div className="space-y-6">
                    {IMAGE_CATEGORIES.map((cat) => (
                      <div key={cat.id} className="space-y-3">
                        <div className="border-l-2 border-amber-500 pl-3">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">{cat.title}</h4>
                          <p className="text-[10px] text-white/40">{cat.description}</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {cat.images.map((img, idx) => {
                            const uniqueIndex = cat.id.charCodeAt(0) + idx;
                            return (
                              <div
                                key={idx}
                                onClick={() => insertImageIntoPrompt(img.url, img.desc, uniqueIndex)}
                                className="group relative rounded-xl overflow-hidden border border-white/5 aspect-[4/3] bg-[#151515] cursor-pointer hover:border-amber-500/40 transition-all shadow-md"
                              >
                                <img
                                  referrerPolicy="no-referrer"
                                  src={img.url}
                                  alt={img.desc}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2.5">
                                  <p className="text-[9px] font-bold text-white leading-tight uppercase truncate">{img.desc}</p>
                                  <p className="text-[8px] text-amber-500/80 font-bold mt-1 tracking-wider uppercase flex items-center gap-1">
                                    {copiedImageIndex === uniqueIndex ? (
                                      <>
                                        <Check className="h-2 w-2" />
                                        Inséré !
                                      </>
                                    ) : (
                                      <>
                                        <Plus className="h-2 w-2" />
                                        Insérer
                                      </>
                                    )}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODAL CONTENT: SITE CLONER */}
              {activeModal === 'clone' && (
                <div className="space-y-6">
                  {/* Custom URL Input Section */}
                  <div className="p-5 rounded-2xl border border-sky-500/20 bg-sky-500/5 backdrop-blur-md">
                    <label className="block text-xs font-bold uppercase tracking-widest text-sky-400 mb-2.5">
                      Cloner un site web via son URL directe
                    </label>
                    <div className="flex gap-3">
                      <input 
                        type="text"
                        placeholder="Ex: https://apple.com ou n'importe quel site d'accessoires..."
                        className="flex-1 px-4 py-3 text-sm bg-black/60 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition-all"
                        value={cloneUrl}
                        onChange={(e) => setCloneUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCustomClone(cloneUrl);
                          }
                        }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCustomClone(cloneUrl)}
                        disabled={!cloneUrl.trim()}
                        className="px-6 py-3 text-xs font-bold uppercase tracking-widest bg-sky-500 hover:bg-sky-400 text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-sky-500/20"
                      >
                        <span>Cloner l'URL</span>
                        <Globe className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-4 text-[10px] text-white/30 font-bold uppercase tracking-widest">Ou choisir parmi nos modèles</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CLONE_PRESETS.map((preset, i) => (
                      <div
                        key={i}
                        onClick={() => applyPreset(preset.prompt)}
                        className="group p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-sky-500/30 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className="h-8 w-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                              {preset.icon === 'apple' && <ChevronRight className="h-4 w-4" />}
                              {preset.icon === 'credit-card' && <Brain className="h-4 w-4" />}
                              {preset.icon === 'compass' && <Compass className="h-4 w-4" />}
                              {preset.icon === 'zap' && <Sparkles className="h-4 w-4" />}
                            </div>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">
                              {preset.name}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 leading-relaxed mb-4">
                            {preset.description}
                          </p>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-sky-400 group-hover:text-sky-300 flex items-center gap-1.5 pt-2">
                          <span>Sélectionner le gabarit</span>
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODAL CONTENT: E-COMMERCE */}
              {activeModal === 'ecommerce' && (
                <div className="space-y-6">
                  {/* Custom URL Input Section */}
                  <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md">
                    <label className="block text-xs font-bold uppercase tracking-widest text-amber-400 mb-2.5">
                      Générer une boutique e-commerce pour votre produit
                    </label>
                    <div className="flex flex-col gap-3">
                      <input 
                        type="text"
                        placeholder="URL de votre produit d'accessoires (ex: lien de l'image, boutique, amazon...)"
                        className="w-full px-4 py-3 text-sm bg-black/60 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all"
                        value={productUrl}
                        onChange={(e) => setProductUrl(e.target.value)}
                      />
                      <div className="flex gap-3">
                        <input 
                          type="text"
                          placeholder="Nom ou description du produit (ex: Montre Connectée Or Rose)"
                          className="flex-1 px-4 py-3 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleCustomEcommerce(productUrl, productName);
                            }
                          }}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCustomEcommerce(productUrl, productName)}
                          disabled={!productUrl.trim()}
                          className="px-6 py-3 text-xs font-bold uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-amber-500/20"
                        >
                          <span>Créer la boutique</span>
                          <ShoppingBag className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-4 text-[10px] text-white/30 font-bold uppercase tracking-widest">Ou choisir parmi nos e-boutiques modèles</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {ECOMMERCE_PRESETS.map((preset, i) => (
                      <div
                        key={i}
                        onClick={() => applyPreset(preset.prompt)}
                        className="group p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-amber-500/30 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <span className="inline-block text-[8px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md mb-3">
                            {preset.type}
                          </span>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                            {preset.name}
                          </h4>
                          <p className="text-xs text-white/50 leading-relaxed mb-4">
                            {preset.description}
                          </p>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 group-hover:text-amber-300 flex items-center gap-1.5 pt-2">
                          <span>Générer cette e-boutique</span>
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
