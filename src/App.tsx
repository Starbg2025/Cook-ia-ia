import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AuthLayout } from './components/auth/AuthLayout';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { Sidebar } from './components/layout/Sidebar';
import { RightPanel } from './components/layout/RightPanel';
import { ChatInterface } from './components/chat/ChatInterface';
import { AuthView, User, ChatMessage } from './types';
import { Menu, PanelRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { supabase } from './lib/supabase';

// Modular Tab Components
import { ExplorerTab } from './components/tabs/ExplorerTab';
import { RecipesTab, SavedConversation } from './components/tabs/RecipesTab';
import { EditorTab } from './components/tabs/EditorTab';
import { VisualTab } from './components/tabs/VisualTab';
import { SettingsTab } from './components/tabs/SettingsTab';
import { ProfileTab } from './components/tabs/ProfileTab';

import { PolicyModal } from './components/auth/PolicyModal';
import { CookieBanner } from './components/auth/CookieBanner';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<AuthView | 'app'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [rightPanelTab, setRightPanelTab] = useState<'reflection' | 'code' | 'preview'>('reflection');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('Analyse');

  // Policy & Cookie Consent states
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<'tos' | 'privacy' | 'cookies'>('tos');

  const handleOpenPolicy = (tab: 'tos' | 'privacy' | 'cookies') => {
    setPolicyTab(tab);
    setIsPolicyOpen(true);
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [codeBlocks, setCodeBlocks] = useState<Array<{ language: string; code: string }>>([]);

  // Conversations (Recipes) History State & Sync States
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<'synced' | 'syncing' | 'fallback' | 'loading'>('loading');

  // Synchronize current messages state with active conversation from history
  useEffect(() => {
    if (activeConversationId && messages.length === 0) {
      const found = conversations.find(c => c.id === activeConversationId);
      if (found) {
        setMessages(found.messages);
      }
    }
  }, [activeConversationId]);

  // Sync active messages updates to conversations list in real-time
  useEffect(() => {
    if (!activeConversationId || messages.length === 0) return;
    setConversations(prev => prev.map(convo => {
      if (convo.id === activeConversationId) {
        // Derive title from the first user message if title is default
        let title = convo.title;
        if (title === "Nouvelle Recette IA" && messages.length > 0) {
          const firstUserMessage = messages.find(m => m.role === 'user');
          if (firstUserMessage) {
            title = firstUserMessage.content.length > 30 
              ? firstUserMessage.content.substring(0, 30) + '...'
              : firstUserMessage.content;
          }
        }
        return {
          ...convo,
          title,
          messages,
          lastMessage: messages[messages.length - 1].cleanContent || messages[messages.length - 1].content,
          messageCount: messages.length,
          timestamp: new Date().toISOString()
        };
      }
      return convo;
    }));
  }, [messages, activeConversationId]);

  // Auto-create conversation if missing when messages are sent
  useEffect(() => {
    if (messages.length > 0 && !activeConversationId) {
      const newId = 'convo-' + Date.now();
      const firstUserMessage = messages.find(m => m.role === 'user');
      const title = firstUserMessage 
        ? (firstUserMessage.content.length > 30 ? firstUserMessage.content.substring(0, 30) + '...' : firstUserMessage.content)
        : "Nouvelle Recette IA";
        
      const newConvo: SavedConversation = {
        id: newId,
        title,
        lastMessage: messages[messages.length - 1].cleanContent || messages[messages.length - 1].content,
        timestamp: new Date().toISOString(),
        messageCount: messages.length,
        messages: messages
      };
      
      setConversations(prev => [newConvo, ...prev]);
      setActiveConversationId(newId);
    }
  }, [messages, activeConversationId]);

  // Load conversations from Supabase on mount/user change
  useEffect(() => {
    let active = true;

    async function loadRecipes() {
      if (!user) {
        // Guest user: load from localStorage
        const local = localStorage.getItem('cook_ia_conversations');
        if (local && active) {
          try {
            setConversations(JSON.parse(local));
          } catch (e) {
            console.error(e);
          }
        } else if (active) {
          setConversations([]);
        }
        setSupabaseSyncStatus('fallback');
        return;
      }

      setSupabaseSyncStatus('loading');
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false });

        if (error) throw error;

        if (active) {
          if (data && data.length > 0) {
            const mapped: SavedConversation[] = data.map((item: any) => ({
              id: item.id,
              title: item.title,
              lastMessage: item.last_message || '',
              timestamp: item.timestamp,
              messageCount: item.message_count || 0,
              messages: typeof item.messages === 'string' ? JSON.parse(item.messages) : (item.messages || []),
            }));
            setConversations(mapped);
          } else {
            // No Cloud recipes found, check if local storage can be migrated
            const local = localStorage.getItem('cook_ia_conversations');
            if (local) {
              try {
                const parsed = JSON.parse(local);
                setConversations(parsed);
                // Migrate to Supabase asynchronously
                const toUpload = parsed.map((convo: any) => ({
                  id: convo.id,
                  user_id: user.id,
                  title: convo.title,
                  last_message: convo.lastMessage,
                  timestamp: convo.timestamp,
                  message_count: convo.messageCount,
                  messages: convo.messages,
                }));
                await supabase.from('recipes').upsert(toUpload);
              } catch (migrateErr) {
                console.warn("Could not migrate local data to Supabase:", migrateErr);
              }
            } else {
              setConversations([]);
            }
          }
          setSupabaseSyncStatus('synced');
        }
      } catch (err: any) {
        console.warn("Supabase load failed, falling back to local storage:", err.message);
        if (active) {
          const local = localStorage.getItem('cook_ia_conversations');
          if (local) {
            try {
              setConversations(JSON.parse(local));
            } catch (e) {
              console.error(e);
            }
          } else {
            setConversations([]);
          }
          setSupabaseSyncStatus('fallback');
        }
      }
    }

    loadRecipes();

    return () => {
      active = false;
    };
  }, [user]);

  // Synchronize conversations changes to cloud and local storage
  useEffect(() => {
    if (supabaseSyncStatus === 'loading') return;

    // Local storage is always the local source of truth
    try {
      localStorage.setItem('cook_ia_conversations', JSON.stringify(conversations));
    } catch (e) {
      console.warn('LocalStorage quota exceeded. Stripping images to save space.');
      try {
        const strippedConversations = conversations.map(convo => ({
          ...convo,
          lastMessage: convo.lastMessage.replace(/\[Image importée[^\]]+\]/g, '[Image attachée]'),
          messages: convo.messages.map(m => ({
            ...m,
            content: m.content.replace(/\[Image importée\s*:\s*"[^"]*"\s*\(source:\s*data:image\/[^;]+;base64,[^)]+\)\]/g, '[Image attachée]'),
            cleanContent: m.cleanContent ? m.cleanContent.replace(/\[Image importée\s*:\s*"[^"]*"\s*\(source:\s*data:image\/[^;]+;base64,[^)]+\)\]/g, '[Image attachée]') : undefined
          }))
        }));
        localStorage.setItem('cook_ia_conversations', JSON.stringify(strippedConversations));
      } catch (err) {
        console.error('Could not save to localStorage even after stripping.', err);
      }
    }

    if (!user) return;

    const syncToCloud = async () => {
      setSupabaseSyncStatus('syncing');
      try {
        if (conversations.length === 0) {
          const { error } = await supabase
            .from('recipes')
            .delete()
            .eq('user_id', user.id);
          if (error) throw error;
        } else {
          const toUpload = conversations.map(convo => ({
            id: convo.id,
            user_id: user.id,
            title: convo.title,
            last_message: convo.lastMessage,
            timestamp: convo.timestamp,
            message_count: convo.messageCount,
            messages: convo.messages,
          }));
          const { error } = await supabase.from('recipes').upsert(toUpload);
          if (error) throw error;
        }
        setSupabaseSyncStatus('synced');
      } catch (err: any) {
        console.warn("Supabase cloud sync failed, using local fallback mode:", err.message);
        setSupabaseSyncStatus('fallback');
      }
    };

    const timer = setTimeout(() => {
      syncToCloud();
    }, 1500);

    return () => clearTimeout(timer);
  }, [conversations, user, supabaseSyncStatus === 'loading']);

  const handleSelectConversation = (id: string) => {
    const found = conversations.find(c => c.id === id);
    if (found) {
      setActiveConversationId(id);
      setMessages(found.messages);
      setActiveTab('chat');
    }
  };

  const handleDeleteConversation = async (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      setMessages([]);
      setActiveConversationId(null);
    }
    if (user) {
      try {
        await supabase.from('recipes').delete().eq('id', id).eq('user_id', user.id);
      } catch (err) {
        console.error("Failed to delete recipe from Supabase:", err);
      }
    }
  };

  const handleNewRecipe = () => {
    const newId = 'convo-' + Date.now();
    const newConvo: SavedConversation = {
      id: newId,
      title: "Nouvelle Recette IA",
      lastMessage: "Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date().toISOString(),
      messageCount: 0,
      messages: []
    };
    
    setConversations(prev => [newConvo, ...prev]);
    setActiveConversationId(newId);
    setMessages([]);
    setActiveTab('chat');
  };

  const handleUpdateProfile = async (name: string, avatarUrl: string) => {
    setUser(prev => prev ? { ...prev, name, avatar_url: avatarUrl } : null);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name, avatar_url: avatarUrl }
      });
      if (error) throw error;
    } catch (err) {
      console.error("Erreur de mise à jour du profil Supabase:", err);
    }
  };

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          avatar_url: session.user.user_metadata?.avatar_url,
        });
        setView('app');
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          avatar_url: session.user.user_metadata?.avatar_url,
        });
        setView('app');
      } else {
        setUser(null);
        setView('login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthSuccess = (userData?: User) => {
    if (userData) {
      setUser(userData);
      setView('app');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setConversations([]);
    setMessages([]);
    setActiveConversationId(null);
    setView('login');
  };

  const handleThinkingChange = (thinking: boolean, step: string) => {
    setIsThinking(thinking);
    setThinkingStep(step);
    if (thinking) {
      setRightPanelTab('reflection');
    }
  };

  if (!isLoaded) {
    return <SplashScreen onComplete={() => setIsLoaded(true)} />;
  }

  if (view === 'app') {
    return (
      <div className="flex h-screen bg-[#080808] font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-4 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-white/60 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-bold text-white text-sm">C</div>
            <span className="font-serif text-white italic">Cook IA</span>
          </div>
          <button 
            onClick={() => setIsRightPanelOpen(true)}
            className="p-2 text-white/60 hover:text-white"
          >
            <PanelRight className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar with Drawer on Mobile */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 lg:relative lg:block transition-transform duration-300",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setIsMobileMenuOpen(false);
            }} 
            onLogout={handleLogout} 
            onNewRecipe={handleNewRecipe}
          />
        </div>

        {/* Backdrop for Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        <main className="relative flex-1 overflow-hidden pt-16 lg:pt-0">
          {activeTab === 'chat' && (
            <ChatInterface 
              user={user}
              messages={messages}
              setMessages={setMessages}
              onThinkingChange={handleThinkingChange} 
              onCodeGenerated={(blocks) => {
                setCodeBlocks(blocks);
                if (blocks.length > 0) {
                  setRightPanelTab('preview');
                }
              }}
            />
          )}
          {activeTab === 'files' && (
            <ExplorerTab 
              conversations={conversations}
              onSelectTab={setActiveTab} 
              onSelectConversation={handleSelectConversation}
            />
          )}
          {activeTab === 'history' && (
            <RecipesTab 
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
              onDeleteConversation={handleDeleteConversation}
            />
          )}
          {activeTab === 'editor' && (
            <EditorTab />
          )}
          {activeTab === 'preview' && (
            <VisualTab 
              onSelectPrompt={(prompt) => {
                // Initialize a new conversation with this template
                const newId = 'convo-' + Date.now();
                const newConvo: SavedConversation = {
                  id: newId,
                  title: "Génération de modèle",
                  lastMessage: prompt,
                  timestamp: new Date().toISOString(),
                  messageCount: 1,
                  messages: [
                    { id: Date.now().toString(), role: 'user', content: prompt, timestamp: new Date().toISOString() }
                  ]
                };
                
                setConversations(prev => [newConvo, ...prev]);
                setActiveConversationId(newId);
                setMessages(newConvo.messages);
                setActiveTab('chat');
              }}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsTab 
              user={user} 
              onUpdateProfile={handleUpdateProfile} 
              supabaseSyncStatus={supabaseSyncStatus} 
            />
          )}
          {activeTab === 'profile' && (
            <ProfileTab user={user} />
          )}
        </main>

        {/* Right Panel with Drawer on Mobile */}
        <div className={cn(
          "fixed inset-y-0 right-0 z-50 lg:relative lg:block transition-transform duration-300",
          isRightPanelOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}>
          <div className="lg:hidden absolute top-4 right-4 z-10">
            <button 
              onClick={() => setIsRightPanelOpen(false)}
              className="p-2 rounded-full bg-white/5 text-white/40 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <RightPanel 
            activeTab={rightPanelTab} 
            onTabChange={setRightPanelTab} 
            isThinking={isThinking}
            thinkingStep={thinkingStep}
            codeBlocks={codeBlocks}
          />
        </div>

        {/* Backdrop for Right Panel */}
        <AnimatePresence>
          {isRightPanelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRightPanelOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        <PolicyModal 
          isOpen={isPolicyOpen} 
          onClose={() => setIsPolicyOpen(false)} 
          defaultTab={policyTab} 
        />
        <CookieBanner onOpenPolicy={handleOpenPolicy} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <AnimatedBackground />
      
      {view === 'login' && (
        <AuthLayout title="Connexion" subtitle="Accédez à votre espace de travail intelligent.">
          <LoginForm 
            onSuccess={handleAuthSuccess}
            onSwitchToSignup={() => setView('signup')}
            onSwitchToForgot={() => setView('forgot-password')}
            onOpenPolicy={handleOpenPolicy}
          />
        </AuthLayout>
      )}

      {view === 'signup' && (
        <AuthLayout title="Inscription" subtitle="Créez votre accès à l'intelligence culinaire.">
          <SignupForm 
            onSuccess={() => setView('login')}
            onSwitchToLogin={() => setView('login')}
            onOpenPolicy={handleOpenPolicy}
          />
        </AuthLayout>
      )}

      {view === 'forgot-password' && (
        <AuthLayout title="Récupération" subtitle="Entrez votre email pour restaurer votre accès.">
          <ForgotPasswordForm 
            onBackToLogin={() => setView('login')}
          />
        </AuthLayout>
      )}

      <PolicyModal 
        isOpen={isPolicyOpen} 
        onClose={() => setIsPolicyOpen(false)} 
        defaultTab={policyTab} 
      />
      <CookieBanner onOpenPolicy={handleOpenPolicy} />
    </div>
  );
}
