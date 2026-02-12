import React from 'react';
// Fix: Standardization of react-router-dom imports
import { useNavigate } from 'react-router-dom';
import { Terminal, Code, Zap, Eye, Binary } from 'lucide-react';
import { GlitchButton } from '../components/GlitchButton';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1 bg-red-600 text-[10px] font-mono font-black mb-8 tracking-[0.3em] uppercase">MANIFESTO_DA_MARCA</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 leading-none">
            GINKED É UM <span className="text-transparent border-t-2 border-b-2 border-white/10 px-2" style={{ WebkitTextStroke: '1px white' }}>GLITCH</span> NO MAINSTREAM.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-xl text-gray-400 leading-relaxed italic">
              "Nascemos do sinal distorcido. Criados no ruído urbano. Ginked não é apenas uma marca, é uma anomalia na moda tradicional."
            </p>
            <div className="text-gray-500 leading-relaxed space-y-4">
              <p>Fundada por um coletivo de mentes inquietas, gamers e artistas de rua, a GINKED foi criada para preencher a lacuna entre os ambientes virtuais que habitamos e o mundo de concreto que ocupamos.</p>
              <p>Cada design é um ponto de conexão. Cada peça é um sinal em uma rede global de pensadores, criadores e rebeldes que se recusam a ser categorizados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy HUD */}
      <section className="bg-neutral-950 border-y border-white/10 py-32 mb-32 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Binary size={800} />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <div className="w-16 h-16 bg-white/5 mx-auto flex items-center justify-center text-red-600 mb-8 rounded-full border border-white/10">
                <Code size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">SINAL_COMO_ARTE</h3>
              <p className="text-gray-500">Encontramos valor estético em distorções visuais, fluxos urbanos e na arquitetura bruta das cidades.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/5 mx-auto flex items-center justify-center text-red-600 mb-8 rounded-full border border-white/10">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">UNDERGROUND_VISÍVEL</h3>
              <p className="text-gray-500">Autenticidade é o nosso único padrão. Representamos as subculturas que o mainstream frequentemente ignora.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/5 mx-auto flex items-center justify-center text-red-600 mb-8 rounded-full border border-white/10">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4">EVOLUÇÃO_URBANA</h3>
              <p className="text-gray-500">O estilo deve evoluir tão rápido quanto o sinal das ruas. Estamos em um estado constante de movimento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto border border-white/10 p-16 bg-gradient-to-br from-neutral-900 to-black relative">
          <div className="absolute top-0 left-0 w-2 h-2 bg-red-600"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-600"></div>
          
          <h2 className="text-4xl font-black mb-6 uppercase">Pronto para vestir o ruído?</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">Nossas tiragens sazonais são limitadas. Garanta seu drop exclusivo hoje e tome seu lugar na vanguarda da GINKED.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlitchButton onClick={() => navigate('/shop')}>EXPLORAR_CATÁLOGO</GlitchButton>
            <GlitchButton variant="outline">CONTATO</GlitchButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;