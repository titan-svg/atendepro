'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  LogoIcon,
  DashboardIcon,
  ChatIcon,
  TeamIcon,
  ContactsIcon,
  ReportsIcon,
  SettingsIcon,
  LogoutIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
} from './Icons';
import { useState } from 'react';

const menuItems = [
  { href: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
  { href: '/conversas', icon: ChatIcon, label: 'Conversas' },
  { href: '/equipe', icon: TeamIcon, label: 'Equipe' },
  { href: '/contatos', icon: ContactsIcon, label: 'Contatos' },
  { href: '/relatorios', icon: ReportsIcon, label: 'Relatórios' },
  { href: '/configuracoes', icon: SettingsIcon, label: 'Configurações' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, updateStatus } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'away': return 'status-away';
      case 'offline': return 'status-offline';
      default: return 'status-offline';
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-4"
        style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-3">
          <LogoIcon className="w-8 h-8" />
          <span className="font-bold gradient-text text-lg">AtendePro</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
          >
            {isOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <LogoIcon className="w-10 h-10" />
          <span className="font-bold gradient-text text-xl">AtendePro</span>
        </div>

        {/* User Profile */}
        {user && (
          <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-white font-semibold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 ${getStatusClass(user.status)}`}
                  style={{ borderColor: 'var(--bg-secondary)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{user.company}</p>
              </div>
            </div>
            {/* Status Selector */}
            <div className="mt-3 flex gap-2">
              {(['online', 'away', 'offline'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    user.status === status
                      ? `ring-2 ring-offset-1 ${status === 'online' ? 'ring-emerald-500' : status === 'away' ? 'ring-amber-500' : 'ring-gray-500'}`
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {status === 'online' ? 'Online' : status === 'away' ? 'Ausente' : 'Offline'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'btn-gradient text-white shadow-lg'
                      : 'hover:bg-[var(--bg-tertiary)]'
                  }`}
                  style={!isActive ? { color: 'var(--text-secondary)' } : {}}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden lg:flex w-full items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors hover:bg-[var(--bg-tertiary)]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            <span className="font-medium">{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-red-500/10 text-red-500"
          >
            <LogoutIcon className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
