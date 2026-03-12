'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { SearchIcon, ChatIcon } from '@/components/Icons';
import {
  mockConversations,
  getStatusColor,
  getStatusLabel,
  getRelativeTime,
  ConversationStatus,
} from '@/lib/data';

type FilterTab = 'all' | ConversationStatus;

export default function ConversasPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'Todas' },
    { key: 'active', label: 'Ativas' },
    { key: 'waiting', label: 'Aguardando' },
    { key: 'resolved', label: 'Resolvidas' },
  ];

  const filteredConversations = useMemo(() => {
    return mockConversations.filter((conversation) => {
      // Filter by status
      if (activeFilter !== 'all' && conversation.status !== activeFilter) {
        return false;
      }
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch = conversation.contact.name.toLowerCase().includes(query);
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        const messageMatch = lastMessage?.content.toLowerCase().includes(query);
        return nameMatch || messageMatch;
      }
      return true;
    });
  }, [activeFilter, searchQuery]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getLastMessage = (conversationId: string) => {
    const conversation = mockConversations.find((c) => c.id === conversationId);
    if (!conversation || conversation.messages.length === 0) return '';
    const lastMsg = conversation.messages[conversation.messages.length - 1];
    const prefix = lastMsg.sender === 'attendant' ? 'Você: ' : '';
    const content = lastMsg.content.length > 50 ? lastMsg.content.substring(0, 50) + '...' : lastMsg.content;
    return prefix + content;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Conversas
            </h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              Gerencie todas as conversas com seus clientes
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card p-4 space-y-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeFilter === tab.key
                    ? 'btn-gradient'
                    : ''
                }`}
                style={
                  activeFilter !== tab.key
                    ? {
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                      }
                    : undefined
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Buscar por nome ou mensagem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-material w-full pl-12"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="card overflow-hidden">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center">
              <ChatIcon className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                Nenhuma conversa encontrada
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                Tente ajustar os filtros ou a busca
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => router.push(`/conversas/${conversation.id}`)}
                  className="p-4 flex items-center gap-4 cursor-pointer transition-colors hover:opacity-90"
                  style={{ backgroundColor: conversation.unreadCount > 0 ? 'var(--bg-secondary)' : 'transparent' }}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {conversation.contact.avatar ? (
                      <img
                        src={conversation.contact.avatar}
                        alt={conversation.contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white"
                        style={{
                          background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
                        }}
                      >
                        {getInitials(conversation.contact.name)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`font-semibold truncate ${conversation.unreadCount > 0 ? '' : ''}`}
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {conversation.contact.name}
                      </h3>
                      <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                        {getRelativeTime(conversation.lastMessageAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p
                        className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-medium' : ''}`}
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {getLastMessage(conversation.id)}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Status Badge */}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(
                            conversation.status
                          )}`}
                        >
                          {getStatusLabel(conversation.status)}
                        </span>
                        {/* Unread Count */}
                        {conversation.unreadCount > 0 && (
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{
                              background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
                            }}
                          >
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
