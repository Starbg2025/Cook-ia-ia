import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ExternalLink, 
  Layout, 
  Tv, 
  Smartphone, 
  Check, 
  ChevronRight, 
  ArrowUpRight,
  TrendingUp,
  Sliders,
  Palette
} from 'lucide-react';

interface StylePreset {
  name: string;
  category: string;
  description: string;
  difficulty: string;
  styleTags: string[];
  samplePrompt: string;
  srcDoc: string;
}

const STYLE_PRESETS: StylePreset[] = [
  {
    name: "Apple Store Luxury concept",
    category: "Clone de Prestige",
    description: "Landing page d'exception avec bento grid, effet de flou satiné ('glassmorphism'), carte produit zoomable et configurateur interactif.",
    difficulty: "Expert",
    styleTags: ["Chic", "Premium", "Inter", "Minimaliste"],
    samplePrompt: "Crée un clone du site d'Apple avec un configurateur interactif d'iPad...",
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          body { background-color: #000000; color: #ffffff; font-family: 'Space Grotesk', sans-serif; margin: 0; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="flex justify-between items-center pb-6 border-b border-white/10">
          <span class="text-lg font-bold uppercase tracking-widest text-zinc-400">Store Concept</span>
          <span class="text-sm bg-amber-500 text-black px-3.5 py-1 rounded-full font-bold">15 Pro Ultra</span>
        </div>
        <div class="my-auto py-8">
          <h1 class="text-6xl font-light tracking-tight leading-tight text-white">L'excellence <br/><span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">sans compromis.</span></h1>
          <p class="text-xl text-zinc-400 mt-4 leading-relaxed">Bento Grid, Titane et performance brute à l'état pur.</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
            <span class="text-xs text-zinc-500 block uppercase tracking-wider">Puce A17 Pro</span>
            <span class="text-lg font-bold text-white mt-1 block">Performance brute</span>
          </div>
          <div class="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
            <span class="text-xs text-zinc-500 block uppercase tracking-wider">Alliage d'Exception</span>
            <span class="text-lg font-bold text-white mt-1 block">Titane brossé</span>
          </div>
        </div>
      </body>
      </html>
    `
  },
  {
    name: "Joaillerie Royale & Or Rose",
    category: "Luxe & Bijoux",
    description: "E-commerce beige or rose avec panier coulissant, de superbes images d'Unsplash de colliers, et ticket de caisse imprimable élégant.",
    difficulty: "Elite",
    styleTags: ["Or Rose", "Serif", "Sophistiqué", "Féminin"],
    samplePrompt: "Crée un site de joaillerie de luxe en Or Rose avec typographie Serif...",
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
        <style>
          body { background-color: #fcf9f6; color: #3a2d28; font-family: 'Playfair Display', serif; margin: 0; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="flex justify-between items-center pb-6 border-b border-amber-800/10">
          <span class="text-lg uppercase tracking-widest text-amber-800 font-bold">Maison Royale</span>
          <span class="text-sm text-amber-800/60 font-serif italic">Prestige</span>
        </div>
        <div class="my-auto py-8">
          <h1 class="text-6xl font-light leading-tight text-amber-950">Collection <br/><span class="italic font-normal text-amber-700">Rose Éternel</span></h1>
          <p class="text-sm uppercase tracking-widest text-amber-800/70 mt-3 font-semibold">Bijoux raffinés & Or fin 24 Carats</p>
        </div>
        <div class="border-t border-amber-800/10 pt-5 flex justify-between items-center">
          <span class="text-lg font-bold text-amber-950">Collier Diamant Rose</span>
          <span class="text-lg text-amber-800 font-semibold">1 250 €</span>
        </div>
      </body>
      </html>
    `
  },
  {
    name: "Tesla Performance Lab",
    category: "Configurateur Immersif",
    description: "Grand visuel central, jauges d'accélération dynamiques animées, boutons de changement de couleur et formulaire de réservation.",
    difficulty: "Expert",
    styleTags: ["Performance", "Glows", "Full-width", "Sport"],
    samplePrompt: "Crée un configurateur Tesla immersif en plein écran avec statistiques dynamiques...",
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body { background-color: #050505; color: #ffffff; font-family: 'Space Grotesk', sans-serif; margin: 0; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="flex justify-between items-center pb-6 border-b border-white/5">
          <span class="text-lg font-bold uppercase tracking-widest text-red-500">Model S Plaid</span>
          <span class="text-sm text-zinc-400 font-bold">1 020 chevaux</span>
        </div>
        <div class="my-auto py-8 text-center bg-zinc-950/40 rounded-2xl p-6 border border-white/5">
          <h1 class="text-7xl font-bold tracking-tight text-white">0-100 km/h</h1>
          <p class="text-3xl font-light text-red-500 tracking-tight mt-2">en 2.1 secondes chrono</p>
        </div>
        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <span class="text-xs text-zinc-500 uppercase font-semibold">Autonomie estimée : 600km</span>
          <span class="text-xs text-zinc-500 uppercase font-semibold text-right">Vitesse de pointe : 322km/h</span>
        </div>
      </body>
      </html>
    `
  },
  {
    name: "Stripe Galactic Dashboard",
    category: "Technologie & Finance",
    description: "Dégradé multicolore animé style galaxie avec micro-particules interactives et bento grid d'icônes lumineuses.",
    difficulty: "Elite",
    styleTags: ["Futuriste", "Dark Mode", "Gradients", "Néon"],
    samplePrompt: "Crée un site inspiré de Stripe avec un fond dégradé violet et orange animé...",
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body { background-color: #0b0813; color: #ffffff; font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body class="bg-gradient-to-br from-[#0c041c] via-[#04010a] to-[#120526]">
        <div class="flex justify-between items-center pb-6 border-b border-violet-500/15">
          <span class="text-lg font-bold uppercase tracking-widest text-violet-400">Galactic SDK</span>
          <span class="text-sm text-indigo-400 font-mono">v4.1.2</span>
        </div>
        <div class="my-auto py-8">
          <h1 class="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 leading-tight">Paiements <br/>Intergalactiques</h1>
          <p class="text-sm text-violet-300/60 mt-3">L'infrastructure financière souveraine et de prestige mondial.</p>
        </div>
        <div class="bg-white/[0.02] p-5 rounded-2xl border border-violet-500/15 flex justify-between items-center backdrop-blur-md">
          <span class="text-xs text-violet-200">Volume de transactions</span>
          <span class="text-lg font-mono text-emerald-400 font-bold">+184 200 € / sec</span>
        </div>
      </body>
      </html>
    `
  },
  {
    name: "Cabinet d'Architectes d'Intérieur",
    category: "Design & Mobilier",
    description: "Portfolio scandinave ultra-épuré avec grand carrousel d'images de canapés, liseuse de catalogue et fiches d'estimations.",
    difficulty: "Pro",
    styleTags: ["Bois", "Scandinave", "Épuré", "Géométrique"],
    samplePrompt: "Crée un site de mobilier scandinave haut de gamme avec carrousel d'intérieur...",
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap" rel="stylesheet">
        <style>
          body { background-color: #f7f7f7; color: #222222; font-family: 'Inter', sans-serif; margin: 0; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="flex justify-between items-center pb-6 border-b border-black/5">
          <span class="text-lg font-semibold uppercase tracking-widest text-zinc-600">Stockholm Studio</span>
          <span class="text-sm font-bold text-black bg-zinc-200 px-3 py-1 rounded-full">AWARDS 2026</span>
        </div>
        <div class="my-auto py-8">
          <h1 class="text-5xl font-light tracking-tight text-zinc-900 leading-tight">Espaces & <br/><span class="font-bold">Lumière Naturelle</span></h1>
          <p class="text-sm text-zinc-500 mt-3">Architecture d'intérieur minimaliste et mobilier haut de gamme.</p>
        </div>
        <div class="border-t border-black/5 pt-5 flex items-center justify-between">
          <span class="text-xs uppercase font-bold text-zinc-500">Projet Stockholm</span>
          <span class="text-xs text-zinc-400">Canapé Chêne Massif</span>
        </div>
      </body>
      </html>
    `
  },
  {
    name: "Sneaker Lab Elite Edition",
    category: "Chaussures & Sneaker",
    description: "Design énergique noir et rouge fluo avec sélecteur de pointures, badges de stock clignotants et panier dynamique.",
    difficulty: "Pro",
    styleTags: ["Chaussant", "Énergique", "Stocker", "Rouge Fluo"],
    samplePrompt: "Crée un site de sneakers en édition limitée avec sélection de pointure...",
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;800&display=swap" rel="stylesheet">
        <style>
          body { background-color: #0d0d0d; color: #ffffff; font-family: 'Outfit', sans-serif; margin: 0; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="flex justify-between items-center pb-6 border-b border-red-600/25">
          <span class="text-lg font-bold uppercase tracking-widest text-red-500">SNEAKER LAB</span>
          <span class="text-sm text-zinc-500 font-bold uppercase">Limited Edition</span>
        </div>
        <div class="my-auto py-8">
          <h1 class="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 italic">AIR MAX PREMIUM</h1>
          <p class="text-sm text-zinc-400 mt-2">Confort ultime, réactivité suprême et style athlétique d'élite.</p>
        </div>
        <div class="flex justify-between items-center bg-red-600/5 p-4 rounded-2xl border border-red-600/10">
          <span class="text-sm font-bold text-white">Sélectionner Pointure : 42</span>
          <span class="text-sm text-red-500 font-bold">189,00 €</span>
        </div>
      </body>
      </html>
    `
  }
];

interface VisualTabProps {
  onSelectPrompt?: (prompt: string) => void;
}

export const VisualTab: React.FC<VisualTabProps> = ({ onSelectPrompt }) => {
  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#080808] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Modèles Prédéfinis
            </span>
            <Layout className="h-4 w-4 text-amber-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-serif font-light text-white">
            Catalogue <span className="italic text-amber-400">Visuel d'IA</span>
          </h1>
          <p className="text-xs text-white/40 mt-1">
            Découvrez les modèles et grilles de design que Cook IA peut générer instantanément avec un niveau de finition d'une précision chirurgicale.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0a0a0a] border border-white/5 text-[10px] text-white/40 font-bold uppercase tracking-wider self-start sm:self-center shadow-inner">
          <Palette className="h-3.5 w-3.5 text-amber-500" />
          <span>Fidélité visuelle 100%</span>
        </div>
      </div>

      {/* Styled Grid of Design Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STYLE_PRESETS.map((preset, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative rounded-2xl border border-white/5 bg-[#0a0a0a]/50 p-4 hover:border-amber-500/20 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card visual showcase with actual live website in iframe instead of simulation image */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/5 shadow-inner bg-[#050505]">
                <iframe
                  title={preset.name}
                  srcDoc={preset.srcDoc}
                  scrolling="no"
                  referrerPolicy="no-referrer"
                  className="absolute top-0 left-0 border-none pointer-events-none select-none transition-transform duration-700 w-[400%] h-[400%]"
                  style={{
                    transform: 'scale(0.25)',
                    transformOrigin: 'top left',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-3 pointer-events-none">
                  <span className="text-[8px] font-bold uppercase tracking-widest bg-amber-500 text-black px-2 py-0.5 rounded self-start">
                    {preset.category}
                  </span>
                  
                  {/* Bottom details on hover */}
                  <div className="flex items-center gap-1.5 text-[10px] text-white/50 font-medium">
                    <Sliders className="h-3 w-3 text-amber-500" />
                    <span>Niveau : {preset.difficulty}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-serif font-light text-white group-hover:text-amber-400 transition-colors mb-1">
                {preset.name}
              </h3>
              
              <p className="text-xs text-white/40 leading-relaxed mb-4">
                {preset.description}
              </p>
            </div>

            {/* Tags and CTA */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {preset.styleTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[8px] font-bold uppercase tracking-wider bg-white/5 text-white/40 px-2 py-0.5 rounded border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  if (onSelectPrompt) {
                    onSelectPrompt(preset.samplePrompt);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black border border-white/5 hover:border-transparent text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Utiliser ce gabarit</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
