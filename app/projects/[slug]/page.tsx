'use client';
import { client, urlFor } from '@/lib/sanity.client';
import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetails({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise); 
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    client.fetch(`*[_type == "project" && slug.current == "${params.slug}"][0]`).then(setProject);
  }, [params.slug]);

  if (!project) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 pb-20 overflow-x-hidden">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <nav className="p-8 relative z-50">
        <Link href="/" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar para o início
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-20">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">{project.role}</span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">{project.title}</h1>
          <p className="max-w-3xl text-zinc-400 text-lg md:text-xl leading-relaxed border-l-2 border-blue-600 pl-8">
            {project.content || project.shortDescription}
          </p>
        </header>

        {/* IMAGEM PRINCIPAL E INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-8 rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/20">
            {project.image && (
              <img src={urlFor(project.image).url()} className="w-full h-full object-cover" alt={project.title} />
            )}
          </div>
          
          <div className="md:col-span-4 grid gap-6">
            <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-10 flex flex-col justify-between">
              <Calendar className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-1 opacity-50">Ano</h4>
                <p className="text-zinc-200 font-mono text-sm">{project.year || '2026'}</p>
              </div>
            </div>
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-10 flex flex-col justify-between">
              <Zap className="text-blue-400" size={24} />
              <div>
                <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-1 opacity-50">Tecnologia</h4>
                <p className="text-blue-400 font-mono text-xs uppercase">{project.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* GALERIA DE IMAGENS ADICIONAIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.gallery?.map((img: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/20"
            >
              <img src={urlFor(img).url()} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" alt="" />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}