/**
 * Local Fallback AI Generation Engine
 * Generates elite-quality, highly-polished web prototypes directly in the browser
 * when backend services are offline or API keys are missing.
 */

export function generateLocalTemplate(prompt: string): string {
  const p = prompt.toLowerCase();

  // 1. JEWELRY TEMPLATE
  if (
    p.includes('bijou') ||
    p.includes('jewel') ||
    p.includes('joaillerie') ||
    p.includes('bague') ||
    p.includes('collier') ||
    p.includes('montre')
  ) {
    return getJewelryTemplate();
  }

  // 2. SNEAKER TEMPLATE
  if (
    p.includes('sneaker') ||
    p.includes('basket') ||
    p.includes('chaussure') ||
    p.includes('shoe') ||
    p.includes('jordan') ||
    p.includes('nike')
  ) {
    return getSneakerTemplate();
  }

  // 3. TESLA VEHICLE CONFIGURATOR TEMPLATE
  if (
    p.includes('tesla') ||
    p.includes('voiture') ||
    p.includes('car') ||
    p.includes('auto') ||
    p.includes('vehicule') ||
    p.includes('electric')
  ) {
    return getTeslaTemplate();
  }

  // 4. APPLE CONCEPT STORE TEMPLATE
  if (
    p.includes('apple') ||
    p.includes('iphone') ||
    p.includes('ipad') ||
    p.includes('macbook') ||
    p.includes('mac')
  ) {
    return getAppleTemplate();
  }

  // 5. STRIPE FINTECH TEMPLATE
  if (
    p.includes('stripe') ||
    p.includes('pay') ||
    p.includes('credit') ||
    p.includes('carte') ||
    p.includes('fintech') ||
    p.includes('bank') ||
    p.includes('banque')
  ) {
    return getStripeTemplate();
  }

  // 6. AIRBNB TRAVEL TEMPLATE
  if (
    p.includes('airbnb') ||
    p.includes('voyage') ||
    p.includes('hotel') ||
    p.includes('booking') ||
    p.includes('vacance') ||
    p.includes('chambre') ||
    p.includes('destination')
  ) {
    return getAirbnbTemplate();
  }

  // 7. ANIMATED LANDING PAGE (21st.dev style)
  if (
    p.includes('21st') ||
    p.includes('animation') ||
    p.includes('accueil') ||
    p.includes('shadcn') ||
    p.includes('pricing') ||
    p.includes('pin')
  ) {
    return getAnimatedLandingTemplate();
  }

  // 8. PORTFOLIO / CREATIVE SHOWCASE
  if (
    p.includes('portfolio') ||
    p.includes('cv') ||
    p.includes('resume') ||
    p.includes('showcase') ||
    p.includes('present') ||
    p.includes('designer') ||
    p.includes('developer')
  ) {
    return getPortfolioTemplate();
  }

  // 8. DYNAMIC UNIVERSAL PREMIUM TEMPLATE (Adapts to any user prompt!)
  return getUniversalTemplate(prompt);
}

// ==========================================
// TEMPLATE COMPILERS (COMPRESSED & PREMIUM)
// ==========================================

