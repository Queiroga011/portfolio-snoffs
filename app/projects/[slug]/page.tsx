'use client';
import { client, urlFor } from '@/lib/sanity.client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutGrid, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetails({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    client.fetch(`*[_type == "project" && slug.current == "${params.slug}"][0]`).then(setProject);
  }, [params.slug]);

  if (!project) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 pb-20 overflow-x-hidden">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <nav className="p-8">
        <Link href="/" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">{project.role}</span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">{project.title}</h1>
          <p className="max-w-2xl text-zinc-400 text-lg leading-relaxed border-l border-zinc-800 pl-6">{project.description}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/20">
            {project.image && (
              <img src={urlFor(project.image).url()} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={project.title} />
            )}
          </div>
          
          <div className="md:col-span-4 grid gap-6">
            <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[200px]">
              <Zap className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-white uppercase text-xs mb-1">Ano</h4>
                <p className="text-zinc-500 font-mono text-sm">{project.year}</p>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[200px]">
              <LayoutGrid className="text-zinc-600" size={24} />
              <div>
                <h4 className="font-bold text-white uppercase text-xs mb-1">Destaque</h4>
                <p className="text-blue-400 font-mono text-xs">Live @ Snoffs.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}