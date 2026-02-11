
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlitchButton } from '../components/GlitchButton';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, AlertTriangle } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Obtém a página de origem caso o usuário tenha sido redirecionado
  const from = (location.state as any)?.from || '/account';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(username, password);
      if (success) {
        navigate(from);
      } else {
        setError('ACESSO_NEGADO: Credenciais inválidas.');
      }
    } else {
      register(username, email);
      navigate(from);
    }
  };

  return (
    <div className="py-24 container mx-auto px-4 flex justify-center items-center min-h-[70vh]">
      <div className="max-w-md w-full border border-white/10 bg-neutral-950 p-8 relative">
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        
        <div className="flex mb-8 border-b border-white/10">
          <button 
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-4 text-xs font-black tracking-widest transition-colors ${isLogin ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-white'}`}
          >
            ENTRAR
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-4 text-xs font-black tracking-widest transition-colors ${!isLogin ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-white'}`}
          >
            REGISTRAR
          </button>
        </div>

        <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">
          {isLogin ? 'Acesso_Membro' : 'Criar_Identidade'}
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-600/10 border border-red-600/50 text-red-500 text-xs font-mono flex items-center gap-3 animate-pulse">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">USR_IDENTIDADE</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="NOME_DE_USUARIO" 
                className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none transition-colors"
                required 
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">EMAIL</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENDERECO_DE_EMAIL" 
                  className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none transition-colors"
                  required 
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">SENHA</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none transition-colors"
                required 
              />
            </div>
          </div>

          <GlitchButton type="submit" fullWidth className="py-5">
            <div className="flex items-center gap-3">
              {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
              <span>{isLogin ? 'EXECUTAR_LOGIN' : 'FINALIZAR_CADASTRO'}</span>
            </div>
          </GlitchButton>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-600 font-mono leading-relaxed uppercase">
            Acesso restrito a membros do coletivo GINKED. <br />
            {isLogin ? 'Login: teste | Senha: teste1' : 'Seus dados estarão protegidos.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
