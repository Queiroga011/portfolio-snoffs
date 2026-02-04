'use client';
import { client, urlFor } from '@/lib/sanity.client';
import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Zap, Layout } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetails({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise); 
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    client.fetch(`*[_type == "project" && slug.current == "${params.slug}"][0]`).then(setProject);
  }, [params.slug]);

  // Loading Bonito
  if (!project) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 font-mono text-sm animate-pulse">
       <span className="tracking-widest uppercase">Carregando Projeto...</span>
    </div>
  );

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#050505] text-zinc-100 pb-20 overflow-x-hidden"
    >
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <nav className="p-8 relative z-50">
        <Link href="/" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-20">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            {project.role}
          </motion.span>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-none"
          >
            {project.title}
          </motion.h1>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl border-l-2 border-blue-600 pl-8"
          >
             {/* Correção do Texto: leading-normal para não espaçar demais e text-lg para não ficar gigante */}
             <p className="text-zinc-400 text-lg leading-relaxed whitespace-pre-wrap">
               {project.content || project.shortDescription}
             </p>
          </motion.div>
        </header>

        {/* Info Cards */}
        <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8">
            <Calendar className="text-blue-500 mb-4" size={20} />
            <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-1 opacity-50">Ano</h4>
            <p className="text-zinc-200 font-mono text-sm">{project.year || '2026'}</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8">
            <Zap className="text-blue-400 mb-4" size={20} />
            <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-1 opacity-50">Categoria</h4>
            <p className="text-blue-400 font-mono text-sm uppercase">{project.role}</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8">
            <Layout className="text-zinc-500 mb-4" size={20} />
            <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-1 opacity-50">Galeria</h4>
            <p className="text-zinc-500 font-mono text-sm uppercase">Veja abaixo</p>
          </div>
        </motion.div>

        {/* Galeria */}
        <div className="grid grid-cols-1 gap-12">
          {project.image && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-3xl overflow-hidden border border-white/5"
            >
              <img src={urlFor(project.image).url()} className="w-full h-auto" alt="Capa" />
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery?.map((img: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/20"
              >
                <img src={urlFor(img).url()} className="w-full h-full object-cover" alt={`Gallery ${index}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}