function getAnimatedLandingTemplate(): string {
  return `### 🚀 Landing Page Animée - Style "21st.dev / Shadcn"

Voici une page d'accueil d'élite, extrêmement dynamique et animée. J'ai intégré les concepts que vous avez demandés :
- Un tableau de prix (Pricing Table) ultra moderne et interactif.
- Des composants inspirés de Shadcn (Boutons avec effets magnétiques, badges).
- Une liste d'éléments épinglés (Pinned Items).
- Des animations fluides avec Alpine.js et CSS (Glassmorphism, Hover Effects).

\`\`\`html:index.html
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Premium Animations Landing</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; background-color: #030712; color: #f9fafb; }
    
    .blob {
      position: absolute;
      filter: blur(80px);
      z-index: 0;
      opacity: 0.6;
      animation: pulse-blob 8s infinite alternate;
    }
    @keyframes pulse-blob {
      0% { transform: scale(1) translate(0, 0); }
      100% { transform: scale(1.1) translate(20px, 30px); }
    }
    
    /* Shadcn-like button animations */
    .btn-shadcn {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .btn-shadcn::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(255,255,255,0.2), transparent);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .btn-shadcn:hover::after { opacity: 1; }
    .btn-shadcn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.1); }
    
    /* Pin List Animations */
    .pin-item {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .pin-item:hover {
      transform: translateX(10px) scale(1.02);
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    /* Pricing Card Glow */
    .pricing-card {
      transition: all 0.5s ease;
    }
    .pricing-card:hover {
      transform: translateY(-10px);
      border-color: #3b82f6;
      box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.3);
    }
    
    [x-cloak] { display: none !important; }
  </style>
</head>
<body x-data="landingEngine()" class="relative overflow-x-hidden">
  
  <!-- Background blobs -->
  <div class="blob bg-blue-600/30 w-96 h-96 rounded-full top-[-10%] left-[-10%]"></div>
  <div class="blob bg-purple-600/20 w-[500px] h-[500px] rounded-full bottom-20 right-[-10%]" style="animation-delay: -4s"></div>
  
  <!-- Navbar -->
  <nav class="fixed top-0 w-full z-50 bg-[#030712]/70 backdrop-blur-xl border-b border-white/10 transition-all duration-300" :class="{'py-4': !scrolled, 'py-2': scrolled}" @scroll.window="scrolled = (window.pageYOffset > 20)">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <div class="flex items-center gap-2 group cursor-pointer">
        <div class="bg-white text-black p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
          <i data-lucide="layers" class="w-5 h-5"></i>
        </div>
        <span class="font-bold text-lg tracking-tight">Cook UI</span>
      </div>
      <div class="hidden md:flex gap-8 text-sm font-medium text-gray-300">
        <a href="#features" class="hover:text-white transition-colors">Features</a>
        <a href="#pins" class="hover:text-white transition-colors">Pinned</a>
        <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
      </div>
      <button class="btn-shadcn bg-white text-black px-5 py-2 rounded-md text-sm font-semibold">
        Get Started
      </button>
    </div>
  </nav>

  <!-- Hero Section -->
  <main class="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-8 cursor-pointer hover:bg-white/10 transition">
      <span class="flex h-2 w-2 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      Nouvelle animation 21st.dev ajoutée
      <i data-lucide="arrow-right" class="w-3 h-3 ml-1"></i>
    </div>
    
    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
      L'Art de concevoir des <br/>
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Interfaces Interactives
      </span>
    </h1>
    <p class="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed">
      Découvrez des composants ultra-modernes inspirés par Shadcn UI, Aceternity et 21st.dev. Prêts à être utilisés.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
      <button class="btn-shadcn bg-white text-black px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2">
        Explorer les composants
        <i data-lucide="chevron-right" class="w-4 h-4"></i>
      </button>
      <button class="btn-shadcn bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10">
        <i data-lucide="github" class="w-4 h-4"></i>
        Star on GitHub
      </button>
    </div>
  </main>

  <!-- Pinned Items (Pin List) -->
  <section id="pins" class="relative z-10 py-20 px-6 max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Pinned Items</h2>
        <p class="text-gray-400 text-sm mt-1">Vos composants favoris, toujours accessibles.</p>
      </div>
      <button class="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
        Voir tout <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
      </button>
    </div>
    
    <div class="space-y-4">
      <template x-for="(item, index) in pinnedItems" :key="index">
        <div class="pin-item group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="p-3 rounded-lg border border-white/10 bg-black/50 text-gray-300 group-hover:text-white transition-colors" x-html="lucide.createIcons({icons: {[item.icon]: true}}); return '<i data-lucide=' + item.icon + '></i>'">
              <i :data-lucide="item.icon" class="w-5 h-5 text-current"></i>
            </div>
            <div>
              <h3 class="font-semibold text-white group-hover:text-blue-400 transition-colors" x-text="item.title"></h3>
              <p class="text-sm text-gray-400 mt-0.5" x-text="item.description"></p>
            </div>
          </div>
          <button class="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-400 transition-all rounded-md hover:bg-red-400/10">
            <i data-lucide="pin-off" class="w-4 h-4"></i>
          </button>
        </div>
      </template>
    </div>
  </section>

  <!-- Pricing Table -->
  <section id="pricing" class="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent to-black">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">Pricing simple et clair</h2>
        <p class="text-gray-400">Choisissez le plan qui convient à votre ambition.</p>
        
        <!-- Toggle -->
        <div class="mt-8 inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-lg">
          <button @click="annual = false" :class="{'bg-white text-black shadow-sm': !annual, 'text-gray-400 hover:text-white': annual}" class="px-6 py-2 rounded-md text-sm font-medium transition-all">
            Mensuel
          </button>
          <button @click="annual = true" :class="{'bg-white text-black shadow-sm': annual, 'text-gray-400 hover:text-white': !annual}" class="px-6 py-2 rounded-md text-sm font-medium transition-all">
            Annuel <span class="text-xs text-blue-500 ml-1 font-bold">-20%</span>
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Plan 1 -->
        <div class="pricing-card bg-[#09090b] border border-white/10 p-8 rounded-2xl flex flex-col relative overflow-hidden">
          <h3 class="text-xl font-semibold mb-2">Hobby</h3>
          <p class="text-sm text-gray-400 mb-6">Pour les projets personnels.</p>
          <div class="mb-8">
            <span class="text-4xl font-bold" x-text="annual ? '$0' : '$0'"></span>
            <span class="text-gray-500 text-sm">/mois</span>
          </div>
          <ul class="space-y-4 mb-8 flex-1">
            <li class="flex items-center gap-3 text-sm text-gray-300"><i data-lucide="check" class="w-4 h-4 text-blue-500"></i> Composants gratuits</li>
            <li class="flex items-center gap-3 text-sm text-gray-300"><i data-lucide="check" class="w-4 h-4 text-blue-500"></i> Support communautaire</li>
          </ul>
          <button class="btn-shadcn w-full py-2.5 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5">
            Démarrer
          </button>
        </div>
        
        <!-- Plan 2 (Pro) -->
        <div class="pricing-card bg-gradient-to-b from-blue-900/20 to-[#09090b] border border-blue-500/50 p-8 rounded-2xl flex flex-col relative overflow-hidden transform md:-translate-y-4 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] z-10">
          <div class="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
            Populaire
          </div>
          <h3 class="text-xl font-semibold mb-2 text-white">Pro</h3>
          <p class="text-sm text-blue-200/60 mb-6">Pour les professionnels et freelances.</p>
          <div class="mb-8">
            <span class="text-4xl font-bold text-white" x-text="annual ? '$19' : '$24'"></span>
            <span class="text-blue-200/40 text-sm">/mois</span>
          </div>
          <ul class="space-y-4 mb-8 flex-1">
            <li class="flex items-center gap-3 text-sm text-gray-200"><i data-lucide="check" class="w-4 h-4 text-blue-400"></i> Tout du plan Hobby</li>
            <li class="flex items-center gap-3 text-sm text-gray-200"><i data-lucide="check" class="w-4 h-4 text-blue-400"></i> Composants Premium Shadcn</li>
            <li class="flex items-center gap-3 text-sm text-gray-200"><i data-lucide="check" class="w-4 h-4 text-blue-400"></i> Support par email prioritaire</li>
          </ul>
          <button class="btn-shadcn w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium">
            S'abonner
          </button>
        </div>
        
        <!-- Plan 3 -->
        <div class="pricing-card bg-[#09090b] border border-white/10 p-8 rounded-2xl flex flex-col relative overflow-hidden">
          <h3 class="text-xl font-semibold mb-2">Team</h3>
          <p class="text-sm text-gray-400 mb-6">Pour les agences et équipes.</p>
          <div class="mb-8">
            <span class="text-4xl font-bold" x-text="annual ? '$49' : '$59'"></span>
            <span class="text-gray-500 text-sm">/mois</span>
          </div>
          <ul class="space-y-4 mb-8 flex-1">
            <li class="flex items-center gap-3 text-sm text-gray-300"><i data-lucide="check" class="w-4 h-4 text-blue-500"></i> Licences illimitées</li>
            <li class="flex items-center gap-3 text-sm text-gray-300"><i data-lucide="check" class="w-4 h-4 text-blue-500"></i> Templates Figma inclus</li>
            <li class="flex items-center gap-3 text-sm text-gray-300"><i data-lucide="check" class="w-4 h-4 text-blue-500"></i> Support téléphonique 24/7</li>
          </ul>
          <button class="btn-shadcn w-full py-2.5 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5">
            Contacter les ventes
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-white/10 py-8 px-6 bg-black relative z-10">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <i data-lucide="layers" class="w-5 h-5 text-white"></i>
        <span class="font-bold text-white">Cook UI</span>
      </div>
      <p class="text-sm text-gray-500">© 2026 Cook IA. Conçu avec Tailwind & Alpine.js.</p>
    </div>
  </footer>

  <script>
    function landingEngine() {
      return {
        scrolled: false,
        annual: false,
        pinnedItems: [
          { title: "Shadcn Button", description: "Bouton avec effet magnétique et bordure magique.", icon: "mouse-pointer-click" },
          { title: "Pricing Table", description: "Tableau de prix avec toggle mensuel/annuel.", icon: "credit-card" },
          { title: "Pin List Component", description: "Liste interactive avec hover state complexe.", icon: "list" },
          { title: "Animated Beam", description: "Animation SVG pour relier des nœuds.", icon: "git-merge" }
        ],
        init() {
          setTimeout(() => lucide.createIcons(), 50);
        }
      }
    }
  </script>
</body>
</html>
\`\`\``;
}

