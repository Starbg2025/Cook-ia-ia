export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  cleanContent?: string;
  codeBlocks?: Array<{ language: string; code: string; name?: string }>;
  timestamp: string;
  status?: 'pending' | 'sent' | 'error';
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export type AuthView = 'login' | 'signup' | 'forgot-password' | 'verify-email';
