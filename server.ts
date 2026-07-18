import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to convert history to OpenAI-style messages for fallback APIs
function convertHistoryToOpenAIMessages(systemInstruction: string, history: any[], currentMessage: string) {
  const messages: any[] = [{ role: 'system', content: systemInstruction }];
  
  if (history && Array.isArray(history)) {
    for (const msg of history) {
      const role = msg.role === 'model' || msg.role === 'assistant' ? 'assistant' : 'user';
      let content = '';
      if (typeof msg.parts === 'string') {
        content = msg.parts;
      } else if (Array.isArray(msg.parts)) {
        content = msg.parts.map((p: any) => p.text || '').join('\n');
      } else if (msg.content) {
        content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
      } else if (msg.text) {
        content = msg.text;
      }
      if (content) {
        messages.push({ role, content });
      }
    }
  }
  
  messages.push({ role: 'user', content: currentMessage });
  return messages;
}

// Groq fallback caller
async function tryGroq(messages: any[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  const models = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'gemma2-9b-it', 'mixtral-8x7b-32768'];
  let lastError: any = new Error('No models executed in Groq');

  for (const model of models) {
    try {
      console.log(`[Fallback] Attempting Groq generation with model: ${model}...`);
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API returned status ${response.status}: ${errorText}`);
      }

      const data = await response.json() as any;
      const text = data.choices?.[0]?.message?.content;
      if (text) {
        console.log(`[Success] Groq succeeded with model: ${model}`);
        return text;
      }
    } catch (err: any) {
      console.warn(`[Warning] Groq model ${model} failed:`, err.message || err);
      lastError = err;
    }
  }

  throw lastError;
}

// OpenRouter fallback caller
async function tryOpenRouter(messages: any[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const models = [
    'google/gemma-2-9b-it:free',
    'meta-llama/llama-3-8b-instruct:free',
    'qwen/qwen-2.5-72b-instruct:free',
    'mistralai/mistral-7b-instruct:free',
    'openrouter/auto'
  ];
  let lastError: any = new Error('No models executed in OpenRouter');

  for (const model of models) {
    try {
      console.log(`[Fallback] Attempting OpenRouter generation with model: ${model}...`);
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://ai.studio/build',
          'X-Title': 'Cook IA'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API returned status ${response.status}: ${errorText}`);
      }

      const data = await response.json() as any;
      const text = data.choices?.[0]?.message?.content;
      if (text) {
        console.log(`[Success] OpenRouter succeeded with model: ${model}`);
        return text;
      }
    } catch (err: any) {
      console.warn(`[Warning] OpenRouter model ${model} failed:`, err.message || err);
      lastError = err;
    }
  }

  throw lastError;
}

