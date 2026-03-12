// Types
export type ConversationStatus = 'active' | 'waiting' | 'resolved';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  lastSeen: string;
  totalMessages: number;
}

export interface Message {
  id: string;
  content: string;
  sender: 'client' | 'attendant';
  timestamp: string;
  read: boolean;
  attendantName?: string;
}

export interface Conversation {
  id: string;
  contact: Contact;
  status: ConversationStatus;
  messages: Message[];
  assignedTo?: TeamMember;
  startedAt: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'attendant';
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  activeChats: number;
  resolvedToday: number;
  avgResponseTime: number;
}

export interface DashboardStats {
  totalConversations: number;
  activeConversations: number;
  waitingConversations: number;
  resolvedToday: number;
  avgResponseTime: number;
  teamOnline: number;
}

// Mock Data
export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@escritorio.com.br',
    role: 'admin',
    status: 'online',
    activeChats: 3,
    resolvedToday: 15,
    avgResponseTime: 45,
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@escritorio.com.br',
    role: 'attendant',
    status: 'online',
    activeChats: 5,
    resolvedToday: 22,
    avgResponseTime: 38,
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@escritorio.com.br',
    role: 'attendant',
    status: 'away',
    activeChats: 2,
    resolvedToday: 18,
    avgResponseTime: 52,
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana@escritorio.com.br',
    role: 'supervisor',
    status: 'online',
    activeChats: 4,
    resolvedToday: 20,
    avgResponseTime: 41,
  },
  {
    id: '5',
    name: 'Carlos Lima',
    email: 'carlos@escritorio.com.br',
    role: 'attendant',
    status: 'offline',
    activeChats: 0,
    resolvedToday: 12,
    avgResponseTime: 55,
  },
];

