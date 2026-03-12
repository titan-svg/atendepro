'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { useTheme } from '@/context/ThemeContext';
import { SettingsIcon, WhatsAppIcon, SunIcon, MoonIcon, ClockIcon } from '@/components/Icons';

export default function ConfiguracoesPage() {
  const { theme, setTheme } = useTheme();

  // WhatsApp Business API Settings
  const [whatsappSettings, setWhatsappSettings] = useState({
    phoneNumber: '+55 11 99999-9999',
    apiKey: '••••••••••••••••••••••••',
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    newMessage: true,
    newConversation: true,
    assignedToMe: true,
    mentionedInChat: true,
    dailyReport: false,
    weeklyReport: true,
    soundEnabled: true,
  });

  // Business Hours
  const [businessHours, setBusinessHours] = useState({
    enabled: true,
    start: '08:00',
    end: '18:00',
    daysOfWeek: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
  });

  // Auto-response Settings
  const [autoResponse, setAutoResponse] = useState({
    enabled: true,
    outsideHours: 'Obrigado pelo contato! Nosso horario de atendimento e de segunda a sexta, das 8h as 18h. Retornaremos assim que possivel.',
    busyMessage: 'Todos os nossos atendentes estao ocupados no momento. Por favor, aguarde que em breve voce sera atendido.',
    welcomeMessage: 'Ola! Bem-vindo ao nosso atendimento. Como posso ajudar?',
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert('Configuracoes salvas com sucesso!');
  };

  const toggleDay = (day: string) => {
    setBusinessHours(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day],
    }));
  };

  const allDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold gradient-text">Configuracoes</h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
              Gerencie as configuracoes do seu atendimento
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-gradient ripple px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 justify-center disabled:opacity-70"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <SettingsIcon className="w-5 h-5" />
                Salvar Alteracoes
              </>
            )}
          </button>
        </div>

        {/* WhatsApp Business API Settings */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                WhatsApp Business API
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Configure sua conexao com a API do WhatsApp
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Numero de Telefone
              </label>
              <input
                type="text"
                value={whatsappSettings.phoneNumber}
                onChange={(e) => setWhatsappSettings({ ...whatsappSettings, phoneNumber: e.target.value })}
                className="input-material w-full"
                placeholder="+55 11 99999-9999"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Chave da API
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={whatsappSettings.apiKey}
                  onChange={(e) => setWhatsappSettings({ ...whatsappSettings, apiKey: e.target.value })}
                  className="input-material w-full pr-20"
                  placeholder="Sua chave da API"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium"
                  style={{ color: 'var(--primary-start)' }}
                >
                  {showApiKey ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))' }}
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Notificacoes
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Escolha quais notificacoes deseja receber
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { key: 'newMessage', label: 'Nova mensagem recebida' },
              { key: 'newConversation', label: 'Nova conversa iniciada' },
              { key: 'assignedToMe', label: 'Conversa atribuida a mim' },
              { key: 'mentionedInChat', label: 'Mencionado em conversa' },
              { key: 'dailyReport', label: 'Relatorio diario por email' },
              { key: 'weeklyReport', label: 'Relatorio semanal por email' },
              { key: 'soundEnabled', label: 'Som de notificacao' },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <span style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications]
                      ? ''
                      : ''
                  }`}
                  style={{
                    background: notifications[item.key as keyof typeof notifications]
                      ? 'linear-gradient(135deg, var(--primary-start), var(--primary-end))'
                      : 'var(--bg-tertiary)',
                  }}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications[item.key as keyof typeof notifications] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Business Hours */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}
            >
              <ClockIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Horario de Funcionamento
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Configure o horario de atendimento
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>Ativar horario de funcionamento</span>
              <button
                onClick={() => setBusinessHours({ ...businessHours, enabled: !businessHours.enabled })}
                className="relative w-12 h-6 rounded-full transition-colors"
                style={{
                  background: businessHours.enabled
                    ? 'linear-gradient(135deg, var(--primary-start), var(--primary-end))'
                    : 'var(--bg-tertiary)',
                }}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    businessHours.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {businessHours.enabled && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Horario de Inicio
                    </label>
                    <input
                      type="time"
                      value={businessHours.start}
                      onChange={(e) => setBusinessHours({ ...businessHours, start: e.target.value })}
                      className="input-material w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Horario de Termino
                    </label>
                    <input
                      type="time"
                      value={businessHours.end}
                      onChange={(e) => setBusinessHours({ ...businessHours, end: e.target.value })}
                      className="input-material w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Dias de Funcionamento
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allDays.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          businessHours.daysOfWeek.includes(day) ? 'text-white' : ''
                        }`}
                        style={{
                          background: businessHours.daysOfWeek.includes(day)
                            ? 'linear-gradient(135deg, var(--primary-start), var(--primary-end))'
                            : 'var(--bg-tertiary)',
                          color: businessHours.daysOfWeek.includes(day) ? 'white' : 'var(--text-secondary)',
                        }}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Auto-response Settings */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--secondary-start), var(--secondary-end))' }}
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Respostas Automaticas
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Configure mensagens automaticas para seus clientes
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>Ativar respostas automaticas</span>
              <button
                onClick={() => setAutoResponse({ ...autoResponse, enabled: !autoResponse.enabled })}
                className="relative w-12 h-6 rounded-full transition-colors"
                style={{
                  background: autoResponse.enabled
                    ? 'linear-gradient(135deg, var(--primary-start), var(--primary-end))'
                    : 'var(--bg-tertiary)',
                }}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    autoResponse.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {autoResponse.enabled && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Mensagem de Boas-vindas
                  </label>
                  <textarea
                    value={autoResponse.welcomeMessage}
                    onChange={(e) => setAutoResponse({ ...autoResponse, welcomeMessage: e.target.value })}
                    className="input-material w-full min-h-[80px] resize-y"
                    placeholder="Mensagem enviada ao iniciar uma conversa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Mensagem Fora do Horario
                  </label>
                  <textarea
                    value={autoResponse.outsideHours}
                    onChange={(e) => setAutoResponse({ ...autoResponse, outsideHours: e.target.value })}
                    className="input-material w-full min-h-[80px] resize-y"
                    placeholder="Mensagem enviada fora do horario de funcionamento"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Mensagem de Espera
                  </label>
                  <textarea
                    value={autoResponse.busyMessage}
                    onChange={(e) => setAutoResponse({ ...autoResponse, busyMessage: e.target.value })}
                    className="input-material w-full min-h-[80px] resize-y"
                    placeholder="Mensagem enviada quando todos atendentes estao ocupados"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Theme Preference */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              {theme === 'light' ? (
                <SunIcon className="w-5 h-5 text-white" />
              ) : (
                <MoonIcon className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Aparencia
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Escolha o tema da interface
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                theme === 'light' ? 'border-transparent' : ''
              }`}
              style={{
                background: theme === 'light'
                  ? 'linear-gradient(135deg, var(--primary-start), var(--primary-end))'
                  : 'var(--bg-secondary)',
                borderColor: theme === 'light' ? 'transparent' : 'var(--border-color)',
                color: theme === 'light' ? 'white' : 'var(--text-primary)',
              }}
            >
              <SunIcon className="w-6 h-6" />
              <span className="font-medium">Claro</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
                theme === 'dark' ? 'border-transparent' : ''
              }`}
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, var(--primary-start), var(--primary-end))'
                  : 'var(--bg-secondary)',
                borderColor: theme === 'dark' ? 'transparent' : 'var(--border-color)',
                color: theme === 'dark' ? 'white' : 'var(--text-primary)',
              }}
            >
              <MoonIcon className="w-6 h-6" />
              <span className="font-medium">Escuro</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
