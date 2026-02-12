import React from 'react';
// Fix: Standardizing named imports from react-router-dom
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { GlitchButton } from '../components/GlitchButton';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    if (!user) {
      // Redireciona para login, passando a informação de que deve voltar para o checkout depois
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-48 container mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-white/5 mx-auto flex items-center justify-center text-gray-700 mb-8 rounded-full border border-white/10">
          <Trash2 size={40} />
        </div>
        <h1 className="text-4xl font-black mb-6">CARGA_VAZIA</h1>
        <p className="text-gray-500 mb-10 max-w-sm mx-auto">Parece que você não selecionou nenhum item. Volte para se equipar.</p>
        <GlitchButton onClick={() => navigate('/shop')}>IR_AO_CATÁLOGO</GlitchButton>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-5xl font-black tracking-tighter uppercase">RESUMO_DA_CARGA</h1>
          <Link to="/shop" className="text-gray-500 hover:text-white flex items-center gap-2 font-bold text-xs tracking-widest transition-colors">
            <ArrowLeft size={16} />
            VOLTAR_A_LOJA
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex flex-col sm:flex-row gap-6 p-6 border border-white/5 bg-neutral-950 group hover:border-white/20 transition-all">
                <div className="w-full sm:w-32 aspect-[3/4] overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-black tracking-tight group-hover:text-red-500 transition-colors uppercase">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-4">
                      <span>TAM: {item.size}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                      <span>ID: {item.id.padStart(4, '0')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-white/10 px-2 py-1 bg-black">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-mono text-lg font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="p-8 border border-white/10 bg-neutral-950 sticky top-32">
              <h2 className="text-2xl font-black mb-8 border-b border-white/10 pb-4 uppercase">Resumo</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Subtotal ({totalItems} unidades)</span>
                  <span className="text-white">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Frete Padrão</span>
                  <span className="text-white">R$ 0,00</span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Proteção Urbana</span>
                  <span className="text-green-500">GRÁTIS</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="font-black text-lg">TOTAL_FINAL</span>
                  <span className="font-mono text-3xl font-black text-red-600">R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <GlitchButton fullWidth className="py-5" onClick={handleCheckoutClick}>
                FINALIZAR_PEDIDO
              </GlitchButton>
              
              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-mono text-gray-600 uppercase">
                  <Shield size={14} className="text-green-600" />
                  <span>Transmissão Segura Ativa</span>
                </div>
                <p className="text-[10px] text-gray-600 font-mono leading-tight uppercase">Ao prosseguir, você autoriza o processamento seguro dos seus dados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;