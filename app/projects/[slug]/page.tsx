'use client';

import { client, urlFor } from '@/lib/sanity.client';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetails({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const query = `*[_type == "project" && slug.current == "${params.slug}"][0]`;
      const data = await client.fetch(query);
      setProject(data);
    };
    fetchProject();
  }, [params.slug]);

  if (!project) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-500 font-mono">Carregando detalhes...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 font-mono text-xs uppercase tracking-widest">
          <ArrowLeft size={16} /> Voltar para o início
        </Link>

        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">{project.title}</h1>

        <div className="flex flex-wrap gap-6 mb-12 border-y border-zinc-900 py-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <Tag size={18} className="text-blue-500" />
            <span className="font-mono text-xs uppercase">{project.role}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Calendar size={18} className="text-blue-500" />
            <span className="font-mono text-xs uppercase">{project.year}</span>
          </div>
        </div>

        {project.image && (
          <div className="rounded-3xl overflow-hidden border border-white/5 mb-12">
            <img src={urlFor(project.image).url()} alt={project.title} className="w-full object-cover" />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <p className="text-zinc-400 text-xl leading-relaxed">{project.description}</p>
        </div>
      </div>
    </main>
  );
}