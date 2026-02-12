import React, { useEffect } from 'react';
// Fix: Standardization of react-router-dom hook import
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlitchButton } from '../components/GlitchButton';
import { Shield, Package, Settings, LogOut, Clock } from 'lucide-react';

const Account: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="py-24 container mx-auto px-4 max-w-6xl">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] block mb-2">Sessão Ativa</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">USR_{user.username}</h1>
        </div>
        <GlitchButton variant="outline" onClick={() => { logout(); navigate('/'); }}>
          <div className="flex items-center gap-2">
            <LogOut size={16} />
            <span>ENCERRAR_SESSÃO</span>
          </div>
        </GlitchButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="p-8 border border-white/10 bg-neutral-950">
            <h3 className="text-sm font-bold tracking-widest text-red-600 mb-6 uppercase">Status do Perfil</h3>
            <div className="space-y-4 font-mono text-xs uppercase">
              <div className="flex justify-between border-b border-white/5 py-3">
                <span className="text-gray-600">Identificador</span>
                <span className="text-white">{user.username}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-3">
                <span className="text-gray-600">Rede</span>
                <span className="text-white">Global_Mesh</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-3">
                <span className="text-gray-600">Nível</span>
                <span className="text-white">PROTO_AGENT</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Email</span>
                <span className="text-white truncate max-w-[150px]">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="p-8 border border-white/10 bg-neutral-950 flex flex-col gap-4">
            <button className="flex items-center gap-4 text-xs font-bold tracking-widest text-gray-400 hover:text-red-500 transition-colors uppercase">
              <Settings size={18} />
              Configurações de Protocolo
            </button>
            <button className="flex items-center gap-4 text-xs font-bold tracking-widest text-gray-400 hover:text-red-500 transition-colors uppercase">
              <Shield size={18} />
              Segurança e Chaves
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <Package size={24} className="text-red-600" />
              <h2 className="text-2xl font-black uppercase">Ordens_Recentes</h2>
            </div>
            
            <div className="space-y-4">
              {/* Mock Order */}
              <div className="p-6 border border-white/5 bg-neutral-950 group hover:border-red-600/30 transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-gray-600 uppercase">Hash: 0x98A1...F2D</span>
                    <h4 className="font-bold tracking-wider uppercase">Protocolo_Neon_Ghost</h4>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-green-500 font-mono text-[10px] uppercase">Processado</span>
                    <span className="font-mono font-bold">R$ 189,90</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
                  <Clock size={12} />
                  <span>Sincronizado há 2 ciclos terrestres</span>
                </div>
              </div>

              <div className="py-12 text-center border border-dashed border-white/10 opacity-40">
                <p className="text-xs font-mono uppercase">Fim da lista de carga</p>
              </div>
            </div>
          </section>

          <section className="p-12 bg-red-600/5 border border-red-600/10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <h3 className="text-xl font-black mb-4 uppercase">Acesso Prioritário_G</h3>
            <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">Sua conta GINKED garante acesso antecipado aos próximos DROPS_DO_SISTEMA.</p>
            <GlitchButton onClick={() => navigate('/shop')}>VER_PRÓXIMO_LOTE</GlitchButton>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Account;