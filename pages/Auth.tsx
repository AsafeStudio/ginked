
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlitchButton } from '../components/GlitchButton';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, AlertTriangle, Mail, Loader2, CheckCircle } from 'lucide-react';
import { LocationState } from '../types';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState;
  const from = state?.from || '/account';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsPending(true);

    try {
      if (isLogin) {
        const { error: loginError } = await login(email, password);
        if (loginError) {
          setError(`ACESSO_NEGADO: ${loginError}`);
        } else {
          navigate(from);
        }
      } else {
        const { error: regError, needsConfirmation } = await register(username, email, password);
        if (regError) {
          setError(`FALHA_PROTOCOLO: ${regError}`);
        } else if (needsConfirmation) {
          setShowConfirmation(true);
        } else {
          navigate(from);
        }
      }
    } catch (err) {
      setError('ERRO_CRÍTICO_DE_CONEXÃO: O terminal não respondeu.');
    } finally {
      setIsPending(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="py-24 container mx-auto px-4 flex justify-center items-center min-h-[70vh]">
        <div className="max-w-md w-full border border-red-600/30 bg-neutral-950 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
          <div className="w-20 h-20 bg-red-600/10 mx-auto flex items-center justify-center text-red-600 mb-8 rounded-full border border-red-600/20">
            <Mail size={40} />
          </div>
          <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">VERIFIQUE_SEU_SINAL</h2>
          <p className="text-gray-400 font-mono text-xs leading-relaxed mb-10 uppercase tracking-widest">
            Um link de ativação foi enviado para <span className="text-white font-bold">{email}</span>. 
            Acesse seu e-mail para autorizar sua entrada na rede GINKED.
          </p>
          <GlitchButton variant="outline" fullWidth onClick={() => setShowConfirmation(false)}>
            VOLTAR_AO_TERMINAL
          </GlitchButton>
        </div>
      </div>
    );
  }

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
          <div className="mb-6 p-4 bg-red-600/10 border border-red-600/50 text-red-500 text-[10px] font-mono flex items-center gap-3">
            <AlertTriangle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">USR_IDENTIDADE</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="COIN_NAME_OU_ALIAS" 
                  className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none transition-colors"
                  required 
                  disabled={isPending}
                />
              </div>
            )}
            
            <div>
              <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">EMAIL_DE_REDE</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="SEU@EMAIL.SYS" 
                className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none transition-colors"
                required 
                disabled={isPending}
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">CHAVE_DE_ACESSO</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none transition-colors"
                required 
                disabled={isPending}
              />
            </div>
          </div>

          <GlitchButton type="submit" fullWidth className="py-5" disabled={isPending}>
            <div className="flex items-center gap-3">
              {isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                isLogin ? <LogIn size={18} /> : <UserPlus size={18} />
              )}
              <span>{isPending ? 'PROCESSANDO...' : (isLogin ? 'EXECUTAR_LOGIN' : 'SOLICITAR_ACESSO')}</span>
            </div>
          </GlitchButton>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-600 font-mono leading-relaxed uppercase">
            Acesso criptografado via Supabase Auth Protocol. <br />
            {isLogin ? 'Esqueceu sua chave? Tente o suporte.' : 'Certifique-se de usar um email válido para confirmação.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
