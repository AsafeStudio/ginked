import React, { useEffect, useState } from 'react';
// Fix: Standardization of react-router-dom hooks import
import { useNavigate } from 'react-router-dom';
import { GlitchButton } from '../components/GlitchButton';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, CreditCard, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Redireciona se não estiver logado
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    // Redireciona se o carrinho estiver vazio (e não estiver na tela de sucesso)
    if (cart.length === 0 && !isSuccess) {
      navigate('/cart');
    }
  }, [user, cart.length, navigate, isSuccess]);

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    
    // Simulação de processamento de gateway de pagamento
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Limpa o carrinho IMEDIATAMENTE após o sucesso para evitar re-submissão
    clearCart();
    
    // Redireciona após 4 segundos para a home
    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  // Previne renderização flash de formulário vazio
  if (!user || (cart.length === 0 && !isSuccess)) return null;

  if (isSuccess) {
    return (
      <div className="py-48 container mx-auto px-4 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-green-500/10 mx-auto flex items-center justify-center text-green-500 mb-8 rounded-full border border-green-500/30 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">ORDEM_PROCESSADA</h1>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest max-w-sm mx-auto mb-8">
          Sua carga foi autorizada. O sinal de rastreamento será enviado para {user.email} em breve.
        </p>
        <div className="flex justify-center items-center gap-3 text-red-600 font-mono text-[10px] animate-pulse">
          <Loader2 size={14} className="animate-spin" />
          <span>REDIRECIONANDO_AO_TERMINAL...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 container mx-auto px-4 max-w-6xl">
      <div className="mb-12">
        <button 
          onClick={() => navigate('/cart')} 
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-bold tracking-widest uppercase mb-6"
        >
          <ArrowLeft size={14} /> Voltar ao Carrinho
        </button>
        <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">AUTORIZAR_PAGAMENTO</h1>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Estágio final de aquisição segura v.1.0</p>
      </div>

      <form onSubmit={handleComplete} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          {/* Section 01 */}
          <section>
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase">
              <span className="text-red-600 font-mono">01.</span> Identidade_Agente
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/5 border border-white/10 p-4 font-mono text-sm opacity-60">
                <span className="text-[10px] text-gray-500 block mb-1 uppercase">Email Conectado</span>
                {user.email}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="NOME" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" defaultValue={user.username} required />
                <input type="text" placeholder="SOBRENOME" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              </div>
            </div>
          </section>

          {/* Section 02 */}
          <section>
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase">
              <span className="text-red-600 font-mono">02.</span> Coordenadas_Entrega
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <input type="text" placeholder="ENDEREÇO_DA_RUA" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="CIDADE" className="col-span-2 w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
                <input type="text" placeholder="CEP" className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              </div>
            </div>
          </section>

          {/* Section 03 */}
          <section>
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase">
              <span className="text-red-600 font-mono">03.</span> Gateway_Cripto
            </h2>
            <div className="p-6 border border-white/10 bg-neutral-950 space-y-4">
              <div className="flex items-center gap-4 text-red-600 mb-2">
                <CreditCard size={20} />
                <span className="text-xs font-bold tracking-widest uppercase">Cartão de Crédito</span>
              </div>
              <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/AA" className="w-full bg-black border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
                <input type="text" placeholder="CVV" className="w-full bg-black border border-white/10 p-4 font-mono text-sm focus:border-red-600 focus:outline-none" required />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:pl-12">
          <div className="p-8 border border-white/10 bg-neutral-950 sticky top-32">
            <h2 className="text-2xl font-black mb-8 uppercase">Resumo da Carga</h2>
            
            <div className="space-y-4 mb-10 border-b border-white/10 pb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-xs">
                  <div className="flex gap-4 items-center">
                    <span className="bg-white/5 px-2 py-1 font-mono text-gray-500">x{item.quantity}</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-300 uppercase truncate max-w-[140px]">{item.name}</span>
                      <span className="text-[9px] text-gray-600">TAM: {item.size}</span>
                    </div>
                  </div>
                  <span className="font-mono text-gray-400">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-10 text-gray-400 font-medium">
              <div className="flex justify-between text-sm">
                <span>Subtotal de Ativos</span>
                <span className="text-white">R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frete Seguro</span>
                <span className="text-white">GRÁTIS</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <span className="font-black text-xl">TOTAL_FINAL</span>
                <span className="font-mono text-4xl font-black text-red-600">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <GlitchButton 
              type="submit" 
              fullWidth 
              className="py-6" 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" size={18} />
                  <span>PROCESSANDO_GATEWAY...</span>
                </div>
              ) : 'CONFIRMAR_AQUISIÇÃO'}
            </GlitchButton>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Lock size={16} className="text-red-600" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">AES-256 SSL</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={16} className="text-red-600" />
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">FRAUD_PROTECT_V2</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;