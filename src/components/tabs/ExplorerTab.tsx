import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Search, 
  ExternalLink, 
  Download, 
  Code2, 
  Trash2, 
  Clock, 
  Sliders, 
  Sparkles,
  ShoppingBag,
  Zap,
  Check,
  Eye,
  FileCode2,
  Loader2
} from 'lucide-react';
import JSZip from 'jszip';
import { SavedConversation } from './RecipesTab';
import { buildPreviewSrcDoc, parseCodeBlocks } from '../../lib/codeParser';

interface Website {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  category: 'fashion' | 'jewelry' | 'tech' | 'furniture' | 'clone' | 'ecommerce' | 'custom';
  createdAt: string;
  views: number;
  status: 'published' | 'draft';
  srcDoc: string;
  codeBlocks?: { language: string; code: string; name?: string }[];
}

interface ExplorerTabProps {
  conversations?: SavedConversation[];
  onSelectTab?: (tab: string) => void;
  onSelectConversation?: (id: string) => void;
}

// 100% real-time pre-made high-fidelity design templates (instead of static images)
const DEFAULT_PRESET_WEBSITES: Website[] = [
  {
    id: 'site-1',
    name: "Apple Store Neo-Concept",
    description: "Clone d'Apple d'une élégance rare avec grilles de produits, animations d'achat zoomables et interface de configuration.",
    techStack: ['HTML5', 'AlpineJS', 'Tailwind CSS v4', 'GSAP', 'Lucide Icons'],
    category: 'clone',
    createdAt: '2026-07-16',
    views: 1420,
    status: 'published',
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          body { background-color: #000000; color: #ffffff; font-family: 'Space Grotesk', sans-serif; margin: 0; padding: 30px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="flex justify-between items-center pb-4 border-b border-white/10">
          <span class="text-sm font-bold uppercase tracking-widest text-zinc-400">Store Concept</span>
          <span class="text-xs bg-amber-500 text-black px-3 py-0.5 rounded-full font-bold">15 Pro Ultra</span>
        </div>
        <div class="my-auto py-4">
          <h1 class="text-4xl font-light tracking-tight leading-tight text-white">L'excellence <br/><span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">sans compromis.</span></h1>
          <p class="text-xs text-zinc-400 mt-2">Bento Grid, Titane et performance brute à l'état pur.</p>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
            <span class="text-[10px] text-zinc-500 block">Puce A17 Pro</span>
            <span class="text-xs font-bold text-white block mt-0.5">Performance brute</span>
          </div>
          <div class="bg-zinc-900/50 p-4 rounded-xl border border-white/5">
            <span class="text-[10px] text-zinc-500 block">Alliage d'Exception</span>
            <span class="text-xs font-bold text-white block mt-0.5">Titane brossé</span>
          </div>
        </div>
      </body>
      </html>
    `
  },
  {
    id: 'site-2',
    name: "Sneaker Lab Elite",
    description: "E-commerce dynamique de baskets en édition limitée. Intègre un panier réactif et un sélecteur de pointures en grille.",
    techStack: ['HTML5', 'AlpineJS', 'Tailwind CSS v4', 'Font Awesome 6', 'Animate.css'],
    category: 'ecommerce',
    createdAt: '2026-07-15',
    views: 840,
    status: 'published',
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;800&display=swap" rel="stylesheet">
        <style>
          body { background-color: #0d0d0d; color: #ffffff; font-family: 'Outfit', sans-serif; margin: 0; padding: 30px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="flex justify-between items-center pb-4 border-b border-red-600/25">
          <span class="text-sm font-bold uppercase tracking-widest text-red-500">SNEAKER LAB</span>
          <span class="text-xs text-zinc-500 font-bold uppercase">Limited Edition</span>
        </div>
        <div class="my-auto py-4">
          <h1 class="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 italic">AIR MAX PREMIUM</h1>
          <p class="text-xs text-zinc-400 mt-1">Confort ultime, réactivité suprême et style athlétique d'élite.</p>
        </div>
        <div class="flex justify-between items-center bg-red-600/5 p-3 rounded-xl border border-red-600/10">
          <span class="text-xs font-bold text-white">Sélectionner Pointure : 42</span>
          <span class="text-xs text-red-500 font-bold">189,00 €</span>
        </div>
      </body>
      </html>
    `
  },
  {
    id: 'site-3',
    name: "Joaillerie d'Or Rose",
    description: "Boutique prestigieuse de bijoux raffinés avec typographies élégantes, panier coulissant et ticket de reçu imprimable.",
    techStack: ['HTML5', 'AlpineJS', 'Tailwind CSS v4', 'Playfair Display', 'GSAP'],
    category: 'jewelry',
    createdAt: '2026-07-14',
    views: 2110,
    status: 'published',
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
        <style>
          body { background-color: #fcf9f6; color: #3a2d28; font-family: 'Playfair Display', serif; margin: 0; padding: 30px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="flex justify-between items-center pb-4 border-b border-amber-800/10">
          <span class="text-sm uppercase tracking-widest text-amber-800 font-bold">Maison Royale</span>
          <span class="text-xs text-amber-800/60 font-serif italic">Prestige</span>
        </div>
        <div class="my-auto py-4">
          <h1 class="text-4xl font-light leading-tight text-amber-950">Collection <br/><span class="italic font-normal text-amber-700">Rose Éternel</span></h1>
          <p class="text-xs uppercase tracking-widest text-amber-800/70 mt-1 font-semibold">Bijoux raffinés & Or fin 24 Carats</p>
        </div>
        <div class="border-t border-amber-800/10 pt-4 flex justify-between items-center">
          <span class="text-sm font-bold text-amber-950">Collier Diamant Rose</span>
          <span class="text-sm text-amber-800 font-semibold">1 250 €</span>
        </div>
      </body>
      </html>
    `
  },
  {
    id: 'site-4',
    name: "Cyberpunk Tech Shop",
    description: "Plateforme e-commerce cyberpunk pour gadgets VR et audio. Effets néon clignotants et filtrage instantané.",
    techStack: ['HTML5', 'AlpineJS', 'Tailwind CSS v4', 'Three.js', 'OrbitControls'],
    category: 'tech',
    createdAt: '2026-07-12',
    views: 630,
    status: 'draft',
    srcDoc: `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body { background-color: #0b0813; color: #ffffff; font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 30px; display: flex; flex-direction: column; justify-content: space-between; height: 100vh; box-sizing: border-box; }
        </style>
      </head>
      <body class="bg-gradient-to-br from-[#0c041c] via-[#04010a] to-[#120526]">
        <div class="flex justify-between items-center pb-4 border-b border-violet-500/15">
          <span class="text-sm font-bold uppercase tracking-widest text-violet-400">Galactic SDK</span>
          <span class="text-xs text-indigo-400 font-mono">v4.1.2</span>
        </div>
        <div class="my-auto py-4">
          <h1 class="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 leading-tight">Paiements <br/>Intergalactiques</h1>
          <p class="text-xs text-violet-300/60 mt-1">L'infrastructure financière souveraine et de prestige mondial.</p>
        </div>
        <div class="bg-white/[0.02] p-4 rounded-xl border border-violet-500/15 flex justify-between items-center backdrop-blur-md">
          <span class="text-xs text-violet-200">Volume de transactions</span>
          <span class="text-sm font-mono text-emerald-400 font-bold">+184 200 € / s</span>
        </div>
      </body>
      </html>
    `
  }
];

export const ExplorerTab: React.FC<ExplorerTabProps> = ({ 
  conversations = [], 
  onSelectTab, 
  onSelectConversation 
}) => {
  const [websitesList, setWebsitesList] = useState<Website[]>(DEFAULT_PRESET_WEBSITES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Extract real code generated by the assistant from conversations!
  const userCreatedWebsites: Website[] = conversations.filter(convo => {
    return convo.messages.some(m => m.role === 'assistant' && (m.codeBlocks && m.codeBlocks.length > 0 || m.content.includes('```')));
  }).map(convo => {
    const lastCodeMsg = [...convo.messages].reverse().find(m => m.role === 'assistant' && (m.codeBlocks && m.codeBlocks.length > 0 || m.content.includes('```')));
    let codeBlocksList = lastCodeMsg?.codeBlocks || [];
    if (codeBlocksList.length === 0 && lastCodeMsg) {
      codeBlocksList = parseCodeBlocks(lastCodeMsg.content).blocks;
    }

    return {
      id: convo.id,
      name: convo.title === "Nouvelle Recette IA" ? "Création personnalisée" : convo.title,
      description: convo.lastMessage || "Votre site web généré en temps réel par Cook IA.",
      techStack: ['HTML5', 'AlpineJS', 'Tailwind CSS v4'],
      category: 'custom' as const,
      createdAt: new Date(convo.timestamp).toISOString().split('T')[0],
      views: 1,
      status: 'published' as const,
      srcDoc: buildPreviewSrcDoc(codeBlocksList),
      codeBlocks: codeBlocksList
    };
  });

  // Combine static presets and real custom creations
  const allWebsites = [...userCreatedWebsites, ...websitesList];

  const categories = [
    { id: 'all', label: 'Tous les sites' },
    { id: 'custom', label: 'Vos Créations' },
    { id: 'clone', label: 'Clones de sites' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'jewelry', label: 'Bijoux & Luxe' },
    { id: 'tech', label: 'Technologie' }
  ];

  const filteredWebsites = allWebsites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          site.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    // Delete from state if it is preset, or select conversation and let user delete
    setWebsitesList(prev => prev.filter(site => site.id !== id));
    setDeleteId(null);
  };

  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const generateReadmeContent = (site: Website) => {
    let filesListMd = '';
    if (site.codeBlocks && site.codeBlocks.length > 0) {
      filesListMd = site.codeBlocks
        .map(block => {
          const filename = block.name || `code.${block.language === 'javascript' ? 'js' : block.language}`;
          return `- 📁 **${filename}** : Code source brut (${block.language.toUpperCase()})`;
        })
        .join('\n');
      filesListMd += `\n- 📁 **index.html** : Fichier principal de l'application pré-packagé par Cook IA avec tous les CDNs nécessaires.`;
    } else {
      filesListMd = `- 📁 **index.html** : Code source complet et autonome de l'application.`;
    }

    const todayStr = new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `# 🍳 Recette Web Cook IA : ${site.name}

Généré avec passion par **Cook IA** — Votre chef cuisinier d'interfaces d'exception.

Ce package ZIP contient le code source complet de l'interface haute fidélité créée d'après votre inspiration.

## 🚀 Comment lancer l'application localement

1. **Extraction** : Extrayez le contenu complet de ce fichier ZIP dans un dossier de votre choix.
2. **Exécution** : Double-cliquez simplement sur le fichier \`index.html\` pour l'ouvrir directement dans n'importe quel navigateur web moderne (Chrome, Safari, Firefox, Edge).
3. **Zéro Configuration** : Aucun serveur complexe ou commande \`npm install\` n'est requis ! Les dépendances de pointe sont incluses de manière optimale via des serveurs CDN rapides (Tailwind CSS, Alpine.js, GSAP, etc.).

## 📦 Inventaire des Fichiers inclus

${filesListMd}
- 📁 **README.md** : Ce guide de démarrage et d'explications.

## 🛠️ Stack Technique Générée

${site.techStack.map(tech => `- **${tech}**`).join('\n')}

## 🎨 Description du Concept

> "${site.description}"

---
*Cuisiné avec amour et élégance le ${todayStr} par l'assistant Cook IA.*
`;
  };

  const handleDownloadZip = async (site: Website) => {
    try {
      setDownloadingId(site.id);
      
      const zip = new JSZip();
      
      // Determine HTML/Preview content
      let indexHtmlContent = '';
      if (site.codeBlocks && site.codeBlocks.length > 0) {
        indexHtmlContent = buildPreviewSrcDoc(site.codeBlocks);
        
        // Add raw code blocks to their respective files
        site.codeBlocks.forEach(block => {
          const filename = block.name || `code.${block.language === 'javascript' ? 'js' : block.language}`;
          zip.file(filename, block.code);
        });
      } else {
        indexHtmlContent = site.srcDoc;
      }
      
      // Add main index.html
      zip.file('index.html', indexHtmlContent);
      
      // Add customized README.md from Cook IA
      const readmeContent = generateReadmeContent(site);
      zip.file('README.md', readmeContent);
      
      // Generate Zip blob
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Download trigger
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      const safeName = site.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      link.download = `${safeName || 'cook-ia-projet'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Erreur lors de la génération du fichier ZIP:', error);
      alert("Une erreur est survenue lors de la création de l'archive ZIP.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#080808] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Espace de Créations
            </span>
            <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-serif font-light text-white">
            Explorateur de <span className="italic text-amber-400">Sites Web</span>
          </h1>
          <p className="text-xs text-white/40 mt-1">
            Gérez, prévisualisez et téléchargez tous les sites web d'exception générés par l'intelligence artificielle Cook IA.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectTab?.('chat')}
          className="px-5 py-3 text-xs font-bold uppercase tracking-widest bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer self-start sm:self-center"
        >
          <Zap className="h-4 w-4" />
          <span>Générer un nouveau site</span>
        </motion.button>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0a0a] p-4 rounded-xl border border-white/5 shadow-inner">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                selectedCategory === cat.id
                  ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                  : "border border-transparent text-white/40 hover:text-white/80 hover:bg-white/5"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
          <input
            type="text"
            placeholder="Rechercher un site web ou framework..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-black/60 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/5 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of created websites */}
      {filteredWebsites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
          <div className="h-12 w-12 rounded-xl bg-white/5 text-white/30 flex items-center justify-center mb-4">
            <Globe className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-serif text-white/80 mb-1">Aucun site web trouvé</h3>
          <p className="text-xs text-white/40 max-w-sm">
            Vous n'avez pas encore généré de site web dans cette catégorie ou votre recherche ne correspond à aucun élément.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWebsites.map((site) => (
            <motion.div
              key={site.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-5 hover:border-amber-500/20 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between shadow-xl"
            >
              {/* Background gradient hint */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              <div>
                {/* Visual Cover Card with live compiled website in dynamic iframe */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-white/5 shadow-inner bg-[#050505]">
                  <iframe
                    title={site.name}
                    srcDoc={site.srcDoc}
                    scrolling="no"
                    referrerPolicy="no-referrer"
                    className="absolute top-0 left-0 border-none pointer-events-none select-none transition-transform duration-700 w-[400%] h-[400%]"
                    style={{
                      transform: 'scale(0.25)',
                      transformOrigin: 'top left',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-3.5 pointer-events-none">
                    {/* Status Badge */}
                    <div className="self-end">
                      <span className={cn(
                        "text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
                        site.status === 'published'
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      )}>
                        {site.status === 'published' ? 'En ligne' : 'Brouillon'}
                      </span>
                    </div>

                    {/* Stats & Views Overlay */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/60 font-medium">
                        <Clock className="h-3 w-3 text-white/40" />
                        <span>Créé le {site.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-white/60 font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-md border border-white/5">
                        <Eye className="h-3.5 w-3.5 text-amber-400" />
                        <span>{site.views} visites</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name & Desc */}
                <h3 className="text-lg font-serif font-light text-white group-hover:text-amber-400 transition-colors mb-1.5">
                  {site.name}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4 line-clamp-2">
                  {site.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {site.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-bold uppercase tracking-wider bg-white/5 text-white/50 px-2 py-1 rounded-md border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownloadZip(site)}
                    disabled={downloadingId !== null}
                    title="Télécharger l'archive ZIP"
                    className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all cursor-pointer border border-white/5 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {downloadingId === site.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (onSelectConversation) {
                        onSelectConversation(site.id);
                      } else {
                        onSelectTab?.('chat');
                      }
                    }}
                    title="Modifier le code avec l'assistant"
                    className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all cursor-pointer border border-white/5"
                  >
                    <Code2 className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="flex items-center gap-2">
                  {deleteId === site.id ? (
                    <div className="flex items-center gap-1.5 animate-fadeIn">
                      <button
                        onClick={() => handleDelete(site.id)}
                        className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all cursor-pointer"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-white/5 text-white/40 hover:text-white transition-all cursor-pointer"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDeleteId(site.id)}
                      title="Supprimer la création"
                      className="p-2.5 rounded-xl text-red-500/40 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (onSelectConversation) {
                        onSelectConversation(site.id);
                      } else {
                        onSelectTab?.('chat');
                      }
                    }}
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/15 text-white rounded-xl border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Lancer</span>
                    <ExternalLink className="h-3 w-3 text-amber-500" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple utility function
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
