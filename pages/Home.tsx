import React from 'react';
// Fix: Cleaning up named imports from react-router-dom
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Cpu } from 'lucide-react';
import { GlitchButton } from '../components/GlitchButton';
import { PRODUCTS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1920&auto=format&fit=crop" 
          alt="Street Background" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none uppercase">
            DO <span className="text-red-600">SUBSOLO</span><br />PRA <span className="text-red-600">RUA</span>.
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-xl leading-relaxed mx-auto md:mx-0">
            Criado na rua e moldado pela cultura geek. Peças essenciais do underground, com atitude, identidade e rebeldia.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full sm:w-auto">
            <Link to="/shop" className="w-full sm:w-auto">
              <GlitchButton fullWidth>Ver Coleção</GlitchButton>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <GlitchButton variant="outline" fullWidth>Nosso Manifesto</GlitchButton>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex absolute right-10 bottom-20 flex-col items-end gap-1 font-mono text-[10px] text-red-600/50 uppercase">
        <span>status.unidade: estável</span>
        <span>frequência: ativa</span>
        <span>loc: setor_239A</span>
        <div className="w-40 h-[1px] bg-red-600/20 mt-2"></div>
      </div>
    </section>
  );
};

const FeaturedProducts: React.FC = () => {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div className="w-full md:w-auto text-center md:text-left">
            <span className="text-red-600 font-mono text-xs tracking-[0.4em] block mb-2 uppercase">Lote Atual</span>
            <h2 className="text-4xl font-black">ÚLTIMOS_DROPS</h2>
          </div>
          {/* Link visível apenas no PC */}
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-all group">
            <span className="font-bold tracking-widest text-sm">VER_TUDO</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden mb-6 border border-white/5 group-hover:border-red-600/50 transition-colors">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black to-transparent">
                  <span className="text-white font-bold tracking-[0.2em] text-xs">VISTA_RÁPIDA</span>
                </div>
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono border border-white/10">
                  {product.category}
                </div>
              </div>
              <h3 className="text-lg font-black tracking-tight mb-2 group-hover:text-red-500 transition-colors">{product.name}</h3>
              <p className="font-mono text-red-600 font-bold">R$ {product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>

        {/* Botão visível apenas no Mobile - Adicionado ao final da section */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link to="/shop" className="w-full">
            <GlitchButton fullWidth variant="outline">Ver Tudo</GlitchButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

const BrandPillars: React.FC = () => {
  const pillars = [
    { icon: <Zap />, title: 'CONTROLE_ESSENCIAL', desc: 'Tecidos pesados feitos para sobreviver à cidade e às ruas.' },
    { icon: <Target />, title: 'DROPS_EXCLUSIVOS', desc: 'Apenas edições limitadas. Uma vez que o lote termina, nunca mais retorna.' },
    { icon: <Cpu />, title: 'INFUSÃO_TÉCNICA', desc: 'Funcionalidade urbana e detalhes táticos em cada peça.' }
  ];

  return (
    <section className="py-24 border-y border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((p, i) => (
            <div key={i} className="group p-8 border border-white/5 bg-neutral-950/50 hover:border-red-600/30 transition-all duration-500">
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center mb-6 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                {p.icon}
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tighter">{p.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <BrandPillars />
      
      <section className="py-32 bg-black flex items-center justify-center text-center overflow-hidden relative">
        <div className="absolute text-[20rem] font-black opacity-[0.02] select-none pointer-events-none whitespace-nowrap">
          REBELDES GINKED UNDERGROUND
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            JUNTE-SE À <span className="text-red-600">RESISTÊNCIA.</span><br />RECEBA OS LANÇAMENTOS PRIMEIRO.
          </h2>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="INSERIR_EMAIL" 
                className="flex-grow bg-white/5 border border-white/10 px-6 py-4 font-mono text-sm focus:outline-none focus:border-red-600 transition-colors"
              />
              <GlitchButton>INSCREVER</GlitchButton>
            </div>
            <p className="mt-4 text-[10px] text-gray-600 font-mono">AO SE INSCREVER VOCÊ CONCORDA COM NOSSA POLÍTICA_DE_ACESSO</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;