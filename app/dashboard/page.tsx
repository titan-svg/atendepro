'use client';

import AppLayout from '@/components/AppLayout';
import {
  ChatIcon,
  ClockIcon,
  CheckIcon,
  UsersIcon,
  InboxIcon,
} from '@/components/Icons';
import {
  mockDashboardStats,
  mockConversations,
  mockTeamMembers,
  mockChartData,
  formatTime,
  getStatusColor,
  getStatusLabel,
  getRoleLabel,
} from '@/lib/data';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const conversations = mockConversations;
  const teamMembers = mockTeamMembers;
  const chartData = mockChartData;

  // Calculate chart dimensions
  const maxConversations = Math.max(...chartData.map(d => d.conversations));
  const chartHeight = 160;

  const getStatusColorClass = (status: 'online' | 'away' | 'offline') => {
    switch (status) {
      case 'online': return 'status-online';
      case 'away': return 'status-away';
      case 'offline': return 'status-offline';
    }
  };

  const getMemberStatusLabel = (status: 'online' | 'away' | 'offline') => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Ausente';
      case 'offline': return 'Offline';
    }
  };

  const statsCards = [
    {
      label: 'Total de Conversas',
      value: stats.totalConversations,
      icon: ChatIcon,
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      label: 'Conversas Ativas',
      value: stats.activeConversations,
      icon: InboxIcon,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Aguardando Resposta',
      value: stats.waitingConversations,
      icon: ClockIcon,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Resolvidas Hoje',
      value: stats.resolvedToday,
      icon: CheckIcon,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Tempo Medio de Resposta',
      value: `${stats.avgResponseTime}s`,
      icon: ClockIcon,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      label: 'Equipe Online',
      value: stats.teamOnline,
      icon: UsersIcon,
      gradient: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
            Visao geral do atendimento
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="card p-5 relative overflow-hidden"
            >
              {/* Gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
              />

              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart and Recent Conversations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Chart */}
          <div className="card p-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl" />
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Conversas da Semana
            </h2>

            <div className="flex items-end justify-between gap-2" style={{ height: chartHeight }}>
              {chartData.map((day, index) => {
                const barHeight = (day.conversations / maxConversations) * chartHeight;
                const resolvedHeight = (day.resolved / maxConversations) * chartHeight;

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full flex justify-center gap-1" style={{ height: chartHeight }}>
                      {/* Conversations bar */}
                      <div
                        className="w-4 rounded-t-md bg-gradient-to-t from-indigo-500 to-purple-500 transition-all duration-300"
                        style={{ height: barHeight, marginTop: 'auto' }}
                        title={`Conversas: ${day.conversations}`}
                      />
                      {/* Resolved bar */}
                      <div
                        className="w-4 rounded-t-md bg-gradient-to-t from-emerald-500 to-teal-500 transition-all duration-300"
                        style={{ height: resolvedHeight, marginTop: 'auto' }}
                        title={`Resolvidas: ${day.resolved}`}
                      />
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {day.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-indigo-500 to-purple-500" />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Conversas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-emerald-500 to-teal-500" />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Resolvidas</span>
              </div>
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="card p-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl" />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Conversas Recentes
              </h2>
              <Link
                href="/conversas"
                className="text-sm font-medium hover:underline"
                style={{ color: 'var(--primary-start)' }}
              >
                Ver todas
              </Link>
            </div>

            <div className="space-y-3">
              {conversations.slice(0, 4).map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/conversas/${conversation.id}`}
                  className="block p-3 rounded-xl transition-colors hover:bg-opacity-50"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                        style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
                      >
                        {conversation.contact.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                          {conversation.contact.name}
                        </p>
                        <p className="text-xs truncate max-w-[180px]" style={{ color: 'var(--text-secondary)' }}>
                          {conversation.messages[conversation.messages.length - 1]?.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {formatTime(conversation.lastMessageAt)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(conversation.status)}`}
                      >
                        {getStatusLabel(conversation.status)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Team Status */}
        <div className="card p-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-t-2xl" />
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Status da Equipe
            </h2>
            <Link
              href="/equipe"
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--primary-start)' }}
            >
              Gerenciar equipe
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-xl flex flex-col items-center text-center"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                    style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 ${getStatusColorClass(member.status)}`}
                    style={{ borderColor: 'var(--bg-secondary)' }}
                  />
                </div>
                <p className="font-medium text-sm mt-3" style={{ color: 'var(--text-primary)' }}>
                  {member.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {getRoleLabel(member.role)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span
                    className={`w-2 h-2 rounded-full ${getStatusColorClass(member.status)}`}
                  />
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {getMemberStatusLabel(member.status)}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span>{member.activeChats} ativos</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--border-color)' }} />
                  <span>{member.resolvedToday} resolvidos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