export const mockContacts: Contact[] = [
  { id: '1', name: 'Roberto Almeida', phone: '+55 11 98765-4321', email: 'roberto@email.com', lastSeen: '2026-03-12T10:30:00', totalMessages: 45 },
  { id: '2', name: 'Fernanda Souza', phone: '+55 21 99876-5432', lastSeen: '2026-03-12T09:15:00', totalMessages: 23 },
  { id: '3', name: 'Lucas Mendes', phone: '+55 31 97654-3210', email: 'lucas@empresa.com', lastSeen: '2026-03-12T11:00:00', totalMessages: 67 },
  { id: '4', name: 'Juliana Costa', phone: '+55 41 96543-2109', lastSeen: '2026-03-11T16:45:00', totalMessages: 12 },
  { id: '5', name: 'Marcos Pereira', phone: '+55 51 95432-1098', email: 'marcos@tech.com', lastSeen: '2026-03-12T08:30:00', totalMessages: 89 },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    contact: mockContacts[0],
    status: 'active',
    messages: [
      { id: '1', content: 'Bom dia! Preciso de informações sobre o processo.', sender: 'client', timestamp: '2026-03-12T10:25:00', read: true },
      { id: '2', content: 'Bom dia Roberto! Claro, qual processo você gostaria de consultar?', sender: 'attendant', timestamp: '2026-03-12T10:26:00', read: true, attendantName: 'Maria Santos' },
      { id: '3', content: 'É sobre o processo de inventário, número 12345.', sender: 'client', timestamp: '2026-03-12T10:28:00', read: true },
      { id: '4', content: 'Deixa eu verificar aqui... Um momento por favor.', sender: 'attendant', timestamp: '2026-03-12T10:29:00', read: true, attendantName: 'Maria Santos' },
      { id: '5', content: 'Obrigado!', sender: 'client', timestamp: '2026-03-12T10:30:00', read: false },
    ],
    assignedTo: mockTeamMembers[1],
    startedAt: '2026-03-12T10:25:00',
    lastMessageAt: '2026-03-12T10:30:00',
    unreadCount: 1,
  },
  {
    id: '2',
    contact: mockContacts[1],
    status: 'waiting',
    messages: [
      { id: '1', content: 'Olá, gostaria de agendar uma reunião.', sender: 'client', timestamp: '2026-03-12T09:10:00', read: true },
      { id: '2', content: 'Ainda estou aguardando retorno...', sender: 'client', timestamp: '2026-03-12T09:15:00', read: false },
    ],
    startedAt: '2026-03-12T09:10:00',
    lastMessageAt: '2026-03-12T09:15:00',
    unreadCount: 1,
  },
  {
    id: '3',
    contact: mockContacts[2],
    status: 'active',
    messages: [
      { id: '1', content: 'Preciso urgente dos documentos do contrato.', sender: 'client', timestamp: '2026-03-12T10:55:00', read: true },
      { id: '2', content: 'Lucas, bom dia! Estou separando os documentos agora.', sender: 'attendant', timestamp: '2026-03-12T10:57:00', read: true, attendantName: 'João Silva' },
      { id: '3', content: 'Ótimo, quando posso buscar?', sender: 'client', timestamp: '2026-03-12T11:00:00', read: false },
    ],
    assignedTo: mockTeamMembers[0],
    startedAt: '2026-03-12T10:55:00',
    lastMessageAt: '2026-03-12T11:00:00',
    unreadCount: 1,
  },
  {
    id: '4',
    contact: mockContacts[3],
    status: 'resolved',
    messages: [
      { id: '1', content: 'Boa tarde! O pagamento foi confirmado?', sender: 'client', timestamp: '2026-03-11T16:40:00', read: true },
      { id: '2', content: 'Sim, confirmado! Obrigado pela preferência.', sender: 'attendant', timestamp: '2026-03-11T16:43:00', read: true, attendantName: 'Pedro Costa' },
      { id: '3', content: 'Perfeito, obrigada!', sender: 'client', timestamp: '2026-03-11T16:45:00', read: true },
    ],
    assignedTo: mockTeamMembers[2],
    startedAt: '2026-03-11T16:40:00',
    lastMessageAt: '2026-03-11T16:45:00',
    unreadCount: 0,
  },
  {
    id: '5',
    contact: mockContacts[4],
    status: 'active',
    messages: [
      { id: '1', content: 'Bom dia, preciso atualizar meu cadastro.', sender: 'client', timestamp: '2026-03-12T08:25:00', read: true },
      { id: '2', content: 'Bom dia Marcos! Quais dados você precisa atualizar?', sender: 'attendant', timestamp: '2026-03-12T08:27:00', read: true, attendantName: 'Ana Oliveira' },
      { id: '3', content: 'Endereço e telefone comercial.', sender: 'client', timestamp: '2026-03-12T08:30:00', read: true },
    ],
    assignedTo: mockTeamMembers[3],
    startedAt: '2026-03-12T08:25:00',
    lastMessageAt: '2026-03-12T08:30:00',
    unreadCount: 0,
  },
];

export const mockDashboardStats: DashboardStats = {
  totalConversations: 127,
  activeConversations: 14,
  waitingConversations: 3,
  resolvedToday: 87,
  avgResponseTime: 42,
  teamOnline: 4,
};

export const mockChartData = [
  { day: 'Seg', conversations: 98, resolved: 92 },
  { day: 'Ter', conversations: 115, resolved: 108 },
  { day: 'Qua', conversations: 102, resolved: 97 },
  { day: 'Qui', conversations: 127, resolved: 118 },
  { day: 'Sex', conversations: 134, resolved: 125 },
  { day: 'Sáb', conversations: 45, resolved: 43 },
  { day: 'Dom', conversations: 23, resolved: 21 },
];

// Helper functions
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'agora';
  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return formatDate(dateString);
}

export function getStatusColor(status: ConversationStatus): string {
  switch (status) {
    case 'active': return 'bg-emerald-500';
    case 'waiting': return 'bg-amber-500';
    case 'resolved': return 'bg-slate-400';
    default: return 'bg-slate-400';
  }
}

export function getStatusLabel(status: ConversationStatus): string {
  switch (status) {
    case 'active': return 'Ativo';
    case 'waiting': return 'Aguardando';
    case 'resolved': return 'Resolvido';
    default: return status;
  }
}

export function getRoleLabel(role: TeamMember['role']): string {
  switch (role) {
    case 'admin': return 'Administrador';
    case 'supervisor': return 'Supervisor';
    case 'attendant': return 'Atendente';
    default: return role;
  }
}
