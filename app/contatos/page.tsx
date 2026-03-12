'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { SearchIcon, PlusIcon, PhoneIcon, ChatIcon, ClockIcon } from '@/components/Icons';
import { mockContacts, getRelativeTime } from '@/lib/data';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function ContatosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Contatos</h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              Gerencie seus contatos e clientes
            </p>
          </div>
          <button className="btn-gradient ripple px-6 py-3 rounded-xl font-semibold flex items-center gap-2 self-start sm:self-auto">
            <PlusIcon className="w-5 h-5" />
            Novo Contato
          </button>
        </div>

        {/* Search Bar */}
        <div className="card p-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Buscar por nome, telefone ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-material w-full pl-12"
            />
          </div>
        </div>

        {/* Contacts Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold gradient-text">{mockContacts.length}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total de Contatos</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: '#10b981' }}>
              {mockContacts.filter(c => {
                const lastSeen = new Date(c.lastSeen);
                const now = new Date();
                const diffHours = (now.getTime() - lastSeen.getTime()) / 3600000;
                return diffHours < 24;
              }).length}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Ativos Hoje</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: 'var(--primary-start)' }}>
              {mockContacts.reduce((acc, c) => acc + c.totalMessages, 0)}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Mensagens</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
              {mockContacts.filter(c => c.email).length}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Com E-mail</p>
          </div>
        </div>

        {/* Contacts List */}
        <div className="card overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="col-span-4 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Contato</div>
            <div className="col-span-2 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Telefone</div>
            <div className="col-span-3 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>E-mail</div>
            <div className="col-span-2 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Visto por Ultimo</div>
            <div className="col-span-1 text-sm font-semibold text-center" style={{ color: 'var(--text-secondary)' }}>Msgs</div>
          </div>

          {/* Contacts */}
          {filteredContacts.length === 0 ? (
            <div className="p-8 text-center" style={{ color: 'var(--text-muted)' }}>
              <p>Nenhum contato encontrado</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => router.push(`/contatos/${contact.id}`)}
                  className="p-4 cursor-pointer transition-colors hover:bg-opacity-50"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                        style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
                      >
                        {getInitials(contact.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                          {contact.name}
                        </h3>
                        <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                          {contact.phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                          <ClockIcon className="w-3 h-3" />
                          {getRelativeTime(contact.lastSeen)}
                        </div>
                        <div className="flex items-center gap-1 text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                          <ChatIcon className="w-3 h-3" />
                          {contact.totalMessages}
                        </div>
                      </div>
                    </div>
                    {contact.email && (
                      <p className="text-sm truncate pl-15" style={{ color: 'var(--text-muted)', paddingLeft: '60px' }}>
                        {contact.email}
                      </p>
                    )}
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
                      >
                        {getInitials(contact.name)}
                      </div>
                      <span className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                        {contact.name}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm truncate">{contact.phone}</span>
                    </div>
                    <div className="col-span-3 text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                      {contact.email || '-'}
                    </div>
                    <div className="col-span-2 flex items-center gap-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <ClockIcon className="w-4 h-4" />
                      {getRelativeTime(contact.lastSeen)}
                    </div>
                    <div className="col-span-1 flex items-center justify-center gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <ChatIcon className="w-4 h-4" />
                      {contact.totalMessages}
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
