'use client';

import { client, urlFor } from '@/lib/sanity.client';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { PenTool, Video, Zap, ArrowUpRight, Layers, MousePointer2, Terminal, Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// --- Função Idade ---
function getAge(birthDateString: string) {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// --- Componente Spotlight ---
function SpotlightCard({ children, className = "", spotlightColor = "rgba(59, 130, 246, 0.15)" }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative border border-white/5 bg-zinc-900/40 overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [age, setAge] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    setAge(getAge("2003-05-01"));
    
    // BUSCA OS PROJETOS REAIS DO SANITY
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(_createdAt desc)`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };
    fetchProjects();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden scroll-smooth">
      
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"
        animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }}
        transition={{ type: 'spring', damping: 50, stiffness: 50 }}
      />

      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-10 mix-blend-overlay"></div>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-xl bg-[#050505]/60 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold text-white">Snoffs.com</span>
        </div>
        <nav className="hidden md:flex gap-8 font-mono text-[11px] text-zinc-400 uppercase tracking-widest font-medium">
            <a href="#specialties" className="hover:text-white transition-colors">Especialidades</a>
            <a href="#projects" className="hover:text-white transition-colors">Projetos</a>
            <a href="mailto:eduardo@snoffs.com" className="hover:text-blue-500 transition-colors">Contato</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-20">
        
        {/* HERO SECTION */}
        <section className="mb-48 pl-2">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8">
               <h2 className="font-mono text-blue-400 text-xs md:text-sm uppercase tracking-widest font-bold">
                 Eduardo Queiroga — {age} y/o
               </h2>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold leading-[0.9] tracking-tighter text-white mb-10">
              Creative Designer <br />
              <span className="text-zinc-700">&</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-white">Audiovisual Artist.</span>
            </h1>
            <p className="max-w-3xl text-zinc-400 text-lg md:text-xl leading-relaxed font-light border-l-4 border-blue-600 pl-8">
              Criação de visuais impactantes fundamentados no <b className="text-white">Design Gráfico</b> e na produção <b className="text-white">Audiovisual</b>. 
              Um toque de tech para escalar a criatividade.
            </p>
          </motion.div>
        </section>

        {/* CORE SKILLS SECTION */}
        <section id="specialties" className="mb-40 scroll-mt-28">
          <div className="flex items-end gap-4 mb-10">
             <h2 className="text-3xl font-bold text-white">Core Skills</h2>
             <div className="h-[1px] flex-1 bg-zinc-900 mb-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/skills/design-grafico" className="md:col-span-2 block">
              <SpotlightCard className="rounded-3xl p-10 flex flex-col justify-between min-h-[320px] h-full">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 flex items-center justify-center bg-zinc-800/50 rounded-2xl border border-white/5"><PenTool className="text-white" size={28} /></div>
                  <ArrowUpRight className="text-zinc-600 group-hover:text-blue-500 group-hover:rotate-45 transition-all duration-300" />
                </div>
                <div>
                  <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-2 block">Main Focus</span>
                  <h3 className="text-4xl font-bold text-white mb-3">Design Gráfico</h3>
                  <p className="text-zinc-400 max-w-md leading-relaxed text-sm">Identidade visual e direção de arte baseada em publicidade.</p>
                </div>
              </SpotlightCard>
            </Link>
            <Link href="/skills/edicao-video" className="md:col-span-1 block">
              <SpotlightCard className="rounded-3xl p-10 flex flex-col justify-between bg-zinc-900/40 min-h-[320px] h-full">
                <div className="w-14 h-14 flex items-center justify-center bg-zinc-800/50 rounded-2xl border border-white/5"><Video className="text-white" size={28} /></div>
                <h3 className="text-2xl font-bold text-white mb-2">Edição de Vídeo</h3>
                <p className="text-zinc-500 text-sm">Narrativa visual dinâmica e storytelling.</p>
              </SpotlightCard>
            </Link>
          </div>
        </section>

        {/* PROJETOS SECTION (MODULAR) */}
        <section id="projects" className="mb-40 scroll-mt-28">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-3xl font-bold text-white tracking-tight">Projetos Selecionados</h2>
               <span className="font-mono text-xs text-zinc-600 uppercase hidden md:block">/// Recent Work</span>
            </div>

            <div className="flex flex-col border-t border-zinc-900">
              {projects.length > 0 ? (
                projects.map((project, i) => (
                  <Link 
                    key={project._id || i}
                    href={`/projects/${project.slug?.current}`}
                    className="group relative border-b border-zinc-900 py-12 px-2 transition-all duration-300 hover:bg-zinc-900/30 block"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between z-10 relative">
                      <div className="flex items-baseline gap-6 md:w-1/2">
                        <span className="font-mono text-xs text-zinc-600 group-hover:text-blue-500">0{i + 1}</span>
                        <div>
                          <h3 className="text-3xl md:text-5xl font-bold text-zinc-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                            {project.title}
                          </h3>
                          <p className="text-zinc-500 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 hidden md:block">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mt-4 md:mt-0 justify-end md:w-1/2">
                         {/* IMAGEM FLUTUANTE (DESIGN ORIGINAL) */}
                         {project.image && (
                           <div className="hidden lg:block absolute right-48 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none w-32 h-20 overflow-hidden rounded-lg border border-white/10">
                             <img src={urlFor(project.image).url()} alt="" className="w-full h-full object-cover" />
                           </div>
                         )}
                         <span className="text-[10px] font-mono uppercase text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 group-hover:border-blue-500/30 group-hover:text-blue-400">
                           {project.role || "Projeto"}
                         </span>
                         <ArrowUpRight size={20} className="text-zinc-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-20 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest">
                  Nenhum projeto publicado no Studio.
                </div>
              )}
            </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 text-center flex flex-col items-center justify-center">
          <motion.div style={{ y: yParallax }}>
            <h2 className="text-[12vw] font-black tracking-tighter text-zinc-900 select-none uppercase leading-none">Snoffs.com</h2>
          </motion.div>
          <div className="mt-[-6vw] relative z-10 mb-20">
             <a href="mailto:eduardo@snoffs.com" className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl">
               <MousePointer2 size={16} /> <span className="uppercase tracking-widest text-xs">Iniciar Projeto</span>
             </a>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 font-mono uppercase tracking-widest border-t border-zinc-900 pt-8 mt-10">
            <span>Eduardo Queiroga © 2026</span>
            <div className="flex gap-6 mt-4 md:mt-0">
               <a href="https://www.linkedin.com/in/queiroga011/" target="_blank" className="hover:text-blue-500 transition">LinkedIn</a>
               <a href="https://www.instagram.com/queiroga011" target="_blank" className="hover:text-blue-500 transition">Instagram</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}