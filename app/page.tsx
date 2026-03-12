'use client';

import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import {
  LogoIcon,
  WhatsAppIcon,
  SunIcon,
  MoonIcon,
  ChatIcon,
  TeamIcon,
  BoltIcon,
  ShieldIcon,
  CheckIcon,
} from '@/components/Icons';

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: ChatIcon,
      title: '+100 Conversas Simultâneas',
      description: 'Gerencie centenas de conversas ao mesmo tempo com nossa plataforma otimizada para alto volume.',
    },
    {
      icon: TeamIcon,
      title: 'Múltiplos Atendentes',
      description: 'Distribua atendimentos entre sua equipe de forma inteligente e equilibrada.',
    },
    {
      icon: BoltIcon,
      title: 'Integração com API',
      description: 'Conecte-se facilmente à API oficial do WhatsApp Business para máxima confiabilidade.',
    },
    {
      icon: ShieldIcon,
      title: 'Segurança Total',
      description: 'Seus dados e conversas protegidos com criptografia de ponta a ponta.',
    },
  ];

  const benefits = [
    'Atendimento 24/7 automatizado',
    'Relatórios detalhados em tempo real',
    'Filas de atendimento personalizáveis',
    'Transferência entre atendentes',
    'Mensagens rápidas e templates',
    'Integração com CRM',
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Bubble Background */}
      <div className="bubble-bg">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      {/* Header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-color)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="container-landing">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '72px',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LogoIcon className="w-10 h-10" />
              <span
                className="gradient-text"
                style={{ fontSize: '24px', fontWeight: 700 }}
              >
                AtendePro
              </span>
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <button
                onClick={toggleTheme}
                style={{
                  padding: '10px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'background-color 0.2s ease',
                }}
              >
                {theme === 'light' ? (
                  <MoonIcon className="w-5 h-5" />
                ) : (
                  <SunIcon className="w-5 h-5" />
                )}
              </button>
              <Link
                href="/login"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '14px',
                  transition: 'color 0.2s ease',
                }}
              >
                Entrar
              </Link>
              <Link
                href="/registro"
                className="btn-gradient ripple"
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Criar Conta
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '80px',
          textAlign: 'center',
        }}
      >
        <div className="container-landing">
          <div
            className="animate-slide-up"
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '100px',
                backgroundColor: 'var(--bg-secondary)',
                marginBottom: '24px',
              }}
            >
              <WhatsAppIcon className="w-5 h-5" style={{ color: '#25D366' }} />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                }}
              >
                Plataforma Oficial WhatsApp Business API
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '24px',
              }}
            >
              Transforme seu atendimento com{' '}
              <span className="gradient-text">AtendePro</span>
            </h1>

            <p
              style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '40px',
                maxWidth: '600px',
                margin: '0 auto 40px',
              }}
            >
              A plataforma multi-atendente mais completa do Brasil. Gerencie
              todas as conversas do WhatsApp da sua empresa em um só lugar.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/registro"
                className="btn-gradient ripple"
                style={{
                  padding: '16px 40px',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '16px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Começar Gratuitamente
              </Link>
              <Link
                href="/login"
                style={{
                  padding: '16px 40px',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '16px',
                  textDecoration: 'none',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '2px solid var(--border-color)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
              >
                Já tenho conta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-landing">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 700,
                marginBottom: '16px',
                color: 'var(--text-primary)',
              }}
            >
              Recursos <span className="gradient-text">Poderosos</span>
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                maxWidth: '500px',
                margin: '0 auto',
              }}
            >
              Tudo que você precisa para revolucionar o atendimento da sua
              empresa
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="card"
                style={{
                  padding: '32px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background:
                      'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: 'white' }} />
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        style={{
          padding: '80px 0',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div className="container-landing">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '60px',
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  marginBottom: '24px',
                  color: 'var(--text-primary)',
                }}
              >
                Por que escolher o{' '}
                <span className="gradient-text">AtendePro</span>?
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                }}
              >
                Somos a escolha de mais de 5.000 empresas que confiam em nossa
                plataforma para gerenciar milhões de conversas todos os meses.
              </p>
              <Link
                href="/registro"
                className="btn-gradient ripple"
                style={{
                  padding: '14px 32px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '15px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Testar Grátis por 14 Dias
              </Link>
            </div>

            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                }}
              >
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      backgroundColor: 'var(--card-bg)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background:
                          'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <CheckIcon className="w-4 h-4" style={{ color: 'white' }} />
                    </div>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container-landing">
          <div
            className="card"
            style={{
              padding: '60px 40px',
              textAlign: 'center',
              background:
                'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
            }}
          >
            <h2
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px',
              }}
            >
              Pronto para transformar seu atendimento?
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '32px',
                maxWidth: '500px',
                margin: '0 auto 32px',
              }}
            >
              Junte-se a milhares de empresas que já revolucionaram sua
              comunicação com clientes.
            </p>
            <Link
              href="/registro"
              style={{
                padding: '16px 48px',
                borderRadius: '14px',
                fontWeight: 600,
                fontSize: '16px',
                textDecoration: 'none',
                backgroundColor: 'white',
                color: 'var(--primary-start)',
                display: 'inline-block',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              Criar Conta Gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '40px 0',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div className="container-landing">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LogoIcon className="w-8 h-8" />
              <span
                className="gradient-text"
                style={{ fontSize: '20px', fontWeight: 700 }}
              >
                AtendePro
              </span>
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
              }}
            >
              2026 AtendePro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
