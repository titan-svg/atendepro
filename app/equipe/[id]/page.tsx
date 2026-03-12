'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { ChatIcon, CheckIcon, ClockIcon } from '@/components/Icons';
import { mockTeamMembers, mockConversations, getRoleLabel, formatTime, TeamMember } from '@/lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TeamMemberDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const member = mockTeamMembers.find(m => m.id === id);
  const [currentStatus, setCurrentStatus] = useState<TeamMember['status']>(member?.status || 'offline');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!member) {
    return (
      <AppLayout>
        <div className="card p-12 text-center">
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Membro nao encontrado
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            O membro da equipe que voce esta procurando nao existe.
          </p>
          <button
            onClick={() => router.push('/equipe')}
            className="btn-gradient px-6 py-2 rounded-xl font-semibold"
          >
            Voltar para Equipe
          </button>
        </div>
      </AppLayout>
    );
  }

  const assignedConversations = mockConversations.filter(
    conv => conv.assignedTo?.id === member.id && conv.status !== 'resolved'
  );

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'away': return 'bg-amber-500';
      case 'offline': return 'bg-slate-400';
    }
  };

  const getStatusLabel = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Ausente';
      case 'offline': return 'Offline';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleStatusChange = (status: TeamMember['status']) => {
    setCurrentStatus(status);
    // Here you would update the status in your backend
  };

  const handleDelete = () => {
    // Here you would delete the member in your backend
    router.push('/equipe');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/equipe')}
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: 'var(--text-secondary)' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Voltar para Equipe
        </button>

        {/* Profile Header */}
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <div className="relative mx-auto sm:mx-0">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
              >
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  getInitials(member.name)
                )}
              </div>
              <span
                className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 ${getStatusColor(currentStatus)}`}
                style={{ borderColor: 'var(--card-bg)' }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold gradient-text">{member.name}</h1>
              <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>{member.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
                    color: 'white'
                  }}
                >
                  {getRoleLabel(member.role)}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(currentStatus)}`} />
                  {getStatusLabel(currentStatus)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center sm:justify-end">
              <button
                onClick={() => router.push(`/equipe/${member.id}/editar`)}
                className="px-5 py-2 rounded-xl font-medium transition-all"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)'
                }}
              >
                Editar
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-5 py-2 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>

        {/* Status Selector */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Alterar Status
          </h2>
          <div className="flex flex-wrap gap-3">
            {(['online', 'away', 'offline'] as const).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  currentStatus === status ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                }`}
                style={{
                  backgroundColor: currentStatus === status ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                <span className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                {getStatusLabel(status)}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card p-6 text-center">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
            >
              <ChatIcon className="w-7 h-7 text-white" />
            </div>
            <p className="text-3xl font-bold gradient-text">{member.activeChats}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Conversas Ativas</p>
          </div>
          <div className="card p-6 text-center">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center bg-emerald-500"
            >
              <CheckIcon className="w-7 h-7 text-white" />
            </div>
            <p className="text-3xl font-bold text-emerald-500">{member.resolvedToday}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Resolvidos Hoje</p>
          </div>
          <div className="card p-6 text-center">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center bg-amber-500"
            >
              <ClockIcon className="w-7 h-7 text-white" />
            </div>
            <p className="text-3xl font-bold text-amber-500">{member.avgResponseTime}s</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Tempo Medio de Resposta</p>
          </div>
        </div>

        {/* Assigned Conversations */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Conversas Atribuidas
          </h2>
          {assignedConversations.length > 0 ? (
            <div className="space-y-3">
              {assignedConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => router.push(`/conversas/${conversation.id}`)}
                  className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  {/* Contact Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium"
                    style={{ background: 'linear-gradient(135deg, var(--secondary-start), var(--secondary-end))' }}
                  >
                    {conversation.contact.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                        {conversation.contact.name}
                      </h4>
                      <span className="text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>
                        {formatTime(conversation.lastMessageAt)}
                      </span>
                    </div>
                    <p className="text-sm truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {conversation.messages[conversation.messages.length - 1]?.content}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
                      conversation.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {conversation.status === 'active' ? 'Ativo' : 'Aguardando'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <ChatIcon className="w-8 h-8" style={{ color: 'var(--text-muted)' }} />
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                Nenhuma conversa ativa atribuida a este membro.
              </p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="card p-6 max-w-md w-full animate-fade-in">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Confirmar Exclusao
              </h3>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Tem certeza que deseja excluir <strong>{member.name}</strong> da equipe? Esta acao nao pode ser desfeita.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-5 py-2 rounded-xl font-medium"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-2 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
