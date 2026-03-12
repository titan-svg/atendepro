'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { PlusIcon, SearchIcon, ChatIcon, CheckIcon, ClockIcon } from '@/components/Icons';
import { mockTeamMembers, getRoleLabel, TeamMember } from '@/lib/data';

export default function EquipePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | TeamMember['status']>('all');

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Equipe</h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              Gerencie os membros da sua equipe de atendimento
            </p>
          </div>
          <button
            onClick={() => router.push('/equipe/novo')}
            className="btn-gradient ripple px-6 py-3 rounded-xl font-semibold flex items-center gap-2 self-start sm:self-auto"
          >
            <PlusIcon className="w-5 h-5" />
            Adicionar Membro
          </button>
        </div>

        {/* Filters */}
        <div className="card p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-material w-full pl-12"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(['all', 'online', 'away', 'offline'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    statusFilter === status
                      ? 'btn-gradient text-white'
                      : ''
                  }`}
                  style={statusFilter !== status ? {
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)'
                  } : {}}
                >
                  {status === 'all' ? 'Todos' : getStatusLabel(status)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold gradient-text">{mockTeamMembers.length}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-emerald-500">{mockTeamMembers.filter(m => m.status === 'online').length}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Online</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-amber-500">{mockTeamMembers.filter(m => m.status === 'away').length}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Ausente</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: 'var(--text-muted)' }}>{mockTeamMembers.filter(m => m.status === 'offline').length}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Offline</p>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => router.push(`/equipe/${member.id}`)}
              className="card p-5 cursor-pointer hover:scale-[1.02] transition-transform"
            >
              {/* Member Header */}
              <div className="flex items-start gap-4">
                {/* Avatar with Status */}
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                    style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
                  >
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      getInitials(member.name)
                    )}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 ${getStatusColor(member.status)}`}
                    style={{ borderColor: 'var(--card-bg)' }}
                  />
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                    {member.name}
                  </h3>
                  <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                    {member.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {getRoleLabel(member.role)}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                      {getStatusLabel(member.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Member Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <ChatIcon className="w-4 h-4" style={{ color: 'var(--primary-start)' }} />
                  </div>
                  <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {member.activeChats}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Ativos</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <CheckIcon className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {member.resolvedToday}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Resolvidos</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <ClockIcon className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {member.avgResponseTime}s
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tempo Resp.</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="card p-12 text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <SearchIcon className="w-8 h-8" style={{ color: 'var(--text-muted)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Nenhum membro encontrado
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Tente ajustar os filtros ou adicione novos membros a equipe.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
