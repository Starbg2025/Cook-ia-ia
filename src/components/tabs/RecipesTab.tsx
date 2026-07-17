import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  Search, 
  MessageSquare, 
  Clock, 
  Trash2, 
  Sparkles, 
  ChevronRight, 
  CornerDownRight,
  Database,
  Calendar
} from 'lucide-react';
import { ChatMessage } from '../../types';

export interface SavedConversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
  messages: ChatMessage[];
}

interface RecipesTabProps {
  conversations: SavedConversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

export const RecipesTab: React.FC<RecipesTabProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(convo => 
    convo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    convo.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#080808] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Historique des sessions
            </span>
            <History className="h-4 w-4 text-amber-500 animate-spin-slow" />
          </div>
          <h1 className="text-3xl font-serif font-light text-white">
            Journal des <span className="italic text-amber-400">Recettes IA</span>
          </h1>
          <p className="text-xs text-white/40 mt-1">
            Parcourez et reprenez n'importe laquelle de vos conversations précédentes avec Cook IA. Tout le code et l'historique sont préservés.
          </p>
        </div>

        {/* Database info badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] text-white/40 font-bold uppercase tracking-wider self-start sm:self-center shadow-inner">
          <Database className="h-3.5 w-3.5 text-amber-500" />
          <span>Local Sync Active</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
        <input
          type="text"
          placeholder="Rechercher dans l'historique des recettes..."
          className="w-full pl-11 pr-4 py-3.5 text-xs bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/5 transition-all shadow-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Conversations List */}
      {filteredConversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
          <div className="h-12 w-12 rounded-xl bg-white/5 text-white/30 flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-serif text-white/80 mb-1">Aucune recette enregistrée</h3>
          <p className="text-xs text-white/40 max-w-sm">
            Vos conversations avec l'IA s'afficheront ici au fur et à mesure que vous créez des sites web ou demandez des clones.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredConversations.map((convo, index) => {
            const isActive = convo.id === activeConversationId;
            const formattedDate = new Date(convo.timestamp).toLocaleDateString([], {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <motion.div
                key={convo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`group relative rounded-xl border p-4 sm:p-5 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:shadow-lg ${
                  isActive 
                    ? "bg-amber-500/[0.03] border-amber-500/30" 
                    : "bg-[#0a0a0a]/60 border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                {/* Active glow side panel */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-amber-500 rounded-r-md" />
                )}

                <div 
                  onClick={() => onSelectConversation(convo.id)} 
                  className="flex-1 flex items-start gap-4"
                >
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    isActive 
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-400" 
                      : "bg-white/5 border-white/5 text-white/30 group-hover:text-white/60 transition-colors"
                  }`}>
                    <MessageSquare className="h-5 w-5" />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                        {convo.title || "Génération Sans Titre"}
                      </h4>
                      {isActive && (
                        <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-white/30 font-semibold uppercase tracking-wider">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formattedDate}</span>
                      <span>•</span>
                      <span>{convo.messageCount} messages</span>
                    </div>

                    {/* Sub text message snippet */}
                    <p className="text-xs text-white/50 leading-relaxed truncate max-w-xl group-hover:text-white/70 transition-colors">
                      {convo.lastMessage}
                    </p>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-3 sm:self-center border-t border-white/5 sm:border-0 pt-3 sm:pt-0 justify-end">
                  <button
                    onClick={() => onDeleteConversation(convo.id)}
                    className="p-2.5 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 transition-all cursor-pointer"
                    title="Supprimer la conversation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onSelectConversation(convo.id)}
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/5 hover:border-white/10 transition-all flex items-center gap-1.5 group-hover:border-amber-500/20 group-hover:text-amber-400 cursor-pointer"
                  >
                    <span>Reprendre</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
