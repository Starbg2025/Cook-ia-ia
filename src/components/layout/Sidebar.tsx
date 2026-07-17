import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderTree, 
  MessageSquare, 
  Settings, 
  History, 
  Code2, 
  Layout, 
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onNewRecipe?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout, onNewRecipe }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'chat', icon: MessageSquare, label: 'Assistant Chat' },
    { id: 'files', icon: FolderTree, label: 'Explorateur' },
    { id: 'history', icon: History, label: 'Recettes' },
    { id: 'editor', icon: Code2, label: 'Éditeur' },
    { id: 'preview', icon: Layout, label: 'Visualisation' },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Paramètres' },
    { id: 'profile', icon: UserIcon, label: 'Mon Compte' },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="relative flex h-full flex-col border-r border-white/5 bg-[#0a0a0a] transition-all duration-300 ease-in-out"
    >
      {/* Header */}
      <div className="flex h-20 items-center px-6">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-900/20 transform rotate-3">
            <span className="text-xl font-bold text-white">C</span>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="text-xl font-serif font-light tracking-tight text-white leading-none">
                Cook <span className="text-amber-500 font-bold italic">IA</span>
              </span>
              <span className="text-[8px] uppercase tracking-widest text-white/30 font-bold mt-1">Studio Elite</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* New Project Button */}
      <div className="px-4 py-4">
        <button 
          onClick={onNewRecipe}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98] cursor-pointer",
            isCollapsed ? "px-0" : "px-4 shadow-inner"
          )}
        >
          <Plus className="h-5 w-5 text-amber-500" />
          {!isCollapsed && <span>Nouvelle Recette</span>}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1.5 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "group relative flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all",
              activeTab === item.id 
                ? "bg-amber-500/10 text-amber-500" 
                : "text-white/40 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 shrink-0 transition-all group-hover:scale-110", 
              activeTab === item.id ? "text-amber-500" : "text-white/20"
            )} />
            {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{item.label}</motion.span>}
            {activeTab === item.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute left-0 h-6 w-1 rounded-r-full bg-amber-500"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="space-y-1.5 border-t border-white/5 p-4">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all",
              activeTab === item.id 
                ? "bg-amber-500/10 text-amber-500" 
                : "text-white/40 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn("h-5 w-5 shrink-0", activeTab === item.id ? "text-amber-500" : "text-white/20")} />
            {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{item.label}</motion.span>}
          </button>
        ))}
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-400/60 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-white/5 bg-[#1a1a1a] text-white/40 hover:text-white transition-colors z-20"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </motion.aside>
  );
};
