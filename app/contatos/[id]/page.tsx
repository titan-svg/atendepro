'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import {
  PhoneIcon,
  ChatIcon,
  ClockIcon,
  SearchIcon
} from '@/components/Icons';
import {
  mockContacts,
  mockConversations,
  getRelativeTime,
  formatDate,
  formatTime,
  getStatusLabel,
  getStatusColor
} from '@/lib/data';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Icons not in the Icons file
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

export default function ContatoDetalhePage() {
  const router = useRouter();
  const params = useParams();
  const contactId = params.id as string;

  const contact = mockContacts.find(c => c.id === contactId);

  // Find all conversations with this contact
  const contactConversations = mockConversations.filter(
    conv => conv.contact.id === contactId
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!contact) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Contato nao encontrado
            </h1>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              O contato que voce esta procurando nao existe ou foi removido.
            </p>
            <button
              onClick={() => router.push('/contatos')}
              className="btn-gradient ripple px-6 py-3 rounded-xl font-semibold"
            >
              Voltar para Contatos
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/contatos')}
            className="p-2 rounded-xl transition-colors"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Detalhes do Contato</h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              Informacoes e historico de conversas
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact Profile Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 space-y-6">
              {/* Avatar and Name */}
              <div className="text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
                >
                  {getInitials(contact.name)}
                </div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {contact.name}
                </h2>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <span className="text-indigo-500 flex-shrink-0">
                    <PhoneIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Telefone</p>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{contact.phone}</p>
                  </div>
                </div>

                {contact.email && (
                  <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <span className="text-indigo-500 flex-shrink-0">
                      <EnvelopeIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>E-mail</p>
                      <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>{contact.email}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <span className="text-indigo-500 flex-shrink-0">
                    <ClockIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Visto por Ultimo</p>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {getRelativeTime(contact.lastSeen)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <span className="text-indigo-500 flex-shrink-0">
                    <ChatIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Total de Mensagens</p>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{contact.totalMessages}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <button
                  onClick={() => router.push('/conversas/nova?contato=' + contact.id)}
                  className="btn-gradient ripple w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <ChatIcon className="w-5 h-5" />
                  Iniciar Conversa
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="py-2.5 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <PencilIcon className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="py-2.5 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors text-red-500"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation History */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Historico de Conversas
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {contactConversations.length} conversa(s) encontrada(s)
                </p>
              </div>

              {contactConversations.length === 0 ? (
                <div className="p-8 text-center" style={{ color: 'var(--text-muted)' }}>
                  <ChatIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium mb-1">Nenhuma conversa</p>
                  <p className="text-sm">Inicie uma nova conversa com este contato</p>
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                  {contactConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => router.push(`/conversas/${conversation.id}`)}
                      className="p-4 cursor-pointer transition-colors"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`w-2 h-2 rounded-full ${getStatusColor(conversation.status)}`}
                            />
                            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                              {getStatusLabel(conversation.status)}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <span
                                className="px-2 py-0.5 text-xs rounded-full text-white"
                                style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
                              >
                                {conversation.unreadCount} nova(s)
                              </span>
                            )}
                          </div>

                          <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                            {conversation.messages[conversation.messages.length - 1]?.content || 'Sem mensagens'}
                          </p>

                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                              Iniciada em: {formatDate(conversation.startedAt)}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                              {conversation.messages.length} mensagem(ns)
                            </span>
                            {conversation.assignedTo && (
                              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                Atendente: {conversation.assignedTo.name}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {formatTime(conversation.lastMessageAt)}
                          </p>
                          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                            {getRelativeTime(conversation.lastMessageAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="card p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Confirmar Exclusao
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Tem certeza que deseja excluir o contato <strong>{contact.name}</strong>? Esta acao nao pode ser desfeita.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  router.push('/contatos');
                }}
                className="px-4 py-2 rounded-xl font-medium text-white"
                style={{ backgroundColor: '#ef4444' }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
