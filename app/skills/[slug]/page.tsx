'use client';

import { skillsData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// A correção vital está aqui: "export default"
export default function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  // Desembrulha o params (Promise)
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const skill = skillsData[slug];

  if (!skill) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-blue-600">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-10 mix-blend-overlay"></div>

      <header className="fixed top-0 w-full z-50 px-8 py-6 backdrop-blur-xl border-b border-white/5">
        <Link href="/#specialties" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-mono uppercase tracking-widest">Voltar</span>
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-40 pb-20 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 block">Core Skill</span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">{skill.title}</h1>
          <h2 className="text-2xl text-zinc-400 font-light mb-12 border-l-4 border-blue-600 pl-6">{skill.subtitle}</h2>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-zinc-300 leading-relaxed mb-10">{skill.description}</p>
            <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-3xl">
                <p className="text-zinc-400">{skill.content}</p>
            </div>
          </div>

          {/* Galeria Simples */}
          {skill.images && skill.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              {skill.images.map((img: string, i: number) => (
                <div key={i} className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-white/5">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={img} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}