// Removed tryNvidia

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Proxy with robust cascade fallback engine (Gemini -> Groq -> OpenRouter)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      const SYSTEM_INSTRUCTION = `
Tu es le développeur principal et designer UI/UX de "Cook IA", une agence web d'élite. 
Ta mission est de générer des sites web et applications web d'une qualité visuelle et technique ABSOLUMENT EXCEPTIONNELLE.
Le résultat doit avoir l'air d'avoir été codé à la main par un expert senior, et JAMAIS par une IA basique.

RÈGLES STRICTES DE STRUCTURE ET DE RENDU :
1. Tu DOIS utiliser Tailwind CSS de manière extensive et experte pour TOUT le design. N'utilise JAMAIS de simples fonds blancs basiques (\`bg-white\`) sans ombres complexes, bordures subtiles ou textures. 
2. Le design DOIT être "Premium" et "Elite" : 
   - Utilise le Glassmorphism (\`bg-white/10 backdrop-blur-lg border border-white/20\`).
   - Utilise des modes sombres profonds (\`bg-[#09090b]\`) avec des touches lumineuses (gradients, glows, \`shadow-[0_0_50px_rgba(...,0.3)]\`).
   - Utilise des espacements luxueux (padding généreux \`py-24\`, marges aérées).
   - Utilise des polices modernes (incluses par défaut) et joue sur la typographie (\`tracking-tight\`, \`font-light\`, \`uppercase tracking-widest\`).
3. INTERACTIVITÉ OBLIGATOIRE :
   - Intègre \`x-data\` (Alpine.js) pour toute la logique (menus, modales, paniers, filtres, onglets).
   - Anime TOUS les éléments à l'apparition et au survol (\`transition-all duration-500 hover:scale-105 hover:shadow-2xl\`).
4. IMAGES ET MÉDIAS :
   - Ne mets JAMAIS d'images vides ou cassées. Utilise TOUJOURS de magnifiques images d'Unsplash de haute résolution via \`https://images.unsplash.com/photo-...&w=800&q=80\`.
   - Donne un style aux images (\`rounded-3xl shadow-2xl object-cover aspect-video\`).
5. FORMAT DE RÉPONSE :
   - Ne donne PAS d'explications inutiles.
   - Fournis TOUJOURS un fichier \`index.html\` complet et structuré.
   - Les blocs de code doivent TOUJOURS être nommés :
   \`\`\`html:index.html
   <!-- Code HTML premium complet -->
   \`\`\`
6. INTERDICTION ABSOLUE de faire des pages web basiques avec de simples carrés blancs. Le design doit impressionner immédiatement.
`;

      let generatedText = '';
      let providerUsed = '';
      const errors: string[] = [];

      // Convert history for OpenAI-compatible fallback APIs early
      const openAIMessages = convertHistoryToOpenAIMessages(SYSTEM_INSTRUCTION, history || [], message);

      // 1. TRY GEMINI (Primary)
      if (!generatedText) {
        if (process.env.GEMINI_API_KEY) {
          try {
            console.log('Cascade [1/3]: Trying Gemini...');
            const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-flash-latest'];
            let response;
            let lastError;

            for (const modelName of modelsToTry) {
              let attempts = 0;
              const maxAttempts = 1; // 1 attempt is ideal for fallback agility
              while (attempts < maxAttempts) {
                try {
                  console.log(`Gemini: testing ${modelName}...`);
                  const chat = ai.chats.create({
                    model: modelName,
                    history: history || [],
                    config: {
                      systemInstruction: SYSTEM_INSTRUCTION,
                    }
                  });
                  response = await chat.sendMessage({ message });
                  if (response && response.text) {
                    break;
                  }
                } catch (err: any) {
                  lastError = err;
                  attempts++;
                  if (attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                  }
                }
              }
              if (response && response.text) {
                break;
              }
            }

            if (response && response.text) {
              generatedText = response.text;
              providerUsed = 'Gemini';
            } else {
              throw lastError || new Error('Gemini models failed to output content');
            }
          } catch (err: any) {
            console.warn('Gemini failed, cascading to Groq:', err.message || err);
            errors.push(`Gemini Error: ${err.message || err}`);
          }
        } else {
          console.log('Gemini key is missing, cascading to Groq...');
          errors.push('Gemini: Non configuré');
        }
      }

      // 3. TRY GROQ (Second Fallback)
      if (!generatedText) {
        if (process.env.GROQ_API_KEY) {
          try {
            console.log('Cascade [3/4]: Trying Groq...');
            generatedText = await tryGroq(openAIMessages);
            providerUsed = 'Groq';
          } catch (err: any) {
            console.warn('Groq failed, cascading to OpenRouter:', err.message || err);
            errors.push(`Groq Error: ${err.message || err}`);
          }
        } else {
          console.log('Groq key is missing, cascading to OpenRouter...');
          errors.push('Groq: Non configuré');
        }
      }

      // 4. TRY OPENROUTER (Third Fallback)
      if (!generatedText) {
        if (process.env.OPENROUTER_API_KEY) {
          try {
            console.log('Cascade [4/4]: Trying OpenRouter...');
            generatedText = await tryOpenRouter(openAIMessages);
            providerUsed = 'OpenRouter';
          } catch (err: any) {
            console.warn('OpenRouter failed:', err.message || err);
            errors.push(`OpenRouter Error: ${err.message || err}`);
          }
        } else {
          console.log('OpenRouter key is missing...');
          errors.push('OpenRouter: Non configuré');
        }
      }

      // If everything failed
      if (!generatedText) {
        throw new Error(`Désolé, tous les services d'IA de secours ont échoué ou ne sont pas configurés.\nDétail des erreurs rencontrées :\n- ${errors.join('\n- ')}`);
      }

      console.log(`[Response Success] Generated successfully using provider: ${providerUsed}`);
      res.json({ content: generatedText, provider: providerUsed });
    } catch (error: any) {
      console.error('Chat Cascade Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate response' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cook IA Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
