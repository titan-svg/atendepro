'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LogoIcon, WhatsAppIcon } from '@/components/Icons';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch {
      setError('Ocorreu um erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Bubble Background */}
      <div className="bubble-bg">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      <div
        className="card animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '48px 40px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <LogoIcon className="w-16 h-16" style={{ marginBottom: '16px' }} />
          <h1
            className="gradient-text"
            style={{
              fontSize: '32px',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            AtendePro
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <WhatsAppIcon className="w-4 h-4" style={{ color: '#25D366' }} />
            <span
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
              }}
            >
              Plataforma Multi-Atendente
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              Email
            </label>
            <input
              type="email"
              className="input-material"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              Senha
            </label>
            <input
              type="password"
              className="input-material"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          {error && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                fontSize: '14px',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-gradient ripple"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Links */}
        <div
          style={{
            marginTop: '32px',
            textAlign: 'center',
          }}
        >
          <Link
            href="#"
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <div
          style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
            }}
          >
            Não tem uma conta?{' '}
          </span>
          <Link
            href="/registro"
            className="gradient-text"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Criar conta grátis
          </Link>
        </div>
      </div>
    </div>
  );
}
