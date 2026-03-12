'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoIcon, WhatsAppIcon } from '@/components/Icons';

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store user data (mock registration)
      const userData = {
        id: '1',
        name: formData.name,
        email: formData.email,
        role: 'admin',
        company: formData.company,
        status: 'online',
      };
      localStorage.setItem('atendepro_user', JSON.stringify(userData));

      router.push('/dashboard');
    } catch {
      setError('Ocorreu um erro ao criar sua conta');
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
          maxWidth: '480px',
          padding: '40px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <LogoIcon className="w-14 h-14" style={{ marginBottom: '12px' }} />
          <h1
            className="gradient-text"
            style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Criar Conta
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
              Comece grátis por 14 dias
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Nome completo
              </label>
              <input
                type="text"
                name="name"
                className="input-material"
                placeholder="João Silva"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
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
                name="email"
                className="input-material"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Empresa
              </label>
              <input
                type="text"
                name="company"
                className="input-material"
                placeholder="Sua Empresa Ltda"
                value={formData.company}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                className="input-material"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div>
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
                name="password"
                className="input-material"
                placeholder="Min. 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Confirmar senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="input-material"
                placeholder="Repita a senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>
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
            {isLoading ? 'Criando conta...' : 'Criar Conta Grátis'}
          </button>

          <p
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginTop: '16px',
              lineHeight: 1.5,
            }}
          >
            Ao criar uma conta, você concorda com nossos{' '}
            <Link
              href="#"
              style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}
            >
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link
              href="#"
              style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </form>

        {/* Link to Login */}
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
            Já tem uma conta?{' '}
          </span>
          <Link
            href="/login"
            className="gradient-text"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
}