function getJewelryTemplate(): string {
  return `### 💎 Joaillerie d'Or Rose - Boutique de Prestige

Voici un prototype e-commerce d'élite créé spécialement pour votre marque de joaillerie de luxe. Il intègre :
- Un thème beige poudré et or rose avec **Glassmorphism** interactif.
- Une galerie d'articles de luxe avec zoom interactif au survol.
- Un **Panier d'achat interactif** (Alpine.js) avec calcul des taxes et frais en direct.
- Un tiroir de paiement simulant une transaction sécurisée et l'impression d'un ticket de caisse somptueux.

Vous pouvez modifier le code ou voir le rendu interactif dans l'onglet **Preview** !

\`\`\`html:index.html
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AURELIA - Haute Joaillerie</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #FAF6F0; color: #1C1917; }
    .serif { font-family: 'Playfair Display', serif; }
  </style>
</head>
<body x-data="shopEngine()" class="overflow-x-hidden">

  <!-- Nav -->
  <nav class="sticky top-0 bg-[#FAF6F0]/85 backdrop-blur-md border-b border-[#E7E0D4] z-50 px-6 py-4 flex justify-between items-center">
    <div class="serif text-2xl font-semibold tracking-wider text-amber-950">AURELIA</div>
    <div class="hidden md:flex space-x-8 text-xs font-medium tracking-widest uppercase text-stone-600">
      <a href="#" class="hover:text-amber-700 transition">Collections</a>
      <a href="#" class="hover:text-amber-700 transition">Bagues</a>
      <a href="#" class="hover:text-amber-700 transition">Colliers</a>
      <a href="#" class="hover:text-amber-700 transition">La Maison</a>
    </div>
    <button @click="cartOpen = true" class="relative p-2 text-stone-800 hover:text-amber-700 transition">
      <i data-lucide="shopping-bag" class="h-6 w-6"></i>
      <span x-show="cart.length > 0" x-text="cartQty()" class="absolute top-0 right-0 h-4 w-4 bg-amber-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce"></span>
    </button>
  </nav>

  <!-- Hero -->
  <section class="relative min-h-[60vh] flex items-center justify-center text-center px-6 bg-gradient-to-b from-[#F3ECE0] to-[#FAF6F0] py-16">
    <div class="max-w-3xl">
      <span class="text-xs tracking-widest uppercase text-amber-800 font-semibold">Haute Orfèvrerie Française</span>
      <h1 class="serif text-4xl md:text-6xl text-amber-950 font-normal mt-4 mb-6 leading-tight">L'éclat éternel de l'Or Rose</h1>
      <p class="text-stone-600 font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
        Chaque pièce de la collection Aurélia est façonnée à la main à Paris, mariant métaux précieux et gemmes d'exception.
      </p>
      <div class="mt-8">
        <a href="#collection" class="bg-amber-950 hover:bg-amber-900 text-stone-100 text-xs tracking-widest uppercase font-semibold px-8 py-4 rounded-full transition-all inline-block shadow-lg hover:translate-y-[-2px]">
          Explorer la Collection
        </a>
      </div>
    </div>
  </section>

  <!-- Collection Grid -->
  <section id="collection" class="max-w-7xl mx-auto px-6 py-16">
    <div class="text-center mb-12">
      <h2 class="serif text-3xl text-amber-950">Créations d'Exception</h2>
      <div class="h-[1px] w-16 bg-amber-700/50 mx-auto mt-4"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <template x-for="p in products" :key="p.id">
        <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 group hover:shadow-lg transition-all duration-300">
          <div class="relative aspect-square overflow-hidden bg-stone-50">
            <img :src="p.img" :alt="p.name" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div class="p-6 text-center">
            <span class="text-[10px] tracking-widest uppercase text-stone-400" x-text="p.category"></span>
            <h3 class="serif text-lg text-stone-900 mt-1" x-text="p.name"></h3>
            <p class="text-amber-800 font-medium text-sm mt-2" x-text="formatPrice(p.price)"></p>
            <button @click="addToCart(p)" class="mt-4 w-full bg-stone-50 hover:bg-amber-950 hover:text-white text-stone-800 text-xs tracking-widest uppercase py-3 rounded-xl transition duration-300">
              Ajouter au Panier
            </button>
          </div>
        </div>
      </template>
    </div>
  </section>

  <!-- Cart Drawer Overlay -->
  <div x-show="cartOpen" class="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50" x-transition:enter="transition duration-300" x-transition:leave="transition duration-300">
    <div class="absolute right-0 top-0 h-full w-full max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col p-6 border-l border-[#E7E0D4]" @click.away="cartOpen = false">
      <div class="flex justify-between items-center pb-4 border-b border-stone-200">
        <h3 class="serif text-xl text-stone-900 font-semibold">Votre Coffret</h3>
        <button @click="cartOpen = false" class="p-2 text-stone-600 hover:text-stone-900">
          <i data-lucide="x" class="h-6 w-6"></i>
        </button>
      </div>

      <!-- Cart Content -->
      <div class="flex-1 overflow-y-auto py-4">
        <template x-if="cart.length === 0">
          <div class="text-center py-12 text-stone-400 font-light text-sm">
            Votre coffret est vide pour le moment.
          </div>
        </template>
        <template x-for="item in cart" :key="item.id">
          <div class="flex items-center gap-4 py-4 border-b border-stone-100">
            <img :src="item.img" :alt="item.name" class="w-16 h-16 object-cover rounded-xl bg-stone-50" />
            <div class="flex-1">
              <h4 class="serif text-stone-800 font-medium" x-text="item.name"></h4>
              <p class="text-xs text-amber-800" x-text="formatPrice(item.price) + ' x ' + item.qty"></p>
            </div>
            <button @click="removeFromCart(item.id)" class="text-stone-400 hover:text-red-600 p-2">
              <i data-lucide="x" class="h-4 w-4"></i>
            </button>
          </div>
        </template>
      </div>

      <!-- Calculations -->
      <div class="pt-4 border-t border-stone-200 space-y-2">
        <div class="flex justify-between text-xs text-stone-500">
          <span>Sous-total</span>
          <span x-text="formatPrice(getTaxableSubtotal())"></span>
        </div>
        <div class="flex justify-between text-xs text-stone-500">
          <span>TVA (20%)</span>
          <span x-text="formatPrice(getTax())"></span>
        </div>
        <div class="flex justify-between text-stone-900 font-semibold">
          <span>Total de la commande</span>
          <span class="text-amber-950 serif text-lg" x-text="formatPrice(getTotal())"></span>
        </div>

        <button @click="checkout()" x-show="cart.length > 0" class="mt-4 w-full bg-amber-950 text-white py-4 rounded-xl font-medium tracking-widest text-xs uppercase hover:bg-amber-900 transition-all shadow-md">
          Procéder au Paiement
        </button>
      </div>
    </div>
  </div>

  <!-- Reçu Modal -->
  <div x-show="receiptOpen" class="fixed inset-0 bg-stone-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
    <div class="bg-white max-w-md w-full rounded-3xl p-8 border border-stone-200 shadow-2xl relative">
      <div class="text-center">
        <div class="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <i data-lucide="check" class="text-emerald-600 h-6 w-6"></i>
        </div>
        <h3 class="serif text-2xl text-stone-900 font-semibold">Commande Confirmée</h3>
        <p class="text-xs text-stone-400 mt-1">Merci pour votre confiance. Reçu de paiement de prestige.</p>
      </div>

      <div class="border-t border-dashed border-stone-200 my-6 pt-6 space-y-4">
        <div class="flex justify-between text-xs">
          <span class="text-stone-400">Date</span>
          <span class="text-stone-800 font-medium" x-text="new Date().toLocaleDateString()"></span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="text-stone-400">Numéro de transaction</span>
          <span class="text-stone-800 font-mono" x-text="'#AUR-' + Math.floor(Math.random() * 90000 + 10000)"></span>
        </div>
        <div class="border-t border-stone-100 my-2 pt-2 space-y-2">
          <template x-for="item in receiptCart" :key="item.id">
            <div class="flex justify-between text-xs">
              <span class="text-stone-600" x-text="item.name + ' (x' + item.qty + ')'"></span>
              <span class="text-stone-800" x-text="formatPrice(item.price * item.qty)"></span>
            </div>
          </template>
        </div>
        <div class="border-t border-dashed border-stone-200 pt-4 flex justify-between items-center">
          <span class="serif text-base text-stone-900">Total payé</span>
          <span class="serif text-xl text-amber-950 font-bold" x-text="formatPrice(receiptTotal)"></span>
        </div>
      </div>

      <div class="flex gap-4">
        <button @click="window.print()" class="flex-1 bg-stone-100 text-stone-700 py-3 rounded-xl text-xs font-semibold uppercase hover:bg-stone-200 transition">
          Imprimer
        </button>
        <button @click="receiptOpen = false" class="flex-1 bg-amber-950 text-white py-3 rounded-xl text-xs font-semibold uppercase hover:bg-amber-900 transition">
          Fermer
        </button>
      </div>
    </div>
  </div>

  <script>
    function shopEngine() {
      return {
        cartOpen: false,
        receiptOpen: false,
        cart: [],
        receiptCart: [],
        receiptTotal: 0,
        products: [
          { id: 1, name: 'Bague Solitaire Éternel', category: 'Bague d\'Or Rose', price: 1850, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80' },
          { id: 2, name: 'Bracelet Rigide Étoile', category: 'Bracelets précieux', price: 2400, img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80' },
          { id: 3, name: 'Collier Goutte d\'Emeraude', category: 'Colliers fins', price: 3100, img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80' }
        ],
        formatPrice(val) {
          return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(val);
        },
        addToCart(product) {
          const found = this.cart.find(i => i.id === product.id);
          if (found) {
            found.qty++;
          } else {
            this.cart.push({ ...product, qty: 1 });
          }
        },
        removeFromCart(id) {
          this.cart = this.cart.filter(i => i.id !== id);
        },
        cartQty() {
          return this.cart.reduce((acc, i) => acc + i.qty, 0);
        },
        getTaxableSubtotal() {
          return this.cart.reduce((acc, i) => acc + (i.price * i.qty), 0) * 0.833;
        },
        getTax() {
          return this.cart.reduce((acc, i) => acc + (i.price * i.qty), 0) * 0.167;
        },
        getTotal() {
          return this.cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
        },
        checkout() {
          this.receiptCart = JSON.parse(JSON.stringify(this.cart));
          this.receiptTotal = this.getTotal();
          this.cart = [];
          this.cartOpen = false;
          this.receiptOpen = true;
        },
        init() {
          setTimeout(() => { lucide.createIcons(); }, 100);
        }
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
}

function getSneakerTemplate(): string {
  return `### 👟 Sneaker Lab Elite - Boutique Urbaine de Mode

Voici un prototype e-commerce d'élite créé spécialement pour votre marque de sneakers urbaines et streetwear :
- Un thème **Sombre Cyberpunk-Urbain** (noir profond avec accents rouge/orange fluo).
- Un sélecteur interactif de pointures de chaussures sous forme de grille adaptative.
- Un indicateur de niveau de stock intelligent et dynamique.
- Un panneau de commande rapide avec calculs de panier instantanés.

Vous pouvez modifier le code ou voir le rendu interactif dans l'onglet **Preview** !

\`\`\`html:index.html
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth bg-stone-950 text-stone-100">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SNEAKER LAB - Elite Drops</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .heading { font-family: 'Space Grotesk', sans-serif; }
  </style>
</head>
<body x-data="sneakerEngine()" class="overflow-x-hidden">

  <!-- Navigation -->
  <nav class="sticky top-0 bg-stone-950/85 backdrop-blur-md border-b border-stone-800 z-50 px-6 py-4 flex justify-between items-center">
    <div class="heading text-xl font-bold tracking-tighter text-red-500 uppercase">SNEAKER_LAB</div>
    <div class="hidden md:flex space-x-8 text-xs font-bold tracking-widest uppercase text-stone-400">
      <a href="#" class="hover:text-red-500 transition">Nouveautés</a>
      <a href="#" class="hover:text-red-500 transition">Drops Limités</a>
      <a href="#" class="hover:text-red-500 transition">Customs</a>
    </div>
    <button @click="cartOpen = true" class="relative p-2 text-stone-200 hover:text-red-500 transition">
      <i data-lucide="shopping-bag" class="h-6 w-6"></i>
      <span x-show="cart.length > 0" x-text="cartQty()" class="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"></span>
    </button>
  </nav>

  <!-- Hero Feature Drop -->
  <section class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div class="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square bg-stone-900 border border-stone-800 group">
      <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" alt="Cyber RED" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      <span class="absolute top-4 left-4 bg-red-500 text-stone-950 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-widest">Édition Limitée</span>
    </div>

    <div>
      <h1 class="heading text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">AIR_MAX NEOTRON RED</h1>
      <div class="flex items-center gap-4 mt-4">
        <span class="text-2xl text-red-500 font-bold heading">189,00 €</span>
        <span class="text-sm line-through text-stone-500 font-medium">249,00 €</span>
      </div>

      <p class="mt-6 text-stone-400 leading-relaxed font-light text-sm md:text-base">
        Propulsée par une semelle réactive translucide à gaz comprimé et habillée d'un tissu mesh balistique imperméable, la Neotron repousse les frontières du confort urbain.
      </p>

      <!-- Options pointure -->
      <div class="mt-8">
        <span class="text-xs font-bold uppercase text-stone-400 tracking-wider">Sélectionner Pointure (EU)</span>
        <div class="grid grid-cols-4 gap-2 mt-3">
          <template x-for="size in sizes" :key="size">
            <button @click="selectedSize = size" 
                    :class="selectedSize === size ? 'border-red-500 bg-red-500 text-stone-950 font-bold' : 'border-stone-800 bg-stone-900 hover:border-stone-600 text-stone-300'"
                    class="border py-3 rounded-xl transition text-sm text-center">
              <span x-text="size"></span>
            </button>
          </template>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <button @click="addHeroToCart()" class="flex-1 bg-red-500 hover:bg-red-600 text-stone-950 font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition shadow-lg shadow-red-500/25">
          Ajouter au panier
        </button>
      </div>

      <!-- Live stock indicator -->
      <div class="mt-6 flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
        <span class="text-xs text-orange-400 font-medium">Seulement <span x-text="stockLeft"></span> paires restantes pour cette taille !</span>
      </div>
    </div>
  </section>

  <!-- Slide Cart Panel -->
  <div x-show="cartOpen" class="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex justify-end" x-transition>
    <div class="w-full max-w-md bg-stone-900 border-l border-stone-800 h-full p-6 flex flex-col" @click.away="cartOpen = false">
      <div class="flex justify-between items-center pb-4 border-b border-stone-800">
        <h3 class="heading text-lg font-bold">VOTRE PANIER</h3>
        <button @click="cartOpen = false" class="p-2 text-stone-400 hover:text-white">
          <i data-lucide="x" class="h-6 w-6"></i>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto py-4">
        <template x-if="cart.length === 0">
          <div class="text-center py-12 text-stone-500 text-sm font-light">
            Panier vide. Commandez votre drop dès maintenant !
          </div>
        </template>
        <template x-for="item in cart" :key="item.id">
          <div class="flex items-center gap-4 py-4 border-b border-stone-800">
            <img :src="item.img" :alt="item.name" class="w-16 h-16 object-cover rounded-xl bg-stone-800 border border-stone-700" />
            <div class="flex-1">
              <h4 class="heading text-sm font-bold text-stone-100" x-text="item.name"></h4>
              <p class="text-xs text-red-500 mt-1" x-text="'Taille : ' + item.size + ' - ' + item.price + ' €'"></p>
            </div>
            <button @click="removeFromCart(item.id)" class="text-stone-500 hover:text-red-500 p-2">
              <i data-lucide="x" class="h-4 w-4"></i>
            </button>
          </div>
        </template>
      </div>

      <div class="pt-4 border-t border-stone-800 space-y-4">
        <div class="flex justify-between font-bold text-white heading">
          <span>Total à payer</span>
          <span class="text-red-500" x-text="getTotal() + ' €'"></span>
        </div>
        <button @click="checkout()" x-show="cart.length > 0" class="w-full bg-red-500 text-stone-950 font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-red-600 transition">
          Valider la commande
        </button>
      </div>
    </div>
  </div>

  <script>
    function sneakerEngine() {
      return {
        cartOpen: false,
        selectedSize: 42,
        stockLeft: 3,
        sizes: [39, 40, 41, 42, 43, 44, 45],
        cart: [],
        addHeroToCart() {
          this.cart.push({
            id: Date.now(),
            name: 'AIR_MAX NEOTRON RED',
            size: this.selectedSize,
            price: 189,
            img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
          });
          this.cartOpen = true;
          this.stockLeft = Math.max(1, this.stockLeft - 1);
        },
        removeFromCart(id) {
          this.cart = this.cart.filter(i => i.id !== id);
        },
        cartQty() {
          return this.cart.length;
        },
        getTotal() {
          return this.cart.reduce((acc, i) => acc + i.price, 0);
        },
        checkout() {
          alert('Commande confirmée en mode démo !');
          this.cart = [];
          this.cartOpen = false;
        },
        init() {
          setTimeout(() => { lucide.createIcons(); }, 100);
        }
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
}

function getTeslaTemplate(): string {
  return `### ⚡ Tesla Design Lab - Configurateur de Véhicule

Voici un prototype immersif de personnalisation de véhicule créé pour un style futuriste :
- Un configurateur plein écran avec **sélection de couleur en direct** qui modifie l'image centrale.
- Un affichage dynamique des statistiques clés (Vitesse, Autonomie, Accélération) qui s'anime au chargement.
- Un panneau de réservation fluide avec un formulaire interactif de précommande.

Vous pouvez modifier le code ou voir le rendu interactif dans l'onglet **Preview** !

\`\`\`html:index.html
<!DOCTYPE html>
<html lang="fr" class="bg-stone-950 text-white font-sans overflow-x-hidden">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CYBER LAB - Custom Tesla Model S</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Space Grotesk', sans-serif; }
  </style>
</head>
<body x-data="vehicleConfig()" class="min-h-screen flex flex-col justify-between">

  <!-- Header -->
  <header class="px-8 py-6 flex justify-between items-center border-b border-white/5 bg-stone-950/80 backdrop-blur-md sticky top-0 z-30">
    <div class="text-lg font-bold tracking-widest text-red-500">TESLA_LAB</div>
    <div class="text-xs tracking-widest text-stone-500 uppercase">CONFIGURATEUR S-XP</div>
  </header>

  <!-- Configurateur -->
  <main class="flex-1 max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
    
    <!-- Image principale -->
    <div class="lg:col-span-8 text-center relative flex flex-col items-center justify-center">
      <!-- Glow effect -->
      <div class="absolute w-72 h-72 bg-red-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      
      <img :src="getCurrentCarImage()" alt="Tesla Vehicle" class="max-h-[380px] object-contain transition duration-500 select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
      
      <!-- Performance Specs -->
      <div class="grid grid-cols-3 gap-8 mt-12 w-full max-w-lg border-t border-white/10 pt-8">
        <div class="text-center">
          <div class="text-xs text-stone-400 tracking-wider">0-100 KM/H</div>
          <div class="text-2xl font-bold mt-1 text-white" x-text="stats[currentCol].accel"></div>
        </div>
        <div class="text-center">
          <div class="text-xs text-stone-400 tracking-wider">AUTONOMIE</div>
          <div class="text-2xl font-bold mt-1 text-red-500" x-text="stats[currentCol].range"></div>
        </div>
        <div class="text-center">
          <div class="text-xs text-stone-400 tracking-wider">PUISSANCE</div>
          <div class="text-2xl font-bold mt-1 text-white" x-text="stats[currentCol].power"></div>
        </div>
      </div>
    </div>

    <!-- Panneau de personnalisation -->
    <div class="lg:col-span-4 bg-stone-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-md">
      <h2 class="text-2xl font-bold tracking-tight">Model S Plaid</h2>
      <p class="text-stone-400 text-sm mt-1">Conçue pour des performances pures et un confort absolu.</p>

      <!-- Sélecteur de couleur -->
      <div class="mt-8">
        <span class="text-xs text-stone-400 tracking-wider uppercase block">Teinte extérieure</span>
        <div class="flex gap-4 mt-3">
          <template x-for="col in colors" :key="col.id">
            <button @click="currentCol = col.id" 
                    :class="currentCol === col.id ? 'ring-2 ring-red-500' : 'opacity-80 hover:opacity-100'"
                    class="h-10 w-10 rounded-full border border-white/10 relative cursor-pointer"
                    :style="'background-color: ' + col.hex">
              <span x-show="currentCol === col.id" class="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                <i data-lucide="check" class="h-4 w-4"></i>
              </span>
            </button>
          </template>
        </div>
        <div class="text-xs text-stone-300 mt-2 font-medium" x-text="colors.find(c => c.id === currentCol).name"></div>
      </div>

      <!-- Prix -->
      <div class="mt-8 border-t border-white/10 pt-6">
        <div class="flex justify-between items-end">
          <div>
            <div class="text-xs text-stone-400 uppercase tracking-widest">Achat au comptant</div>
            <div class="text-3xl font-bold mt-1 text-white">109 990 €</div>
          </div>
          <button @click="showForm = true" class="bg-red-500 hover:bg-red-600 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition">
            Commander
          </button>
        </div>
      </div>
    </div>

  </main>

  <!-- Modal précommande -->
  <div x-show="showForm" class="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
    <div class="bg-stone-900 border border-white/10 max-w-md w-full rounded-3xl p-8 relative" @click.away="showForm = false">
      <button @click="showForm = false" class="absolute top-4 right-4 p-2 text-stone-400 hover:text-white">
        <i data-lucide="x" class="h-6 w-6"></i>
      </button>

      <h3 class="text-xl font-bold text-white mb-2">Finaliser votre configuration</h3>
      <p class="text-xs text-stone-400">Remplissez ces informations pour obtenir votre devis personnalisé gratuit.</p>

      <form @submit.prevent="submitOrder()" class="space-y-4 mt-6">
        <div>
          <label class="block text-xs text-stone-400 mb-1">Prénom & Nom</label>
          <input required type="text" class="w-full bg-stone-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none" />
        </div>
        <div>
          <label class="block text-xs text-stone-400 mb-1">Adresse E-mail</label>
          <input required type="email" class="w-full bg-stone-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none" />
        </div>
        <button type="submit" class="w-full bg-red-500 text-stone-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-red-600 transition mt-2">
          Envoyer ma demande
        </button>
      </form>
    </div>
  </div>

  <script>
    function vehicleConfig() {
      return {
        currentCol: 'red',
        showForm: false,
        colors: [
          { id: 'red', name: 'Rouge Ultra Plaid', hex: '#A61D24', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80' },
          { id: 'dark', name: 'Noir Eclipse Profond', hex: '#111111', img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80' },
          { id: 'silver', name: 'Gris Métallisé Éclair', hex: '#888888', img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80' }
        ],
        stats: {
          red: { accel: '2,1s', range: '634 km', power: '1020 ch' },
          dark: { accel: '2,2s', range: '634 km', power: '1020 ch' },
          silver: { accel: '2,1s', range: '640 km', power: '1020 ch' }
        },
        getCurrentCarImage() {
          return this.colors.find(c => c.id === this.currentCol).img;
        },
        submitOrder() {
          alert('Pré-réservation enregistrée avec succès en mode démo ! Nous vous recontacterons.');
          this.showForm = false;
        },
        init() {
          setTimeout(() => { lucide.createIcons(); }, 100);
        }
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
}

function getAppleTemplate(): string {
  return `### 🍎 Apple Store Concept - Landing Page d'Élite

Voici un prototype inspiré d'Apple proposant :
- Une grille de produits ultra minimaliste avec typographies épurées.
- Des effets de transition soignés.
- Un panneau de configuration d'achat d'un accessoire interactif en direct.

Vous pouvez modifier le code ou voir le rendu interactif dans l'onglet **Preview** !

\`\`\`html:index.html
<!DOCTYPE html>
<html lang="fr" class="bg-stone-950 text-white font-sans scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iSTORE - Next Level</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #000000; }
  </style>
</head>
<body x-data="appleStore()">

  <nav class="bg-[#121212]/80 backdrop-blur-md sticky top-0 border-b border-white/5 px-6 py-4 flex justify-between items-center z-50">
    <div class="text-sm tracking-wider font-semibold hover:text-stone-400 cursor-pointer">iSTORE</div>
    <div class="hidden md:flex space-x-12 text-[11px] uppercase tracking-widest text-stone-400 font-medium">
      <a href="#" class="hover:text-white transition">iPhone</a>
      <a href="#" class="hover:text-white transition">MacBook</a>
      <a href="#" class="hover:text-white transition">Accessoires</a>
    </div>
    <div class="relative cursor-pointer" @click="activePanel = 'bag'">
      <i data-lucide="shopping-bag" class="h-5 w-5 hover:text-stone-300"></i>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="min-h-[70vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-[#111111] to-[#000000] py-20">
    <div class="max-w-2xl">
      <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">iPhone 16 Pro</h1>
      <p class="text-lg md:text-xl text-stone-400 font-light max-w-lg mx-auto">Plus solide. Plus grand. Plus intelligent grâce au processeur A18 Pro.</p>
      <div class="mt-8 flex gap-4 justify-center">
        <button @click="openConfig()" class="bg-white text-black text-xs font-semibold px-8 py-4 rounded-full hover:bg-stone-200 transition tracking-wide">
          Acheter
        </button>
      </div>
    </div>
  </section>

  <!-- Product Bento Grid -->
  <section class="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-[#121212] border border-white/5 rounded-3xl p-10 flex flex-col justify-between group hover:border-white/15 transition h-[400px]">
      <div>
        <h3 class="text-2xl font-semibold">MacBook Pro</h3>
        <p class="text-stone-400 text-xs mt-1">Écran Liquid Retina XDR de pointe.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" alt="Mac" class="h-44 object-contain group-hover:scale-102 transition duration-500" />
    </div>

    <div class="bg-[#121212] border border-white/5 rounded-3xl p-10 flex flex-col justify-between group hover:border-white/15 transition h-[400px]">
      <div>
        <h3 class="text-2xl font-semibold">Studio Headphones</h3>
        <p class="text-stone-400 text-xs mt-1">Audio spatial haute fidélité.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" alt="Audio" class="h-44 object-contain group-hover:scale-102 transition duration-500" />
    </div>
  </section>

  <!-- Configurator Panel -->
  <div x-show="activePanel === 'config'" class="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex justify-end" x-transition>
    <div class="w-full max-w-md bg-[#161616] h-full p-6 flex flex-col justify-between" @click.away="activePanel = null">
      <div>
        <div class="flex justify-between items-center border-b border-white/5 pb-4">
          <h3 class="text-lg font-bold">Personnalisation</h3>
          <button @click="activePanel = null" class="p-1 text-stone-400 hover:text-white">
            <i data-lucide="x" class="h-6 w-6"></i>
          </button>
        </div>

        <div class="mt-8">
          <label class="text-xs text-stone-400 uppercase tracking-widest block">Capacité</label>
          <div class="grid grid-cols-2 gap-4 mt-3">
            <button @click="storage = '128 Go'" :class="storage === '128 Go' ? 'border-white bg-white/5' : 'border-white/5'" class="border py-3 rounded-xl text-xs font-semibold">128 Go</button>
            <button @click="storage = '256 Go'" :class="storage === '256 Go' ? 'border-white bg-white/5' : 'border-white/5'" class="border py-3 rounded-xl text-xs font-semibold">256 Go</button>
          </div>
        </div>
      </div>

      <div class="border-t border-white/5 pt-4">
        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-stone-400">Total estimé</span>
          <span class="text-lg font-bold">1 159,00 €</span>
        </div>
        <button @click="addToBag()" class="w-full bg-white text-black font-semibold py-4 rounded-xl text-xs uppercase tracking-wider">
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>

  <script>
    function appleStore() {
      return {
        activePanel: null,
        storage: '128 Go',
        openConfig() {
          this.activePanel = 'config';
        },
        addToBag() {
          alert('iPhone configuré ajouté au sac (Démo) !');
          this.activePanel = null;
        },
        init() {
          setTimeout(() => { lucide.createIcons(); }, 100);
        }
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
}

function getStripeTemplate(): string {
  return `### 💳 Stripe Style Fintech Landing Page

Voici un prototype Fintech d'élite proposant :
- Une barre de navigation fluide en transparence.
- Un formulaire de carte bancaire interactif avec validation visuelle en direct.
- Un Bento Grid moderne présentant des fonctionnalités clés de paiement.

Vous pouvez modifier le code ou voir le rendu interactif dans l'onglet **Preview** !

\`\`\`html:index.html
<!DOCTYPE html>
<html lang="fr" class="bg-slate-950 text-slate-100 font-sans">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXUS PAY - Solutions de paiement</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body x-data="nexusEngine()" class="relative overflow-x-hidden min-h-screen">

  <!-- Background Decorative glow -->
  <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent rounded-full filter blur-3xl pointer-events-none"></div>

  <!-- Header -->
  <nav class="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <i data-lucide="credit-card" class="text-indigo-500"></i>
      <span class="font-bold tracking-tight text-white">NEXUS_PAY</span>
    </div>
    <div class="hidden md:flex space-x-8 text-xs font-semibold text-slate-400">
      <a href="#" class="hover:text-indigo-400 transition">Produits</a>
      <a href="#" class="hover:text-indigo-400 transition">Développeurs</a>
      <a href="#" class="hover:text-indigo-400 transition">Tarifs</a>
    </div>
    <button class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-md">
      Lancer la démo
    </button>
  </nav>

  <!-- Hero and Interactive Card Form -->
  <main class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    
    <div>
      <span class="text-xs text-indigo-400 font-bold tracking-wider uppercase">L'infrastructure de paiement mondiale</span>
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mt-3 text-white leading-tight">
        Acceptez les paiements en une seconde
      </h1>
      <p class="text-slate-400 font-light mt-6 leading-relaxed text-sm md:text-base">
        Une solution complète, sécurisée et facile à intégrer par API pour tous vos abonnements, paniers d'achat et factures.
      </p>

      <!-- Bento Grid features mock -->
      <div class="grid grid-cols-2 gap-4 mt-8">
        <div class="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl">
          <i data-lucide="shield-check" class="text-emerald-500 h-6 w-6"></i>
          <h4 class="font-bold text-white text-sm mt-2">Conforme PCI DSS</h4>
          <p class="text-xs text-slate-500 mt-1">Sécurité bancaire absolue.</p>
        </div>
        <div class="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl">
          <i data-lucide="zap" class="text-amber-500 h-6 w-6"></i>
          <h4 class="font-bold text-white text-sm mt-2">Intégration Instantanée</h4>
          <p class="text-xs text-slate-500 mt-1">API Node, Python, C#.</p>
        </div>
      </div>
    </div>

    <!-- Live Card Tester mockup -->
    <div class="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
      <h3 class="text-lg font-bold text-white">Générateur de Paiement Démo</h3>
      <p class="text-xs text-slate-400 mt-1">Simulez une transaction sécurisée en remplissant la carte fictive ci-dessous.</p>

      <!-- Card Display Mockup -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mt-6 shadow-lg text-white space-y-6">
        <div class="flex justify-between items-center">
          <i data-lucide="credit-card" class="h-8 w-8 text-white/85"></i>
          <span class="text-xs tracking-widest font-mono text-white/70">NEXUS ELITE</span>
        </div>
        
        <div class="text-lg font-mono tracking-widest text-white/95" x-text="cardNumber || '•••• •••• •••• ••••'"></div>

        <div class="flex justify-between text-xs font-mono">
          <div>
            <div class="text-[9px] text-white/50">TITULAIRE</div>
            <div x-text="cardHolder.toUpperCase() || 'VOTRE NOM'"></div>
          </div>
          <div>
            <div class="text-[9px] text-white/50">VALIDITÉ</div>
            <div x-text="cardExpiry || 'MM/AA'"></div>
          </div>
        </div>
      </div>

      <!-- Form Inputs -->
      <form class="space-y-4 mt-6" @submit.prevent="runTransaction()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-slate-400 mb-1">Numéro de carte</label>
            <input x-model="cardNumber" required placeholder="4242 4242 4242 4242" type="text" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm outline-none text-white focus:border-indigo-500" />
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">Nom du titulaire</label>
            <input x-model="cardHolder" required placeholder="Jean Dupont" type="text" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm outline-none text-white focus:border-indigo-500" />
          </div>
        </div>
        <button type="submit" class="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30">
          Lancer la transaction démo
        </button>
      </form>
    </div>

  </main>

  <script>
    function nexusEngine() {
      return {
        cardNumber: '',
        cardHolder: '',
        cardExpiry: '12/28',
        runTransaction() {
          alert('Paiement démo initié de ' + this.cardHolder + ' ! Tout fonctionne parfaitement localement.');
        },
        init() {
          setTimeout(() => { lucide.createIcons(); }, 100);
        }
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
}

function getAirbnbTemplate(): string {
  return `### 🧭 Airbnb Concept - Plateforme de Voyages et Cabanes

Voici un prototype immersif de plateforme de voyage et de location :
- Un système de filtres par catégories iconiques animées.
- Une grille d'hébergements de prestige avec galeries d'images et calcul automatique des prix par séjour.
- Une barre de recherche de destinations dynamique intégrée en haut de l'application.

Vous pouvez modifier le code ou voir le rendu interactif dans l'onglet **Preview** !

\`\`\`html:index.html
<!DOCTYPE html>
<html lang="fr" class="bg-stone-50 text-stone-800 font-sans scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESCALE - Logements de prestige</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body x-data="travelApp()" class="min-h-screen flex flex-col justify-between">

  <!-- Header & Search bar -->
  <header class="px-6 py-4 bg-white border-b border-stone-200 sticky top-0 z-30">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-xl font-bold text-red-500 tracking-tight flex items-center gap-1">
        <i data-lucide="compass" class="text-red-500"></i>
        <span>ESCALE</span>
      </div>
      
      <!-- Barre de recherche mockup -->
      <div class="border border-stone-200 rounded-full px-4 py-2 shadow-sm flex items-center space-x-4 text-xs font-semibold hover:shadow-md transition bg-white w-full max-w-md">
        <div class="flex-1 text-stone-800">Partout dans le monde</div>
        <div class="h-4 w-[1px] bg-stone-200"></div>
        <div class="text-stone-400">Une semaine</div>
        <button class="bg-red-500 text-white p-2 rounded-full flex items-center justify-center">
          <i data-lucide="search" class="h-3 w-3"></i>
        </button>
      </div>

      <div class="text-xs font-semibold text-stone-500">Mode Démo Local</div>
    </div>
  </header>

  <!-- Filtres par catégorie iconiques -->
  <section class="bg-white border-b border-stone-100 py-4 px-6 overflow-x-auto whitespace-nowrap">
    <div class="max-w-7xl mx-auto flex justify-center space-x-12">
      <button @click="category = 'cabins'" :class="category === 'cabins' ? 'border-stone-800 text-stone-900 font-bold' : 'border-transparent text-stone-400 hover:text-stone-700'" class="border-b-2 pb-2 flex flex-col items-center gap-1 transition">
        <i data-lucide="home" class="h-5 w-5"></i>
        <span class="text-[10px] tracking-wide">Cabanes</span>
      </button>
      <button @click="category = 'beach'" :class="category === 'beach' ? 'border-stone-800 text-stone-900 font-bold' : 'border-transparent text-stone-400 hover:text-stone-700'" class="border-b-2 pb-2 flex flex-col items-center gap-1 transition">
        <i data-lucide="umbrella" class="h-5 w-5"></i>
        <span class="text-[10px] tracking-wide">Bord de mer</span>
      </button>
      <button @click="category = 'design'" :class="category === 'design' ? 'border-stone-800 text-stone-900 font-bold' : 'border-transparent text-stone-400 hover:text-stone-700'" class="border-b-2 pb-2 flex flex-col items-center gap-1 transition">
        <i data-lucide="sparkles" class="h-5 w-5"></i>
        <span class="text-[10px] tracking-wide">Design</span>
      </button>
    </div>
  </section>

  <!-- Hébergements Grid -->
  <main class="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <template x-for="item in listings.filter(l => l.cat === category)" :key="item.id">
        <div class="group cursor-pointer" @click="openReserve(item)">
          <div class="aspect-square rounded-2xl overflow-hidden bg-stone-200 border border-stone-100 relative shadow-sm">
            <img :src="item.img" :alt="item.title" class="w-full h-full object-cover group-hover:scale-102 transition duration-500" />
            <span class="absolute top-3 right-3 bg-white/90 text-[10px] font-bold px-2 py-1 rounded-md text-stone-800">4.9 ★</span>
          </div>
          <div class="mt-4 flex justify-between items-start">
            <div>
              <h3 class="font-bold text-stone-900 text-sm" x-text="item.title"></h3>
              <p class="text-xs text-stone-400 mt-0.5" x-text="item.distance + ' km de distance'"></p>
              <p class="text-xs text-stone-800 font-medium mt-1"><span class="font-bold" x-text="item.price + ' €'"></span> / nuit</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>

  <!-- Modal Reservation -->
  <div x-show="showReserve" class="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white max-w-sm w-full rounded-3xl p-6 border border-stone-200 relative shadow-2xl" @click.away="showReserve = false">
      <button @click="showReserve = false" class="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800">
        <i data-lucide="x" class="h-5 w-5"></i>
      </button>

      <h3 class="font-bold text-stone-900 text-lg" x-text="activeItem.title"></h3>
      <p class="text-xs text-stone-400 mt-1">Simulateur de séjour et pré-réservation démo.</p>

      <div class="mt-6 space-y-4">
        <div>
          <label class="block text-xs text-stone-500 mb-1">Nombre de nuits</label>
          <input x-model.number="nights" type="number" min="1" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:border-stone-800 outline-none" />
        </div>
        <div class="border-t border-stone-100 pt-4 space-y-2 text-sm">
          <div class="flex justify-between text-stone-500">
            <span>Prix par nuit</span>
            <span x-text="activeItem.price + ' €'"></span>
          </div>
          <div class="flex justify-between text-stone-900 font-bold border-t border-stone-100 pt-2">
            <span>Total estimé</span>
            <span x-text="(activeItem.price * nights) + ' €'"></span>
          </div>
        </div>
        <button @click="bookDemo()" class="w-full bg-red-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-red-600 transition">
          Confirmer mon séjour démo
        </button>
      </div>
    </div>
  </div>

  <script>
    function travelApp() {
      return {
        category: 'cabins',
        nights: 3,
        showReserve: false,
        activeItem: {},
        listings: [
          { id: 1, cat: 'cabins', title: 'Cabane Suspendue Horizon', distance: 120, price: 145, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80' },
          { id: 2, cat: 'beach', title: 'Villa les Pieds dans l\'Eau', distance: 450, price: 320, img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80' },
          { id: 3, cat: 'design', title: 'Loft Loft Verrière Forestière', distance: 80, price: 210, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80' }
        ],
        openReserve(item) {
          this.activeItem = item;
          this.showReserve = true;
        },
        bookDemo() {
          alert('Séjour de ' + this.nights + ' nuits à ' + this.activeItem.title + ' réservé !');
          this.showReserve = false;
        },
        init() {
          setTimeout(() => { lucide.createIcons(); }, 100);
        }
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
}

function getPortfolioTemplate(): string {
  return `### 🎨 Portfolio Créatif de Développeur d'Élite

Voici un prototype de portfolio haut de gamme et soigné :
- Un thème **Cosmic Dark** avec de grandes polices élégantes.
- Une galerie filtrable de projets de conception.
- Un formulaire de contact interactif qui affiche un message de réussite animé.

Vous pouvez modifier le code ou voir le rendu interactif dans l'onglet **Preview** !

\`\`\`html:index.html
<!DOCTYPE html>
<html lang="fr" class="bg-[#0A0A0A] text-stone-100 font-sans scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EDWARD - Designer & Développeur</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body x-data="portfolioEngine()" class="overflow-x-hidden min-h-screen flex flex-col justify-between">

  <!-- Glow Effect -->
  <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full filter blur-[150px] pointer-events-none"></div>

  <!-- Header -->
  <nav class="sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 z-50 px-8 py-5 flex justify-between items-center">
    <div class="text-sm font-semibold uppercase tracking-widest text-stone-200">EDWARD.DEV</div>
    <div class="hidden md:flex space-x-12 text-[11px] uppercase tracking-widest text-stone-400 font-medium">
      <a href="#projets" class="hover:text-white transition">Projets</a>
      <a href="#biographie" class="hover:text-white transition">Bio</a>
      <a href="#contact" class="hover:text-white transition">Contact</a>
    </div>
    <a href="#contact" class="bg-white/5 border border-white/10 text-stone-200 hover:text-black hover:bg-white text-xs px-5 py-2.5 rounded-full transition duration-300">
      Discuter
    </a>
  </nav>

  <!-- Hero Section -->
  <section class="max-w-5xl mx-auto px-6 py-24 text-center">
    <span class="text-xs text-purple-400 font-bold tracking-widest uppercase bg-purple-500/10 px-4 py-1.5 rounded-full">Disponible pour de nouvelles créations</span>
    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mt-6 text-white leading-tight">
      Je façonne des interfaces interactives d'élite.
    </h1>
    <p class="text-stone-400 text-lg md:text-xl font-light mt-6 max-w-xl mx-auto leading-relaxed">
      Développeur d'applications Web d'exception et designer indépendant à Paris. Concentré sur la haute performance, Alpine.js, GSAP et le design épuré.
    </p>
  </section>

  <!-- Projets filtrables -->
  <section id="projets" class="max-w-6xl mx-auto px-6 py-16 w-full">
    <div class="text-center mb-12">
      <h2 class="text-2xl font-bold tracking-tight text-white">Œuvres Sélectionnées</h2>
      <p class="text-stone-500 text-xs mt-1">Explorez mes récents travaux interactifs.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <template x-for="p in projects" :key="p.id">
        <div class="group bg-[#121212] border border-white/5 rounded-3xl overflow-hidden hover:border-white/15 transition duration-300">
          <div class="aspect-video bg-stone-900 overflow-hidden relative">
            <img :src="p.img" :alt="p.title" class="w-full h-full object-cover group-hover:scale-103 transition duration-500" />
          </div>
          <div class="p-6">
            <span class="text-[10px] text-purple-400 font-bold uppercase tracking-widest" x-text="p.tech"></span>
            <h3 class="text-lg font-bold text-white mt-1" x-text="p.title"></h3>
            <p class="text-stone-400 text-xs mt-1 leading-relaxed" x-text="p.desc"></p>
          </div>
        </div>
      </template>
    </div>
  </section>

  <!-- Contact Form -->
  <section id="contact" class="max-w-md mx-auto px-6 py-16 w-full">
    <div class="bg-[#121212] border border-white/5 rounded-3xl p-8 backdrop-blur-md">
      <h3 class="text-xl font-bold text-white mb-2">Entrer en contact</h3>
      <p class="text-xs text-stone-500">Un projet ? Une idée à concrétiser ? Parlons-en.</p>

      <form @submit.prevent="sendContact()" class="space-y-4 mt-6">
        <div>
          <label class="block text-xs text-stone-400 mb-1">Votre Nom</label>
          <input required type="text" class="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500 outline-none transition" />
        </div>
        <div>
          <label class="block text-xs text-stone-400 mb-1">E-mail</label>
          <input required type="email" class="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500 outline-none transition" />
        </div>
        <button type="submit" class="w-full bg-white text-black font-semibold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-stone-200 transition mt-2">
          Envoyer le message
        </button>
      </form>
    </div>
  </section>

  <script>
    function portfolioEngine() {
      return {
        projects: [
          { id: 1, title: 'Plateforme E-Commerce de Luxe', tech: 'Alpine.js + Tailwind', desc: 'Conception d\'un site de vente en ligne premium de montres d\'exception avec panier en direct.', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80' },
          { id: 2, title: 'Cyberpunk Portfolio Lab', tech: 'Tailwind CSS + GSAP', desc: 'Création d\'une landing page expérimentale haute-performance et d\'animations immersives.', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80' }
        ],
        sendContact() {
          alert('Message envoyé avec succès en mode démo ! Merci de votre intérêt.');
        },
        init() {
          setTimeout(() => { lucide.createIcons(); }, 100);
        }
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
}

function getUniversalTemplate(prompt: string): string {
  const sanitizedPrompt = prompt.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  // Capitalize first letter of prompt to act as Title
  const title = prompt.charAt(0).toUpperCase() + prompt.slice(1);

  return `### 🌟 Prototype d'Élite Personnalisé : ${title}

Voici un prototype d'exception complet, ergonomique et entièrement réactif, conçu en fonction de votre demande pour : **"${sanitizedPrompt}"**.

Il s'exécute de manière autonome dans le navigateur et comprend :
- Une navigation fluide de prestige avec verre givré (**Glassmorphism**).
- Une section d'accueil (Hero) saisissante et texturée avec des boutons d'action.
- Un ensemble de fonctionnalités interactives (gérées par **Alpine.js**) comprenant un simulateur ou panneau d'action.
- Des images de haute qualité d'Unsplash sélectionnées avec soin.

Vous pouvez modifier le code ou voir le rendu interactif dans l'onglet **Preview** !

\`\`\`html:index.html
<!DOCTYPE html>
<html lang="fr" class="bg-stone-950 text-stone-100 font-sans scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body x-data="universalApp()" class="min-h-screen flex flex-col justify-between">

  <!-- Background Decorative glow -->
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-amber-500/5 to-transparent rounded-full filter blur-[150px] pointer-events-none"></div>

  <!-- Header -->
  <nav class="bg-stone-950/85 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 px-6 py-4 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <i data-lucide="sparkles" class="text-amber-500"></i>
      <span class="font-bold tracking-tight text-white uppercase">${title.split(' ')[0]}</span>
    </div>
    <div class="hidden md:flex space-x-10 text-[11px] font-semibold tracking-widest uppercase text-stone-400">
      <a href="#services" class="hover:text-amber-500 transition">Services</a>
      <a href="#galerie" class="hover:text-amber-500 transition">Galerie</a>
      <a href="#demande" class="hover:text-amber-500 transition">Demander</a>
    </div>
    <div class="text-[10px] text-amber-500/80 font-bold tracking-widest uppercase bg-amber-500/10 px-3 py-1.5 rounded-full">
      Simulateur IA Activé
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
      ${title}
    </h1>
    <p class="text-stone-400 font-light mt-6 leading-relaxed text-base md:text-lg max-w-xl mx-auto">
      Découvrez l'expérience de prestige conçue spécialement pour votre projet. Une interface d'élite animée et interactive.
    </p>
    <div class="mt-8 flex justify-center gap-4">
      <a href="#demande" class="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition">
        Débuter l'expérience
      </a>
    </div>
  </section>

  <!-- Interactive Grid Category selection (Alpine.js) -->
  <section id="services" class="max-w-6xl mx-auto px-6 py-12 w-full relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-stone-900/40 border border-white/5 p-6 rounded-2xl">
        <i data-lucide="layout" class="text-amber-500 h-6 w-6"></i>
        <h3 class="font-bold text-white mt-4 text-base">Responsive Design</h3>
        <p class="text-xs text-stone-400 mt-2 leading-relaxed">S'adapte parfaitement à tous les écrans, du mobile aux écrans Ultra-Wide de bureau.</p>
      </div>
      <div class="bg-stone-900/40 border border-white/5 p-6 rounded-2xl">
        <i data-lucide="zap" class="text-amber-500 h-6 w-6"></i>
        <h3 class="font-bold text-white mt-4 text-base">Performance Web d'Elite</h3>
        <p class="text-xs text-stone-400 mt-2 leading-relaxed">Des animations et des chargements instantanés pour un confort optimal.</p>
      </div>
      <div class="bg-stone-900/40 border border-white/5 p-6 rounded-2xl">
        <i data-lucide="heart" class="text-amber-500 h-6 w-6"></i>
        <h3 class="font-bold text-white mt-4 text-base">Moderne et Elégant</h3>
        <p class="text-xs text-stone-400 mt-2 leading-relaxed">Esthétique inspirée des leaders mondiaux pour asseoir votre crédibilité.</p>
      </div>
    </div>
  </section>

  <!-- Simulative form section -->
  <section id="demande" class="max-w-md mx-auto px-6 py-16 w-full relative z-10">
    <div class="bg-stone-900/60 border border-white/5 rounded-3xl p-8 backdrop-blur-md">
      <h3 class="text-xl font-bold text-white mb-2">Simuler une demande</h3>
      <p class="text-xs text-stone-400">Remplissez ces informations pour essayer notre simulateur d'envoi démo.</p>

      <form @submit.prevent="submitForm()" class="space-y-4 mt-6">
        <div>
          <label class="block text-xs text-stone-400 mb-1">Votre Nom complet</label>
          <input required type="text" class="w-full bg-stone-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none transition" />
        </div>
        <div>
          <label class="block text-xs text-stone-400 mb-1">Votre Message</label>
          <textarea required rows="3" class="w-full bg-stone-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none transition" placeholder="Comment pouvons-nous vous aider ?"></textarea>
        </div>
        <button type="submit" class="w-full bg-amber-500 text-stone-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-amber-600 transition">
          Valider ma demande démo
        </button>
      </form>
    </div>
  </section>

  <script>
    function universalApp() {
      return {
        submitForm() {
          alert('Demande simulée enregistrée avec succès !');
        },
        init() {
          setTimeout(() => { lucide.createIcons(); }, 100);
        }
      }
    }
  </script>
</body>
</html>
\`\`\`
`;
}
