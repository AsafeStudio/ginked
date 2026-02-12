import React, { useState, useEffect } from 'react';
// Fix: Cleaning up named imports from react-router-dom
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Ruler, ShieldCheck, RefreshCw } from 'lucide-react';
import { PRODUCTS, SIZES } from '../constants';
import { GlitchButton } from '../components/GlitchButton';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [activeTab, setActiveTab] = useState<'DESC' | 'SPEC' | 'SHIP'>('DESC');

  const product = PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="py-48 text-center container mx-auto px-4">
        <h1 className="text-4xl font-black mb-4">404: ATIVO_NÃO_ENCONTRADO</h1>
        <GlitchButton onClick={() => navigate('/shop')}>Voltar ao Arquivo</GlitchButton>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    alert(`${product.name} adicionado ao equipamento!`);
  };

  return (
    <div className="py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-neutral-900 border border-white/5 overflow-hidden group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-neutral-900 border border-white/5 cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                  <img src={`https://picsum.photos/seed/thumb${i}-${product.id}/200/200`} alt="Miniatura" className="w-full h-full object-cover grayscale" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 text-red-600 font-mono text-xs tracking-widest">
                <span>CAT: {product.category}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span>ID: {product.id.padStart(4, '0')}</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4 uppercase">{product.name}</h1>
              <p className="text-3xl font-mono text-white mb-8">R$ {product.price.toFixed(2)}</p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                {product.description}
              </p>
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold tracking-[0.3em] text-gray-400">SELECIONAR_TAMANHO</span>
                <button className="flex items-center gap-2 text-[10px] text-red-600 hover:text-red-500 font-bold uppercase transition-colors">
                  <Ruler size={12} />
                  <span>Guia de Medidas</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {SIZES.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center font-bold border transition-all ${selectedSize === size ? 'bg-white text-black border-white' : 'border-white/10 text-gray-500 hover:border-white/40'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <GlitchButton onClick={handleAddToCart} fullWidth className="sm:flex-1 py-5">
                <div className="flex items-center justify-center gap-3">
                  <ShoppingCart size={20} />
                  <span>INICIALIZAR_ORDEM</span>
                </div>
              </GlitchButton>
              <button className="h-16 w-16 flex items-center justify-center border border-white/10 text-white hover:bg-white hover:text-black transition-all group">
                <Heart size={24} className="group-hover:fill-current" />
              </button>
              <button className="h-16 w-16 flex items-center justify-center border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                <Share2 size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-white/10">
              <div className="flex border-b border-white/10">
                {(['DESC', 'SPEC', 'SHIP'] as const).map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 text-[10px] font-black tracking-[0.2em] transition-colors relative ${activeTab === tab ? 'text-white' : 'text-gray-600'}`}
                  >
                    {tab === 'DESC' ? 'DESCRIÇÃO' : tab === 'SPEC' ? 'ESPECIFICAÇÕES' : 'ENVIO'}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600"></div>}
                  </button>
                ))}
              </div>
              <div className="py-8">
                {activeTab === 'DESC' && (
                  <div className="space-y-4">
                    <p className="text-gray-400 font-medium">Isto não é apenas uma camiseta. É uma declaração de intenções. Projetada para durabilidade e estilo nos ambientes de alto ruído da expansão urbana.</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-red-600"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'SPEC' && (
                  <div className="space-y-4 text-sm font-mono text-gray-400 uppercase">
                    <div className="flex justify-between border-b border-white/5 py-2">
                      <span className="text-gray-600">Tecido</span>
                      <span>100% Algodão 240GSM</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 py-2">
                      <span className="text-gray-600">Caimento</span>
                      <span>Oversized / Boxy</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 py-2">
                      <span className="text-gray-600">Origem</span>
                      <span>Cyber-Zone 9</span>
                    </div>
                  </div>
                )}
                {activeTab === 'SHIP' && (
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <RefreshCw size={24} className="text-red-600 shrink-0" />
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1 uppercase">Despacho Instantâneo</h4>
                        <p className="text-gray-500 text-xs">Pedidos processados em até 24 horas após a descriptografia bem-sucedida.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <ShieldCheck size={24} className="text-red-600 shrink-0" />
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1 uppercase">Criptografia Global</h4>
                        <p className="text-gray-500 text-xs">Entrega mundial segura com protocolos de rastreamento total.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;