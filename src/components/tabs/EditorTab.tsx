import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Terminal, 
  Layers, 
  Flame, 
  Zap, 
  Check, 
  Copy, 
  BookOpen, 
  Sparkles,
  Blocks,
  Play
} from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  tech: string;
  description: string;
  language: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'tailwind',
    title: 'Grille de Bento Haute Couture',
    tech: 'Tailwind CSS v4',
    description: 'Structure asymétrique d\'une élégance moderne avec "glassmorphism" et effet de lueur.',
    language: 'html',
    code: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 max-w-7xl mx-auto bg-black">
  <!-- Card 1: Large Feature -->
  <div class="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] p-8 shadow-2xl group transition-all duration-500 hover:border-amber-500/30">
    <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-60" />
    <span class="text-[9px] font-bold uppercase tracking-widest text-amber-500">Exclusivité</span>
    <h3 class="mt-2 text-2xl font-serif text-white">L'Essence du Luxe Minimaliste</h3>
    <p class="mt-2 text-sm text-white/50 max-w-md">Une esthétique raffinée, un rythme asymétrique et des bordures au fini satiné.</p>
  </div>
  
  <!-- Card 2: Square Feature -->
  <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] p-8 group transition-all duration-500 hover:border-emerald-500/30">
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-60" />
    <span class="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Performances</span>
    <h3 class="mt-2 text-xl font-serif text-white">Technologie Active</h3>
  </div>
</div>`
  },
  {
    id: 'alpine',
    title: 'Moteur E-Commerce Réactif',
    tech: 'Alpine.js v3',
    description: 'Logique complète de gestion du panier d\'achat, ajout d\'articles avec badges animés et tiroir de checkout coulissant.',
    language: 'html',
    code: `<div x-data="{ 
  cartOpen: false, 
  items: [], 
  addItem(id, name, price, img) {
    let exist = this.items.find(i => i.id === id);
    if (exist) { exist.qty++; } 
    else { this.items.push({ id, name, price, img, qty: 1 }); }
    this.showBadgeNotification();
  },
  get total() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2);
  }
}">
  <!-- Bouton Panier -->
  <button @click="cartOpen = true" class="relative p-3 bg-white/5 hover:bg-white/10 rounded-xl transition">
    <i class="lucide-shopping-bag"></i>
    <template x-if="items.length > 0">
      <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-black" x-text="items.length"></span>
    </template>
  </button>
</div>`
  },
  {
    id: 'gsap',
    title: 'Animations de Défilement Fluides',
    tech: 'GSAP (GreenSock)',
    description: 'Configuration d\'apparitions staggered haut de gamme et d\'effets parallaxe lors du défilement.',
    language: 'javascript',
    code: `// Initialisation de l'animation d'entrée
gsap.from(".hero-title", {
  duration: 1.5,
  y: 60,
  opacity: 0,
  ease: "power4.out",
  delay: 0.2
});

// Stagger sur la grille de produits d'accessoires
gsap.from(".product-card", {
  scrollTrigger: {
    trigger: ".products-section",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  duration: 1.2,
  y: 40,
  opacity: 0,
  stagger: 0.15,
  ease: "power3.out"
});`
  },
  {
    id: 'threejs',
    title: 'Visualiseur 3D Interactif',
    tech: 'Three.js & OrbitControls',
    description: 'Initialisation d\'une scène 3D immersive d\'accessoire avec contrôles orbitaux et éclairages studio.',
    language: 'javascript',
    code: `const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Ajout d'une bague ou d'un objet géométrique haut de gamme
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ 
  color: 0xf59e0b, 
  roughness: 0.1, 
  metalness: 0.9 
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Éclairage studio
const pointLight = new THREE.PointLight(0xffffff, 1.5);
scene.add(pointLight);

camera.position.z = 30;`
  }
];

export const EditorTab: React.FC = () => {
  const [activeSnippetId, setActiveSnippetId] = useState('tailwind');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeSnippet = SNIPPETS.find(s => s.id === activeSnippetId) || SNIPPETS[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#080808] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Spécifications de l'IA
            </span>
            <Blocks className="h-4 w-4 text-amber-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-serif font-light text-white">
            Librairies & <span className="italic text-amber-400">Éditeur de Code</span>
          </h1>
          <p className="text-xs text-white/40 mt-1">
            Découvrez les langages, frameworks d'animation, de styles et de micro-logique que Cook IA maîtrise à la perfection pour concevoir vos sites web.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 font-bold uppercase tracking-wider self-start sm:self-center shadow-lg shadow-amber-500/5">
          <Terminal className="h-3.5 w-3.5" />
          <span>Full-Stack Standard Compliant</span>
        </div>
      </div>

      {/* Tech Architecture Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {SNIPPETS.map((snippet) => (
          <div
            key={snippet.id}
            onClick={() => setActiveSnippetId(snippet.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeSnippetId === snippet.id
                ? "bg-amber-500/5 border-amber-500/40 shadow-lg shadow-amber-500/5"
                : "bg-[#0a0a0a]/60 border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
            }`}
          >
            <div>
              <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                activeSnippetId === snippet.id
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-white/5 text-white/40"
              }`}>
                {snippet.tech}
              </span>
              <h3 className="text-sm font-bold text-white mt-3 leading-tight">{snippet.title}</h3>
            </div>
            <p className="text-[11px] text-white/40 mt-1.5 leading-relaxed line-clamp-2">
              {snippet.description}
            </p>
          </div>
        ))}
      </div>

      {/* Visual Live Code Viewer Section */}
      <div className="rounded-2xl border border-white/10 bg-[#050505] overflow-hidden shadow-2xl relative">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 h-64 w-64 bg-amber-500/2 blur-[80px] -z-10 pointer-events-none" />

        {/* Code Bar Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#080808] px-5 py-3.5">
          <div className="flex items-center gap-3">
            {/* Red, Yellow, Green Mac Dots */}
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-amber-500/60" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-1.5 text-xs text-white/40 font-mono">
              <Code2 className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-white/60 font-medium">{activeSnippet.tech} Blueprint</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeSnippet.code, activeSnippet.id)}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              {copiedId === activeSnippet.id ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copier</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Editor Window */}
        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/10 h-[380px]">
          {/* Documentation Sidebar Panel */}
          <div className="lg:w-1/3 p-6 space-y-4 bg-[#070707]">
            <h3 className="text-lg font-serif font-light text-white flex items-center gap-2">
              <span>{activeSnippet.tech}</span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </h3>
            <p className="text-xs text-white/50 leading-relaxed">
              {activeSnippet.description}
            </p>
            
            <div className="h-[1px] bg-white/5" />
            
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block">Capacités incluses</span>
              <ul className="space-y-2 text-xs text-white/60">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-amber-500" />
                  <span>Rendu fluide mobile, tablette & PC</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-amber-500" />
                  <span>Architecture légère sans dépendances lourdes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-amber-500" />
                  <span>Gestion des micro-interactions haptiques</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Syntax Code Editor Console */}
          <div className="flex-1 p-6 font-mono text-xs overflow-auto bg-[#030303] leading-relaxed scrollbar-thin scrollbar-thumb-white/5">
            <pre className="text-white/80">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
