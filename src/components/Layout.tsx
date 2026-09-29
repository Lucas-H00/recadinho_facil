import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pastel-pink/30">
        <div className="max-w-lg mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-warm-text text-center">
            📝 RecadinhoFácil
          </h1>
          <p className="text-xs text-warm-text-light text-center mt-0.5">
            Recados carinhosos para os papais
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-pastel-pink/20">
        <div className="max-w-lg mx-auto flex">
          <Link
            to="/"
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'text-warm-text border-b-2 border-pastel-pink bg-pastel-pink-light/30'
                : 'text-warm-text-light hover:text-warm-text hover:bg-pastel-pink-light/20'
            }`}
          >
            📋 Recado do Dia
          </Link>
          <Link
            to="/alunos"
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              location.pathname === '/alunos'
                ? 'text-warm-text border-b-2 border-pastel-lavender bg-pastel-lavender-light/30'
                : 'text-warm-text-light hover:text-warm-text hover:bg-pastel-lavender-light/20'
            }`}
          >
            👦 Alunos
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-4 pb-8">
        {children}
      </main>
    </div>
  );
}
