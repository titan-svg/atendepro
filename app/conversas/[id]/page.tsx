'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { SendIcon, ContactsIcon, TeamIcon, ChevronDownIcon } from '@/components/Icons';
import {
  mockConversations,
  mockTeamMembers,
  getStatusColor,
  getStatusLabel,
  formatTime,
  ConversationStatus,
} from '@/lib/data';

export default function ConversaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.id as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = useMemo(() => {
    return mockConversations.find((c) => c.id === conversationId);
  }, [conversationId]);

  const [messageText, setMessageText] = useState('');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showAssignMenu, setShowAssignMenu] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ConversationStatus>(
    conversation?.status || 'active'
  );
  const [assignedTo, setAssignedTo] = useState(conversation?.assignedTo);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // In a real app, this would send the message
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const statusOptions: ConversationStatus[] = ['active', 'waiting', 'resolved'];

  if (!conversation) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
            Conversa nao encontrada
          </p>
          <button
            onClick={() => router.push('/conversas')}
            className="mt-4 btn-gradient px-6 py-2 rounded-lg font-medium"
          >
            Voltar para Conversas
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)]">
        {/* Header */}
        <div
          className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4"
          style={{ flexShrink: 0 }}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
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
            <div>
              <h2 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                {conversation.contact.name}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {conversation.contact.phone}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusMenu(!showStatusMenu);
                  setShowAssignMenu(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium text-white flex items-center gap-1 ${getStatusColor(
                  currentStatus
                )}`}
              >
                {getStatusLabel(currentStatus)}
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {showStatusMenu && (
                <div
                  className="absolute right-0 top-full mt-1 py-1 rounded-lg shadow-lg z-10 min-w-[140px]"
                  style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                >
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setCurrentStatus(status);
                        setShowStatusMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:opacity-80 flex items-center gap-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Assign Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAssignMenu(!showAssignMenu);
                  setShowStatusMenu(false);
                }}
                className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                }}
              >
                <TeamIcon className="w-4 h-4" />
                {assignedTo ? assignedTo.name.split(' ')[0] : 'Atribuir'}
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {showAssignMenu && (
                <div
                  className="absolute right-0 top-full mt-1 py-1 rounded-lg shadow-lg z-10 min-w-[180px]"
                  style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                >
                  {mockTeamMembers
                    .filter((m) => m.status !== 'offline')
                    .map((member) => (
                      <button
                        key={member.id}
                        onClick={() => {
                          setAssignedTo(member);
                          setShowAssignMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:opacity-80 flex items-center gap-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                          style={{
                            background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
                          }}
                        >
                          {getInitials(member.name)}
                        </div>
                        <span className="flex-1">{member.name}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            member.status === 'online' ? 'status-online' : 'status-away'
                          }`}
                        />
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* View Contact */}
            <button
              onClick={() => router.push(`/contatos/${conversation.contact.id}`)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
              }}
            >
              <ContactsIcon className="w-4 h-4" />
              Ver Contato
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="card flex-1 overflow-y-auto p-4 space-y-4"
          style={{ minHeight: 0 }}
        >
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'attendant' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[70%] p-3 ${
                  message.sender === 'attendant' ? 'message-sent' : 'message-received'
                }`}
              >
                {message.sender === 'attendant' && message.attendantName && (
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: message.sender === 'attendant' ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}
                  >
                    {message.attendantName}
                  </p>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className="text-xs mt-1 text-right"
                  style={{ color: message.sender === 'attendant' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="card p-4 mt-4" style={{ flexShrink: 0 }}>
          <div className="flex items-end gap-3">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="input-material flex-1 resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="btn-gradient p-3 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-50"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
