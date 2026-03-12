'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { ReportsIcon, TeamIcon, ClockIcon, ChatIcon, StarIcon } from '@/components/Icons';
import { mockDashboardStats, mockChartData, mockTeamMembers } from '@/lib/data';

export default function RelatoriosPage() {
  const [dateRange, setDateRange] = useState({
    start: '2026-03-06',
    end: '2026-03-12',
  });

  // Calculate stats
  const totalConversations = mockChartData.reduce((sum, day) => sum + day.conversations, 0);
  const totalResolved = mockChartData.reduce((sum, day) => sum + day.resolved, 0);
  const resolutionRate = Math.round((totalResolved / totalConversations) * 100);
  const avgResponseTime = mockDashboardStats.avgResponseTime;
  const customerSatisfaction = 4.7;

  const maxConversations = Math.max(...mockChartData.map(d => d.conversations));

  const handleExport = () => {
    alert('Exportando relatorio em PDF...');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold gradient-text">Relatorios</h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              Analise o desempenho do seu atendimento
            </p>
          </div>

          <button
            onClick={handleExport}
            className="btn-gradient ripple px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 justify-center"
          >
            <ReportsIcon className="w-5 h-5" />
            Exportar Relatorio
          </button>
        </div>

        {/* Date Range Selector */}
        <div className="card p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Periodo:</span>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="input-material"
              />
              <span style={{ color: 'var(--text-muted)' }}>ate</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="input-material"
              />
            </div>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Conversations */}
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
              >
                <ChatIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total de Conversas</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{totalConversations}</p>
              </div>
            </div>
          </div>

          {/* Resolution Rate */}
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Taxa de Resolucao</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{resolutionRate}%</p>
              </div>
            </div>
          </div>

          {/* Average Response Time */}
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}
              >
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Tempo Medio de Resposta</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{avgResponseTime}s</p>
              </div>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--secondary-start), var(--secondary-end))' }}
              >
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Satisfacao do Cliente</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{customerSatisfaction}</p>
                  <span style={{ color: 'var(--text-muted)' }}>/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Conversations Chart */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              Conversas da Semana
            </h2>
            <div className="space-y-4">
              {mockChartData.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-secondary)' }}>{day.day}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{day.conversations} conversas</span>
                  </div>
                  <div className="h-3 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(day.conversations / maxConversations) * 100}%`,
                        background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
                      }}
                    />
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(day.resolved / day.conversations) * 100}%`,
                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }} />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Resolvidas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Performance */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              Desempenho da Equipe
            </h2>
            <div className="space-y-4">
              {mockTeamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-3 rounded-xl transition-colors"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                        member.status === 'online' ? 'status-online' :
                        member.status === 'away' ? 'status-away' : 'status-offline'
                      }`}
                      style={{ borderColor: 'var(--card-bg)' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                      {member.name}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {member.resolvedToday} resolvidas hoje
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: 'var(--primary-start)' }}>
                      {member.avgResponseTime}s
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>tempo medio</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Resumo do Periodo
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
              <p className="text-3xl font-bold gradient-text">{totalConversations}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Conversas</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
              <p className="text-3xl font-bold" style={{ color: '#10b981' }}>{totalResolved}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Resolvidas</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
              <p className="text-3xl font-bold" style={{ color: '#f59e0b' }}>{mockTeamMembers.filter(m => m.status === 'online').length}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Online Agora</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--secondary-start)' }}>
                {mockTeamMembers.reduce((sum, m) => sum + m.resolvedToday, 0)}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Resolvidas Hoje</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
