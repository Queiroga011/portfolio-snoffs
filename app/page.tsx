'use client';

import { client, urlFor } from '@/lib/sanity.client';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { PenTool, Video, Zap, ArrowUpRight, Layers, MousePointer2, Terminal, Instagram, Linkedin } from 'lucide-react';
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
        // Query ajustada para puxar o campo correto da descrição reduzida
        const data = await client.fetch(`*[_type == "project"] | order(_createdAt asc) {
          _id,
          title,
          shortDescription,
          role,
          slug,
          image
        }`);
        setProjects(data);
      } catch (error) { console.error(error); }
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
                    <div className="w-14 h-14 flex items-center justify-center bg-zinc-800/50 rounded-2xl border border-white/5">
                      <PenTool className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white mb-3">Design Gráfico</h3>
                      <p className="text-zinc-400 text-sm">Identidade visual e direção de arte estratégica.</p>
                    </div>
                </SpotlightCard>
            </Link>
            <Link href="/skills/edicao-video" className="block">
                <SpotlightCard className="rounded-3xl p-10 flex flex-col justify-between bg-zinc-900/40 min-h-[320px]">
                    <div className="w-14 h-14 flex items-center justify-center bg-zinc-800/50 rounded-2xl border border-white/5">
                      <Video className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Edição de Vídeo</h3>
                    <p className="text-zinc-500 text-sm">Narrativa visual dinâmica e storytelling.</p>
                </SpotlightCard>
            </Link>
            <Link href="/skills/motion-design" className="block">
              <SpotlightCard className="rounded-3xl p-8 flex flex-col justify-between min-h-[250px]">
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-800/50 rounded-xl border border-white/5">
                    <Layers className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Motion Design</h3>
                  <p className="text-zinc-500 text-xs">Animação de interfaces e elementos gráficos.</p>
              </SpotlightCard>
            </Link>
            <Link href="/skills/ia-n8n" className="block">
              <SpotlightCard className="rounded-3xl p-8 flex flex-col justify-between bg-blue-900/5 border-blue-500/10 min-h-[250px]" spotlightColor="rgba(59, 130, 246, 0.25)">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Zap className="text-blue-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">IA & n8n</h3>
                  <p className="text-blue-200/70 text-xs">Automação de fluxos e integração de IA.</p>
              </SpotlightCard>
            </Link>
            <Link href="/skills/ia-n8n" className="block">
              <SpotlightCard className="rounded-3xl p-8 flex flex-col justify-between min-h-[250px]">
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-800/50 rounded-xl border border-white/5">
                    <Terminal className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Code & Tech</h3>
                  <p className="text-zinc-500 text-xs">Desenvolvimento de interfaces modernas.</p>
              </SpotlightCard>
            </Link>
          </div>
        </section>

        {/* LISTA DE PROJETOS - TÍTULO + DESCRIÇÃO NO HOVER */}
        <section id="projects" className="mb-40 scroll-mt-28">
            <div className="flex flex-col border-t border-zinc-900">
              {projects.map((project, i) => (
                <Link key={project._id || i} href={`/projects/${project.slug?.current}`} className="group relative border-b border-zinc-900 py-16 px-2 transition-all duration-500 hover:bg-zinc-900/30 block">
                  <div className="flex flex-col md:flex-row md:items-center justify-between relative">
                    
                    <div className="flex items-center gap-6 md:w-2/3">
                      <span className="font-mono text-xs text-zinc-600 group-hover:text-blue-500 transition-colors shrink-0">0{i + 1}</span>
                      
                      <div className="relative flex flex-col justify-center py-2">
                        {/* Título: Apenas desloca para cima no hover para dar espaço à descrição */}
                        <h3 className="text-3xl md:text-5xl font-bold text-zinc-400 group-hover:text-white transition-transform duration-500 ease-out group-hover:-translate-y-2">
                          {project.title}
                        </h3>
                        {/* Descrição: Aparece abaixo do título sem removê-lo */}
                        <p className="text-blue-400 text-sm font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out mt-1 absolute bottom-[-10px]">
                          {project.shortDescription || "Ver Detalhes"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 justify-end md:w-1/3">
                       {/* Imagem Flutuante (Opcional, conforme versões anteriores) */}
                       {project.image && (
                         <div className="hidden lg:block absolute right-48 opacity-0 group-hover:opacity-100 transition-all duration-500 w-32 h-20 overflow-hidden rounded-lg border border-white/10 pointer-events-none">
                           <img src={urlFor(project.image).url()} className="w-full h-full object-cover" alt="" />
                         </div>
                       )}
                       <span className="text-[10px] font-mono uppercase text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 group-hover:border-blue-500/30 group-hover:text-blue-400">
                         {project.role}
                       </span>
                       <ArrowUpRight size={20} className="text-zinc-600 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                    </div>
                  </div>
                </Link>
              ))}
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
              <Instagram size={14} className="hover:text-white cursor-pointer" />
              <Linkedin size={14} className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}