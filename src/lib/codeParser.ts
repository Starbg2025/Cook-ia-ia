export interface CodeBlock {
  language: string;
  code: string;
  name?: string;
}

export function parseCodeBlocks(markdown: string): { blocks: CodeBlock[]; cleanText: string } {
  // Support syntax like ```html:index.html or ```html index.html or ```html filename="index.html"
  const codeBlockRegex = /```(\w+)?(?:\s+|:)?([^\n]+)?\n([\s\S]*?)(?:```|$)/g;
  const blocks: CodeBlock[] = [];
  let match;
  
  // Track counts per language to generate unique default names
  const counts: Record<string, number> = {};
  
  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    const language = (match[1] || 'html').toLowerCase();
    const meta = (match[2] || '').trim();
    const code = match[3].trim();
    
    if (code) {
      let name = '';
      
      // 1. Try to extract name from meta block (e.g. "index.html" or 'filename="index.html"')
      if (meta) {
        const fileAttrMatch = meta.match(/filename=["']?([^"'\s]+)["']?/);
        if (fileAttrMatch) {
          name = fileAttrMatch[1];
        } else if (!meta.includes('=')) {
          // If there is no '=', assume the whole meta part is the filename
          name = meta.replace(/^:/, '').trim();
        }
      }
      
      // 2. Try to extract name from a comment inside the first line of code
      if (!name) {
        const firstLine = code.split('\n')[0].trim();
        // Check for formats like: <!-- filename.html -->, /* filename.css */, // filename.js, # filename.py
        const htmlComment = firstLine.match(/^<!--\s*([\w.-]+)\s*-->/);
        const cssJsComment = firstLine.match(/^\/\*\s*([\w.-]+)\s*\*\/$/);
        const doubleSlashComment = firstLine.match(/^\/\/\s*([\w.-]+)$/);
        const hashComment = firstLine.match(/^#\s*([\w.-]+)$/);
        
        if (htmlComment) name = htmlComment[1];
        else if (cssJsComment) name = cssJsComment[1];
        else if (doubleSlashComment) name = doubleSlashComment[1];
        else if (hashComment) name = hashComment[1];
      }
      
      // 3. Fallback names based on language and index
      if (!name) {
        counts[language] = (counts[language] || 0) + 1;
        const index = counts[language];
        
        if (language === 'html') {
          name = index === 1 ? 'accueil.html' : `page${index}.html`;
        } else if (language === 'css') {
          name = index === 1 ? 'style.css' : `style${index}.css`;
        } else if (language === 'javascript' || language === 'js') {
          name = index === 1 ? 'script.js' : `script${index}.js`;
        } else if (language === 'typescript' || language === 'ts') {
          name = index === 1 ? 'app.ts' : `app${index}.ts`;
        } else if (language === 'python' || language === 'py') {
          name = index === 1 ? 'main.py' : `script${index}.py`;
        } else if (language === 'json') {
          name = index === 1 ? 'data.json' : `config${index}.json`;
        } else if (language === 'sql') {
          name = index === 1 ? 'schema.sql' : `query${index}.sql`;
        } else if (language === 'markdown' || language === 'md') {
          name = index === 1 ? 'README.md' : `info${index}.md`;
        } else {
          name = `code_${index}.${language}`;
        }
      }
      
      blocks.push({ language, code, name });
    }
  }

  // Strip all complete code blocks from the clean text
  let cleanText = markdown.replace(/```(\w+)?(?:\s+|:)?([^\n]+)?\n[\s\S]*?```/g, '').trim();
  // Also strip any unfinished code blocks at the end of the text (in case streaming or cutoff)
  cleanText = cleanText.replace(/```(\w+)?(?:\s+|:)?([^\n]+)?\n[\s\S]*/g, '').trim();

  // If cleanText is empty but we have code, we can provide a small intro
  if (!cleanText && blocks.length > 0) {
    cleanText = "J'ai généré le code demandé. Vous pouvez le consulter dans l'onglet **Code** ou voir l'aperçu visuel dans l'onglet **Preview**.";
  }

  return { blocks, cleanText };
}

export function buildPreviewSrcDoc(codeBlocks: CodeBlock[]): string {
  if (codeBlocks.length === 0) {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body { background-color: #080808; color: #a1a1aa; font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
  </style>
</head>
<body>
  <p>Aucun code visualisable disponible.</p>
</body>
</html>`;
  }

  // Find priority blocks: html, then js, then css
  const htmlBlock = codeBlocks.find(b => b.language === 'html');
  const cssBlock = codeBlocks.find(b => b.language === 'css');
  const jsBlock = codeBlocks.find(b => b.language === 'javascript' || b.language === 'js');
  const tsBlock = codeBlocks.find(b => b.language === 'typescript' || b.language === 'ts');

  let baseHtml = htmlBlock ? htmlBlock.code : '';

  // If there's no HTML block but we have JS/TS or CSS, we create a basic document structure
  if (!baseHtml) {
    if (jsBlock || tsBlock || cssBlock) {
      baseHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aperçu Cook IA</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; margin: 0; background-color: #080808; color: #ffffff; min-height: 100vh; }
    canvas { display: block; }
  </style>
</head>
<body>
  <div id="root"></div>
  <div id="app"></div>
</body>
</html>`;
    } else {
      // Just some general fallback code
      return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body { background-color: #080808; color: #71717a; font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
  </style>
</head>
<body>
  <div style="text-align: center;">
    <p style="font-size: 14px; color: #f59e0b;">Langage non-web (${codeBlocks[0].language.toUpperCase()})</p>
    <p style="font-size: 12px; color: #71717a;">Consultez l'onglet <strong>Code</strong> ou la console Python ci-dessous.</p>
  </div>
</body>
</html>`;
    }
  }

  // Check if we need to inject CDN scripts
  let headInjection = '';
  if (!baseHtml.includes('tailwindcss.com')) {
    headInjection += '\n  <script src="https://cdn.tailwindcss.com"></script>';
  }

  // Inject beautiful modern design fonts
  headInjection += `\n  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">`;
  
  // Inject Font Awesome for perfect icon renderings across templates
  headInjection += `\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`;
  
  // Inject Animate.css for gorgeous animated entry transitions
  headInjection += `\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">`;

  // Inject GSAP (GreenSock Animation Platform) for world-class animations
  headInjection += `\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>`;
  
  // Inject AlpineJS for rapid premium component interactive states (cart drawer, filters, modals)
  headInjection += `\n  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>`;
  
  // Inject Three.js & OrbitControls if Three.js is referenced anywhere, or 3D is requested
  const requiresThree = baseHtml.includes('three') || 
                        baseHtml.includes('THREE') || 
                        baseHtml.includes('3D') || 
                        baseHtml.includes('3d') || 
                        (jsBlock && (jsBlock.code.includes('three') || jsBlock.code.includes('THREE') || jsBlock.code.includes('OrbitControls')));
  
  if (requiresThree) {
    if (!baseHtml.includes('three.js') && !baseHtml.includes('three.min.js')) {
      headInjection += '\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>';
    }
    if (!baseHtml.includes('OrbitControls.js')) {
      headInjection += '\n  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>';
    }
  }

  if (!baseHtml.includes('lucide')) {
    headInjection += '\n  <script src="https://unpkg.com/lucide@latest"></script>';
  }

  // Base custom style to fix scrolls, apply default body background and fonts
  headInjection += `\n  <style>
    /* Premium smooth design default overrides */
    html { scroll-behavior: smooth; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }
    .font-display { font-family: 'Outfit', sans-serif; }
    .font-space { font-family: 'Space Grotesk', sans-serif; }
    /* Beautiful slim custom scrollbars for previews */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); }
    ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 99px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }
    .dark ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
    .dark ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
    .dark ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
  </style>`;

  if (cssBlock) {
    headInjection += `\n  <style>${cssBlock.code}</style>`;
  }

  // Inject JS Scripts
  let bodyInjection = '';
  if (jsBlock) {
    bodyInjection += `\n  <script>${jsBlock.code}</script>`;
  } else if (tsBlock) {
    bodyInjection += `\n  <script>${tsBlock.code}</script>`;
  }

  // Always invoke lucide icons translation if imported
  bodyInjection += `\n  <script>
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 150);
  </script>`;

  // Insert head elements
  if (baseHtml.includes('</head>')) {
    baseHtml = baseHtml.replace('</head>', `${headInjection}\n</head>`);
  } else if (baseHtml.includes('<body>')) {
    baseHtml = baseHtml.replace('<body>', `<head>${headInjection}</head>\n<body>`);
  } else {
    baseHtml = `<head>${headInjection}</head>\n<body>${baseHtml}</body>`;
  }

  // Insert body script elements
  if (baseHtml.includes('</body>')) {
    baseHtml = baseHtml.replace('</body>', `${bodyInjection}\n</body>`);
  } else {
    baseHtml = `${baseHtml}\n${bodyInjection}`;
  }

  return baseHtml;
}
