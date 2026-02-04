'use client';

import { projectsData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// CORREÇÃO: Tipagem para Next.js 15 (params é uma Promise)
export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Desembrulha o params usando React.use()
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  
  const project = projectsData[slug];
  // const { scrollYProgress } = useScroll(); // Parallax opcional

  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-blue-600">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-10 mix-blend-overlay"></div>

      <header className="fixed top-0 w-full z-50 px-8 py-6 backdrop-blur-xl border-b border-white/5 flex justify-between items-center">
        <Link href="/#projects" className="flex items-center gap-2 text-zinc-400 hover:text-white transition group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-mono uppercase tracking-widest">Voltar</span>
        </Link>
        <div className="text-xs font-mono uppercase text-zinc-600">{project.year}</div>
      </header>

      <main className="relative z-20">
        {/* Hero do Projeto */}
        <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/10 pb-12">
               <div>
                  <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 block">Case Study</span>
                  <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase">{project.title}</h1>
               </div>
               <div className="flex gap-8 text-sm font-mono uppercase text-zinc-400">
                  <div className="flex flex-col gap-1">
                     <span className="text-zinc-600 flex items-center gap-2"><User size={12}/> Role</span>
                     <span className="text-white">{project.role}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-zinc-600 flex items-center gap-2"><Calendar size={12}/> Year</span>
                     <span className="text-white">{project.year}</span>
                  </div>
               </div>
            </div>

            <p className="text-xl md:text-3xl font-light text-zinc-300 max-w-4xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </section>

        {/* Detalhes */}
        <section className="px-6 max-w-7xl mx-auto mb-32">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-10 bg-zinc-900/30 border border-white/5 rounded-3xl">
                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span> O Desafio
                 </h3>
                 <p className="text-zinc-400 leading-relaxed">{project.challenge}</p>
              </div>
              <div className="p-10 bg-blue-900/10 border border-blue-500/10 rounded-3xl">
                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span> A Solução
                 </h3>
                 <p className="text-blue-200/80 leading-relaxed">{project.solution}</p>
              </div>
           </div>
        </section>

        {/* Galeria */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="bg-zinc-900/50 border-t border-white/5 py-32">
             <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-white mb-16">Galeria</h2>
                <div className="space-y-24">
                   {project.gallery.map((img: string, i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5"
                      >
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={img} alt={`Project image ${i}`} className="w-full h-auto" />
                      </motion.div>
                   ))}
                </div>
             </div>
          </section>
        )}

        {/* CTA Footer */}
        <footer className="py-20 text-center border-t border-white/5">
           <h3 className="text-zinc-500 text-sm font-mono uppercase mb-8">Interessado?</h3>
           <a href="mailto:eduardo@snoffs.com" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all">
               Iniciar Projeto <ArrowUpRight size={20} />
           </a>
        </footer>
      </main>
    </div>
  );
}