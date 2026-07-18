import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Code2, Play, Terminal, Zap, Copy, Check, RefreshCw, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { buildPreviewSrcDoc, CodeBlock } from '../../lib/codeParser';

function highlightCode(code: string, language: string) {
  if (!code) return '';
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  if (language === 'html') {
    return escaped
      // Comments
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-zinc-600 italic">$1</span>')
      // Tags
      .replace(/(&lt;\/?[a-zA-Z0-9:-]+)/g, '<span class="text-amber-500 font-medium">$1</span>')
      .replace(/(\/?[a-zA-Z0-9:-]+&gt;)/g, '<span class="text-amber-500 font-medium">$1</span>')
      // Attributes
      .replace(/([a-zA-Z0-9:-]+)=/g, '<span class="text-sky-400">$1</span>=')
      // Attribute values
      .replace(/("[\s\S]*?")/g, '<span class="text-emerald-400">$1</span>');
  }

  if (language === 'css') {
    return escaped
      // Comments
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-zinc-600 italic">$1</span>')
      // Selectors
      .replace(/([^{]+)\s*\{/g, '<span class="text-amber-500 font-medium">$1</span> {')
      // Properties
      .replace(/([\w-]+)\s*:/g, '<span class="text-sky-400">$1</span>:')
      // Values
      .replace(/:\s*([^;]+);/g, ': <span class="text-emerald-400">$1</span>;');
  }

  if (language === 'js' || language === 'javascript' || language === 'ts' || language === 'typescript') {
    return escaped
      // Comments
      .replace(/(\/\/.*)/g, '<span class="text-zinc-600 italic">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-zinc-600 italic">$1</span>')
      // String literals
      .replace(/("[\s\S]*?")/g, '<span class="text-emerald-400">$1</span>')
      .replace(/('[\s\S]*?')/g, '<span class="text-emerald-400">$1</span>')
      .replace(/(`[\s\S]*?`)/g, '<span class="text-emerald-400">$1</span>')
      // Keywords
      .replace(/\b(const|let|var|function|return|import|export|from|default|class|extends|new|if|else|for|while|await|async|try|catch|throw|typeof|interface|type|extends|as)\b/g, '<span class="text-amber-500 font-semibold">$1</span>')
      // Constants/Booleans/Numbers
      .replace(/\b(true|false|null|undefined|NaN|\d+)\b/g, '<span class="text-purple-400">$1</span>');
  }

  if (language === 'python' || language === 'py') {
    return escaped
      // Comments
      .replace(/(#.*)/g, '<span class="text-zinc-600 italic">$1</span>')
      // String literals
      .replace(/("[\s\S]*?")/g, '<span class="text-emerald-400">$1</span>')
      .replace(/('[\s\S]*?')/g, '<span class="text-emerald-400">$1</span>')
      // Keywords
      .replace(/\b(def|class|return|import|from|as|if|elif|else|for|while|try|except|finally|raise|with|lambda|and|or|not|in|is|None|True|False)\b/g, '<span class="text-amber-500 font-semibold">$1</span>')
      // Function names
      .replace(/\b(print|len|range|str|int|float|dict|list|set|tuple|abs|sum|max|min)\b/g, '<span class="text-sky-400">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="text-purple-400">$1</span>');
  }

  return escaped;
}

const getFileIconAndColor = (name: string, language: string) => {
  const ext = name.split('.').pop() || language || '';
  switch (ext.toLowerCase()) {
    case 'html':
      return { color: 'text-orange-500 bg-orange-500/10 border-orange-500/20', icon: 'html' };
    case 'css':
      return { color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', icon: 'css' };
    case 'javascript':
    case 'js':
      return { color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20', icon: 'js' };
    case 'typescript':
    case 'ts':
      return { color: 'text-sky-400 bg-sky-400/10 border-sky-400/20', icon: 'ts' };
    case 'python':
    case 'py':
      return { color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', icon: 'py' };
    case 'json':
      return { color: 'text-purple-500 bg-purple-500/10 border-purple-500/20', icon: 'json' };
    case 'sql':
      return { color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20', icon: 'sql' };
    case 'markdown':
    case 'md':
      return { color: 'text-teal-500 bg-teal-500/10 border-teal-500/20', icon: 'md' };
    default:
      return { color: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20', icon: 'file' };
  }
};

interface RightPanelProps {
  activeTab: 'reflection' | 'code' | 'preview';
  onTabChange: (tab: 'reflection' | 'code' | 'preview') => void;
  isThinking: boolean;
  thinkingStep: string;
  codeBlocks: CodeBlock[];
}

export const RightPanel: React.FC<RightPanelProps> = ({ 
  activeTab, 
  onTabChange, 
  isThinking, 
  thinkingStep,
  codeBlocks 
}) => {
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenInNewTab = () => {
    let htmlContent = '';
    const isPythonBlock = activeBlock && (activeBlock.language === 'python' || activeBlock.language === 'py');
    
    if (isPythonBlock) {
      htmlContent = buildPythonRunnerSrcDoc(activeBlock.code);
    } else {
      htmlContent = buildPreviewSrcDoc(codeBlocks);
    }

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  // Automatically reset selected block index when codeBlocks change
  useEffect(() => {
    setSelectedBlockIndex(0);
  }, [codeBlocks]);

  const activeBlock = codeBlocks[selectedBlockIndex];

  const handleCopy = () => {
    if (!activeBlock) return;
    navigator.clipboard.writeText(activeBlock.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to build python runner
  const buildPythonRunnerSrcDoc = (pythonCode: string) => {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Python Console</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'JetBrains Mono', monospace; background-color: #0c0c0e; color: #e4e4e7; margin: 0; padding: 20px; min-height: 100vh; font-size: 13px; }
    .term-btn { transition: all 0.2s; }
    .term-btn:hover { background-color: rgba(255, 255, 255, 0.08); }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
  </style>
</head>
<body class="flex flex-col h-screen">
  <div class="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
    <div class="flex items-center gap-2">
      <div class="flex gap-1.5">
        <div class="h-3 w-3 rounded-full bg-red-500/80"></div>
        <div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
        <div class="h-3 w-3 rounded-full bg-green-500/80"></div>
      </div>
      <span class="text-xs text-zinc-500 font-bold ml-2">PYTHON 3.11 RUNNER</span>
    </div>
    <button onclick="runCode()" class="term-btn bg-amber-500 hover:bg-amber-600 text-black font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5">
      <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      Exécuter
    </button>
  </div>
  
  <pre id="output" class="flex-1 overflow-y-auto whitespace-pre-wrap leading-relaxed">
[Système] Chargement de l'environnement Python (Pyodide WebAssembly)...
  </pre>

  <script>
    const outputDiv = document.getElementById('output');
    let pyodideInstance = null;
    let codeToRun = ${JSON.stringify(pythonCode)};

    function print(text, type = 'info') {
      const span = document.createElement('span');
      if (type === 'err') span.className = 'text-red-400 font-medium';
      else if (type === 'success') span.className = 'text-green-400 font-bold';
      else if (type === 'system') span.className = 'text-amber-500/80';
      else span.className = 'text-zinc-200';
      
      span.textContent = text + '\\n';
      outputDiv.appendChild(span);
      outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    async function initPyodide() {
      try {
        pyodideInstance = await loadPyodide();
        print('[Système] Environnement Python prêt !', 'success');
        print('[Système] Prêt à exécuter.\\n', 'system');
        await runCode();
      } catch (err) {
        print('[Erreur] Impossible d\\'initialiser Python : ' + err.message, 'err');
      }
    }

    async function runCode() {
      if (!pyodideInstance) {
        print('[Système] Veuillez patienter, chargement en cours...', 'system');
        return;
      }
      
      outputDiv.textContent = '';
      print('[Exécution] script.py...', 'system');
      
      pyodideInstance.setStdout({
        batched: (text) => print(text, 'stdout')
      });
      pyodideInstance.setStderr({
        batched: (text) => print(text, 'err')
      });

      try {
        await pyodideInstance.runPythonAsync(codeToRun);
        print('\\n[Séquence terminée avec succès]', 'success');
      } catch (err) {
        print('\\n[Erreur d\\'exécution] : ' + err.message, 'err');
      }
    }

    initPyodide();
  </script>
</body>
</html>`;
  };

  const isPython = activeBlock && (activeBlock.language === 'python' || activeBlock.language === 'py');

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex h-full w-screen sm:w-[450px] flex-col border-l border-white/5 bg-[#0a0a0a] transition-all"
    >
      {/* Tabs */}
      <div className="flex border-b border-white/5 p-3 gap-2">
        {(['reflection', 'code', 'preview'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all",
              activeTab === tab 
                ? "bg-amber-500/10 text-amber-500 shadow-inner" 
                : "text-white/20 hover:text-white/60"
            )}
          >
            {tab === 'reflection' && <Brain className="h-3.5 w-3.5" />}
            {tab === 'code' && <Code2 className="h-3.5 w-3.5" />}
            {tab === 'preview' && <Play className="h-3.5 w-3.5" />}
            <span className="truncate">{tab === 'reflection' ? 'Réflexion' : tab}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
        <AnimatePresence mode="wait">
          {activeTab === 'reflection' && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-500/10 p-2 border border-amber-500/20">
                  <Zap className="h-4 w-4 text-amber-500" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white">Processus Elite</h3>
              </div>

              <div className="space-y-5">
                {['Analyse', 'Planification', 'Génération', 'Vérification'].map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-xl text-[10px] font-bold transition-all shadow-sm",
                      isThinking && thinkingStep === step 
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-900/20 animate-pulse" 
                        : "bg-white/5 text-white/20 border border-white/5"
                    )}>
                      {i + 1}
                    </div>
                    <span className={cn(
                      "text-xs font-medium tracking-wide",
                      isThinking && thinkingStep === step ? "text-white" : "text-white/20"
                    )}>
                      {step}
                    </span>
                    {isThinking && thinkingStep === step && (
                      <motion.div
                        layoutId="active-step"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/5 p-5 shadow-inner">
                <div className="flex items-center gap-2 text-white/40 mb-3">
                  <Terminal className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Logs de Séquence</span>
                </div>
                <div className="font-mono text-[10px] text-white/20 space-y-1.5 leading-relaxed">
                  <p className="flex gap-2">
                    <span className="text-amber-500/40">[00:01]</span>
                    <span>Initializing deep neural cortex...</span>
                  </p>
                  <p className="flex gap-2">
                    <span className="text-amber-500/40">[00:03]</span>
                    <span>Semantic graph loaded (v2.4.0)</span>
                  </p>
                  {isThinking && (
                    <motion.p 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-amber-500/80 flex gap-2"
                    >
                      <span className="text-amber-500/40">[00:08]</span>
                      <span>{">"} EXEC_PROCESS: {thinkingStep.toUpperCase()}...</span>
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex h-full flex-col space-y-4"
            >
              {codeBlocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-slate-500 py-12">
                  <Code2 className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-sm">Aucun code généré pour le moment.</p>
                </div>
              ) : (
                <div className="flex flex-col h-full space-y-4">
                  {/* Technology Support Banner */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/15 rounded-xl p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-white/80 tracking-wider uppercase">
                        Environnement Actif
                      </span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {['HTML5', 'CSS3', 'JS', 'TS', 'PY', '3D'].map((tech) => (
                        <span key={tech} className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/60 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* File Tabs */}
                  <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin border-b border-white/5">
                    {codeBlocks.map((block, i) => {
                      const fileInfo = getFileIconAndColor(block.name || '', block.language);
                      const isSelected = selectedBlockIndex === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedBlockIndex(i)}
                          className={cn(
                            "relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap",
                            isSelected
                              ? "bg-white/5 text-white border border-white/10 shadow-lg"
                              : "text-white/40 hover:text-white/60 hover:bg-white/5 border border-transparent"
                          )}
                        >
                          <span className={cn("text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border leading-none font-sans", fileInfo.color)}>
                            {fileInfo.icon}
                          </span>
                          <span>{block.name || `code.${block.language}`}</span>
                          {isSelected && (
                            <motion.div
                              layoutId="active-file-tab"
                              className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500 rounded-full"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                      <span className="text-xs font-mono text-white/40 uppercase">
                        Langage : {activeBlock.language}
                      </span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/10 transition-all cursor-pointer"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? 'Copié !' : 'Copier'}
                    </button>
                  </div>

                  {/* Code Block Container with Syntax Highlighting and Line Numbers */}
                  <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-[#050505] p-2 sm:p-4 shadow-inner relative max-h-[60vh] sm:max-h-none">
                    <div className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre select-text">
                      <table className="w-full border-collapse">
                        <tbody>
                          {highlightCode(activeBlock.code, activeBlock.language).split('\n').map((line, idx) => (
                            <tr key={idx} className="hover:bg-white/5 group transition-colors">
                              <td className="w-8 select-none text-white/20 text-right pr-3 font-mono border-r border-white/5 mr-3 align-top group-hover:text-white/40">
                                {idx + 1}
                              </td>
                              <td className="pl-3 align-top whitespace-pre break-all sm:break-normal">
                                <span dangerouslySetInnerHTML={{ __html: line || ' ' }} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex h-full flex-col space-y-4"
            >
              {codeBlocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-slate-500 py-12">
                  <Play className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-sm">La prévisualisation apparaîtra ici.</p>
                </div>
              ) : (
                <div className="flex flex-col h-full w-full min-h-[400px] sm:min-h-[500px]">
                  {/* Actions Header */}
                  <div className="flex items-center justify-end gap-2 mb-3">
                    <button
                      onClick={handleRefresh}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Refresh
                    </button>
                    <button
                      onClick={handleOpenInNewTab}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Grand écran
                    </button>
                  </div>

                  {/* Visual Frame */}
                  <div className="flex-1 relative rounded-2xl border border-white/5 bg-black overflow-hidden shadow-2xl">
                    <iframe
                      key={`preview-${refreshKey}`}
                      id="preview-iframe"
                      title="Cook IA Live Preview"
                      sandbox="allow-scripts allow-modals allow-same-origin"
                      referrerPolicy="no-referrer"
                      className="w-full h-full bg-[#080808] border-none"
                      srcDoc={
                        isPython 
                          ? buildPythonRunnerSrcDoc(activeBlock.code) 
                          : buildPreviewSrcDoc(codeBlocks)
                      }
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
