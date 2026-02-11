
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlitchButton } from '../components/GlitchButton';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, CreditCard } from 'lucide-react';

const Checkout: React.FC = () => {
  const { totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Segurança adicional: se chegar aqui sem login, volta pro login
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [user, navigate]);

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    alert('TRANSAÇÃO_AUTORIZADA. Bem-vindo ao coletivo.');
    clearCart();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="py-24 container mx-auto px-4 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter uppercase mb-4">AUTORIZAR_PAGAMENTO</h1>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Estágio final de aquisição segura</p>
      </div>

      <form onSubmit={handleComplete} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          {/* Identity */}
          <section>
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase">
              <span className="text-red-600 font-mono">01.</span> Protocolo_Identidade
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input type="email" placeholder="ENDEREÇO_DE_EMAIL" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" defaultValue={user.email} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="PRIMEIRO_NOME" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" defaultValue={user.username} required />
                <input type="text" placeholder="SOBRENOME" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section>
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase">
              <span className="text-red-600 font-mono">02.</span> Nó_de_Distribuição
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input type="text" placeholder="ENDEREÇO_COMPLETO" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="CIDADE" className="col-span-2 w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
                <input type="text" placeholder="CEP" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              </div>
              <input type="text" placeholder="PAÍS" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase">
              <span className="text-red-600 font-mono">03.</span> Transferência_Créditos
            </h2>
            <div className="p-6 border border-white/10 bg-neutral-950 space-y-4">
              <div className="flex items-center gap-4 text-red-600 mb-2">
                <CreditCard size={20} />
                <span className="text-xs font-bold tracking-widest uppercase">Entrada de Cartão Criptografada</span>
              </div>
              <input type="text" placeholder="NÚMERO_DO_CARTÃO" className="w-full bg-black border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/AA" className="w-full bg-black border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
                <input type="text" placeholder="CVV" className="w-full bg-black border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:pl-12">
          <div className="p-8 border border-white/10 bg-neutral-950 sticky top-32">
            <h2 className="text-2xl font-black mb-8 uppercase">Fase de Confirmação</h2>
            <div className="space-y-4 mb-10 text-gray-400 font-medium">
              <div className="flex justify-between">
                <span>Subtotal de Ativos</span>
                <span className="text-white">R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Prioridade de Distribuição</span>
                <span className="text-white">GRÁTIS</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <span className="font-black text-xl">DÉBITO_FINAL</span>
                <span className="font-mono text-4xl font-black text-red-600">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <GlitchButton type="submit" fullWidth className="py-6">
              CONFIRMAR_TRANSAÇÃO
            </GlitchButton>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white/5 border border-white/10 text-red-600">
                  <Lock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase mb-1 tracking-tight">CAMADA_CRIPTOGRAFIA_SSL</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase">Túnel de dados 256-bit ponta-a-ponta</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white/5 border border-white/10 text-red-600">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase mb-1 tracking-tight">DETECÇÃO_FRAUDE_ATIVA</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase">Triagem biométrica comportamental habilitada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
