import React, { useState, useMemo } from 'react';
// Fix: Standardization of react-router-dom imports
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Category } from '../types';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'NEW' | 'PRICE_LOW' | 'PRICE_HIGH'>('NEW');

  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'ALL' 
      ? [...PRODUCTS] 
      : PRODUCTS.filter(p => p.category === activeCategory);
    
    if (sortBy === 'PRICE_LOW') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'PRICE_HIGH') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="pt-12 pb-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs & Header */}
        <div className="mb-12">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-4">root / arquivo / catalogo</span>
          <h1 className="text-6xl font-black tracking-tighter">O_ARQUIVO</h1>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-y border-white/10 py-6">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2 text-xs font-bold tracking-widest border transition-all ${activeCategory === 'ALL' ? 'bg-white text-black border-white' : 'border-white/10 text-gray-500 hover:border-white/40'}`}
            >
              TODAS_UNIDADES
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold tracking-widest border transition-all ${activeCategory === cat ? 'bg-red-600 text-white border-red-600' : 'border-white/10 text-gray-500 hover:border-white/40'}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-grow md:flex-grow-0 flex items-center gap-2 border border-white/10 px-4 py-2">
              <span className="text-[10px] font-mono text-gray-500">ORDEM:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold focus:outline-none appearance-none cursor-pointer pr-4"
              >
                <option value="NEW" className="bg-black text-white">RECENTE</option>
                <option value="PRICE_LOW" className="bg-black text-white">MENOR_PREÇO</option>
                <option value="PRICE_HIGH" className="bg-black text-white">MAIOR_PREÇO</option>
              </select>
            </div>
            <div className="border border-white/10 p-2.5 hover:bg-white hover:text-black transition-colors cursor-pointer">
              <SlidersHorizontal size={16} />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 group-hover:border-red-600/40 transition-all duration-500">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black/80 backdrop-blur px-2 py-1 text-[9px] font-mono border border-white/10">#{product.id.padStart(4, '0')}</span>
                </div>
                {/* Visual Glitch Elements */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                   <div className="absolute top-1/4 left-0 w-full h-[1px] bg-red-600/30 animate-pulse"></div>
                   <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black tracking-tight mb-1 group-hover:text-red-500 transition-colors uppercase">{product.name}</h3>
                  <span className="text-[10px] font-mono text-gray-500 tracking-widest">{product.category}</span>
                </div>
                <p className="font-mono text-lg font-bold text-white group-hover:text-red-500 transition-colors">R$ {product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center border border-dashed border-white/10">
            <p className="text-gray-500 font-mono">ERRO: NENHUM_ATIVO_ENCONTRADO_NESTE_SETOR</p>
            <button 
              onClick={() => setActiveCategory('ALL')}
              className="mt-4 text-red-600 font-bold underline"
            >
              RESETAR_BUSCA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;