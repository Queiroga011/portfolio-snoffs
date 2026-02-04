'use client';

import { client, urlFor } from '@/lib/sanity.client';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { PenTool, Video, Zap, ArrowUpRight, MousePointer2, Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// --- Funções Auxiliares ---
function getAge(birthDateString: string) {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
  return age;
}

function SpotlightCard({ children, className = "", spotlightColor = "rgba(59, 130, 246, 0.15)" }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div className={`relative border border-white/5 bg-zinc-900/40 overflow-hidden group ${className}`} onMouseMove={handleMouseMove}>
      <motion.div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{ background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)` }}
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
    
    const fetchProjects = async () => {
      try {
        // QUERY AJUSTADA: Pedindo explicitamente o shortDescription
        const query = `*[_type == "project"] | order(_createdAt asc) {
          _id,
          title,
          shortDescription,
          role,
          year,
          slug,
          image
        }`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (error) { 
        console.error("Erro ao buscar projetos:", error); 
      }
    };
    
    fetchProjects();
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-blue-600 overflow-x-hidden scroll-smooth">
      <motion.div className="fixed top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"
        animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }} transition={{ type: 'spring', damping: 50, stiffness: 50 }}
      />

      <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-xl bg-[#050505]/60 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold text-white">Snoffs.com</span>
        </div>
        <nav className="hidden md:flex gap-8 font-mono text-[11px] text-zinc-400 uppercase tracking-widest font-medium">
            <a href="#specialties" className="hover:text-white transition-colors cursor-pointer">Especialidades</a>
            <a href="#projects" className="hover:text-white transition-colors cursor-pointer">Projetos</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-20">
        <section className="mb-48 pl-2">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8">
               <h2 className="font-mono text-blue-400 text-xs md:text-sm uppercase tracking-widest font-bold">Eduardo Queiroga — {age} y/o</h2>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold leading-[0.9] tracking-tighter text-white mb-10">
              Creative Designer <br /> <span className="text-zinc-700">&</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-white">Audiovisual Artist.</span>
            </h1>
        </section>

        {/* CORE SKILLS */}
        <section id="specialties" className="mb-40 scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/skills/design-grafico" className="md:col-span-2 block">
                <SpotlightCard className="rounded-3xl p-10 flex flex-col justify-between min-h-[320px]">
                    <PenTool className="text-white mb-4" size={28} />
                    <div>
                    <h3 className="text-4xl font-bold text-white mb-3">Design Gráfico</h3>
                    <p className="text-zinc-400 text-sm">Identidade visual e direção de arte estratégica.</p>
                    </div>
                </SpotlightCard>
            </Link>
            <Link href="/skills/edicao-video" className="block">
                <SpotlightCard className="rounded-3xl p-10 flex flex-col justify-between bg-zinc-900/40 min-h-[320px]">
                    <Video className="text-white mb-4" size={28} />
                    <h3 className="text-2xl font-bold text-white mb-2">Edição de Vídeo</h3>
                    <p className="text-zinc-500 text-sm">Narrativa visual dinâmica e storytelling.</p>
                </SpotlightCard>
            </Link>
          </div>
        </section>

        {/* PROJETOS - ALINHAMENTO E EFEITO HOVER */}
        <section id="projects" className="mb-40 scroll-mt-28">
            <div className="flex flex-col border-t border-zinc-900">
              {projects.length > 0 ? (
                projects.map((project, i) => (
                  <Link key={project._id || i} href={`/projects/${project.slug?.current}`} className="group relative border-b border-zinc-900 py-16 px-2 transition-all duration-500 hover:bg-zinc-900/30 block overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between relative h-20">
                      
                      <div className="flex items-center gap-6 md:w-2/3 h-full">
                        <span className="font-mono text-xs text-zinc-600 group-hover:text-blue-500 transition-colors shrink-0">0{i + 1}</span>
                        
                        <div className="relative flex flex-col justify-center overflow-hidden h-full w-full">
                          {/* TÍTULO QUE SOBE */}
                          <h3 className="text-3xl md:text-5xl font-bold text-zinc-400 group-hover:text-white transition-all duration-500 ease-in-out group-hover:-translate-y-[150%]">
                            {project.title}
                          </h3>
                          {/* DESCRIÇÃO RESUMIDA QUE APARECE NO LUGAR DO TÍTULO */}
                          <p className="absolute left-0 text-blue-400 text-sm font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-[150%] group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                            {project.shortDescription || "Ver Detalhes do Projeto"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 justify-end md:w-1/3">
                         <span className="text-[10px] font-mono uppercase text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 group-hover:border-blue-500/30 group-hover:text-blue-400">
                           {project.role}
                         </span>
                         <ArrowUpRight size={20} className="text-zinc-600 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="py-10 text-zinc-600 font-mono text-xs uppercase">Carregando projetos...</p>
              )}
            </div>
        </section>

        <footer className="py-20 text-center flex flex-col items-center justify-center">
          <motion.div style={{ y: yParallax }}>
            <h2 className="text-[12vw] font-black tracking-tighter text-zinc-900 uppercase leading-none hover:text-zinc-800 transition-colors">Snoffs.com</h2>
          </motion.div>
          <div className="mt-[-6vw] relative z-10">
             <a href="mailto:eduardo@snoffs.com" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-white/5">
               <MousePointer2 size={16} /> <span className="uppercase tracking-widest text-xs">Iniciar Projeto</span>
             </a>
          </div>
          <div className="w-full flex justify-between items-center text-[10px] text-zinc-600 font-mono uppercase tracking-widest border-t border-zinc-900 pt-8 mt-20">
            <span>Eduardo Queiroga © 2026</span>
            <div className="flex gap-6">
              <a href="https://instagram.com/queiroga011" target="_blank" rel="noopener noreferrer"><Instagram size={14} className="hover:text-white cursor-pointer" /></a>
              <a href="https://linkedin.com/in/queiroga011" target="_blank" rel="noopener noreferrer"><Linkedin size={14} className="hover:text-white cursor-pointer" /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}