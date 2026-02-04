'use client';

import { client, urlFor } from '@/lib/sanity.client';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { PenTool, Video, Zap, ArrowUpRight, Layers, MousePointer2, Terminal, Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
        const data = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
        setProjects(data);
      } catch (error) { console.error("Erro ao carregar:", error); }
    };
    fetchProjects();
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden scroll-smooth">
      <motion.div className="fixed top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"
        animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }} transition={{ type: 'spring', damping: 50, stiffness: 50 }}
      />
      
      <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-xl bg-[#050505]/60 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold text-white">Snoffs.com</span>
        </div>
        <nav className="hidden md:flex gap-8 font-mono text-[11px] text-zinc-400 uppercase tracking-widest font-medium">
            <a href="#specialties" className="hover:text-white transition-colors">Especialidades</a>
            <a href="#projects" className="hover:text-white transition-colors">Projetos</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-20">
        <section className="mb-48 pl-2 text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8">
               <h2 className="font-mono text-blue-400 text-xs md:text-sm uppercase tracking-widest font-bold">Eduardo Queiroga — {age} y/o</h2>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold leading-[0.9] tracking-tighter text-white mb-10">
              Creative Designer <br /> <span className="text-zinc-700">&</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-white">Audiovisual Artist.</span>
            </h1>
        </section>

        {/* SEÇÃO DE PROJETOS MODULAR */}
        <section id="projects" className="mb-40 scroll-mt-28">
            <div className="flex items-center justify-between mb-12">
               <h2 className="text-3xl font-bold text-white tracking-tight">Projetos Selecionados</h2>
               <span className="font-mono text-xs text-zinc-600 uppercase">/// Sanity CMS Live</span>
            </div>

            <div className="flex flex-col border-t border-zinc-900">
              {projects.length > 0 ? (
                projects.map((project, i) => (
                  <Link key={project._id || i} href={`/projects/${project.slug?.current}`} className="group relative border-b border-zinc-900 py-12 px-2 transition-all duration-300 hover:bg-zinc-900/30 block">
                    <div className="flex flex-col md:flex-row md:items-center justify-between relative">
                      <div className="flex items-baseline gap-6 md:w-1/2">
                        <span className="font-mono text-xs text-zinc-600 group-hover:text-blue-500">0{i + 1}</span>
                        <div>
                          <h3 className="text-3xl md:text-5xl font-bold text-zinc-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{project.title}</h3>
                          <p className="text-zinc-500 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 mt-4 md:mt-0 justify-end md:w-1/2">
                         {project.image && (
                           <div className="hidden lg:block absolute right-48 opacity-0 group-hover:opacity-100 transition-all duration-500 w-32 h-20 overflow-hidden rounded-lg border border-white/10">
                             <img src={urlFor(project.image).url()} alt="" className="w-full h-full object-cover" />
                           </div>
                         )}
                         <span className="text-[10px] font-mono uppercase text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 group-hover:border-blue-500/30 group-hover:text-blue-400">
                           {project.role || "Projeto"}
                         </span>
                         <ArrowUpRight size={20} className="text-zinc-600 group-hover:text-white group-hover:rotate-45 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-20 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest">Aguardando novos projetos no Studio...</div>
              )}
            </div>
        </section>

        <footer className="py-20 text-center">
            <h2 className="text-[12vw] font-black tracking-tighter text-zinc-900 select-none uppercase leading-none">Snoffs.com</h2>
            <div className="mt-[-6vw] relative z-10 mb-20">
               <a href="mailto:eduardo@snoffs.com" className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-all">
                 <MousePointer2 size={16} /> <span className="uppercase tracking-widest text-xs">Iniciar Projeto</span>
               </a>
            </div>
        </footer>
      </main>
    </div>
  );
}