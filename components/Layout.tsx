import React, { useState } from 'react';
// Fix: Standardizing react-router-dom imports
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Twitter, Github, User } from 'lucide-react';
// Fix: Removing .tsx extension from local imports
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'INÍCIO', path: '/' },
    { name: 'LOJA', path: '/shop' },
    { name: 'SOBRE', path: '/about' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tighter glitch-hover">GINKED</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`text-sm font-bold tracking-[0.2em] hover:text-red-500 transition-colors ${location.pathname === item.path ? 'text-red-500' : 'text-gray-400'}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Link to={user ? "/account" : "/login"} className="group relative">
              <User size={24} className={`${user ? 'text-red-600' : 'text-white'} group-hover:text-red-500 transition-colors`} />
              {user && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-black animate-pulse"></span>}
            </Link>

            <Link to="/cart" className="relative group">
              <ShoppingBag size={24} className="text-white group-hover:text-red-500 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10 px-4 py-8 animate-in slide-in-from-top">
          <nav className="flex flex-col gap-6 text-center">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black tracking-widest hover:text-red-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-black mb-6">GINKED</h2>
            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
              Criamos vestuário autêntico para o mundo físico. Nascidos na cultura urbana, criados no underground. GINKED é para aqueles que encontram beleza no ruído e significado nas ruas.
            </p>
            <div className="flex gap-4">
              <button onClick={(e) => e.preventDefault()} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                <Instagram size={18} />
              </button>
              <button onClick={(e) => e.preventDefault()} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                <Twitter size={18} />
              </button>
              <button onClick={(e) => e.preventDefault()} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                <Github size={18} />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold tracking-widest text-red-600 mb-6 uppercase">Navegação</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">Ver Tudo</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Manifesto</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-white transition-colors">Carrinho</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-widest text-red-600 mb-6 uppercase">Suporte</h3>
            <ul className="space-y-4">
              <li><button onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white transition-colors text-left">Envio</button></li>
              <li><button onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white transition-colors text-left">Retornos</button></li>
              <li><button onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white transition-colors text-left">Guia de Tamanhos</button></li>
              <li><button onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white transition-colors text-left">Contato</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
          <p>© 2024 GINKED_DROPS_V.1.0 // TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-6">
            <button onClick={(e) => e.preventDefault()} className="hover:text-white">POLÍTICA_DE_PRIVACIDADE</button>
            <button onClick={(e) => e.preventDefault()} className="hover:text-white">TERMOS_DE_SERVIÇO</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};