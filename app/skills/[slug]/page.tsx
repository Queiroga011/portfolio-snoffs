'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Sparkles, BrainCircuit, Cpu, Workflow, Zap, Database, Share2, PenTool, Video, Layers, Terminal } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

// --- BANCO DE DADOS DAS SKILLS ---
const skillsData: any = {
  // 1. DESIGN GRÁFICO
  'design-grafico': {
    title: 'Design Gráfico',
    highlight: 'Main Focus',
    icon: <PenTool className="text-white" size={32} />,
    color: 'text-white',
    bgIcon: 'bg-zinc-800/50',
    description: 'Identidade visual e direção de arte estratégica. Não é apenas sobre deixar bonito, é sobre comunicar a mensagem certa para o público certo.',
    cards: [
      { title: 'Identidade Visual', icon: <PenTool className="text-blue-400" size={24} />, text: 'Criação de logos, paletas de cores e manuais de marca completos.' },
      { title: 'Social Media', icon: <Share2 className="text-purple-400" size={24} />, text: 'Posts estratégicos e carrosséis que retêm a atenção.' },
      { title: 'Direção de Arte', icon: <Layers className="text-green-400" size={24} />, text: 'Supervisão criativa para garantir consistência em todos os pontos de contato.' }
    ]
  },
  
  // 2. EDIÇÃO DE VÍDEO
  'edicao-video': {
    title: 'Edição de Vídeo',
    highlight: 'Storytelling',
    icon: <Video className="text-white" size={32} />,
    color: 'text-white',
    bgIcon: 'bg-zinc-800/50',
    description: 'Narrativa visual dinâmica. Transformo horas de gravação em histórias que prendem a atenção do primeiro ao último segundo.',
    cards: [
      { title: 'Cortes Dinâmicos', icon: <Video className="text-yellow-400" size={24} />, text: 'Ritmo acelerado e retenção de público para redes sociais.' },
      { title: 'Color Grading', icon: <Sparkles className="text-pink-400" size={24} />, text: 'Correção de cor para dar aspecto cinematográfico aos vídeos.' },
      { title: 'Sound Design', icon: <Zap className="text-blue-400" size={24} />, text: 'Trilha sonora e efeitos sonoros que ditam a emoção da cena.' }
    ]
  },

  // 3. MOTION DESIGN
  'motion-design': {
    title: 'Motion Design',
    highlight: 'Animation',
    icon: <Layers className="text-white" size={32} />,
    color: 'text-white',
    bgIcon: 'bg-zinc-800/50',
    description: 'Dando vida a elementos estáticos. O movimento guia o olhar do usuário e torna a interface mais intuitiva e moderna.',
    cards: [
      { title: 'UI Animation', icon: <Layers className="text-blue-400" size={24} />, text: 'Micro-interações que melhoram a experiência do usuário.' },
      { title: 'Logo Reveal', icon: <Sparkles className="text-yellow-400" size={24} />, text: 'Animações de logo para introduções de vídeos impactantes.' },
      { title: 'Kinetic Type', icon: <PenTool className="text-white" size={24} />, text: 'Tipografia em movimento para vídeos promocionais.' }
    ]
  },

  // 4. IA (Antigo IA Folder)
  'ia': {
    title: 'Artificial Intelligence',
    highlight: 'Generative Tech',
    icon: <Bot className="text-blue-400" size={32} />,
    color: 'text-blue-500',
    bgIcon: 'bg-blue-500/10 border-blue-500/20',
    description: 'Potencializando a criatividade com modelos generativos. O foco é dar superpoderes de execução e ideação.',
    cards: [
      { title: 'Generative Art', icon: <Sparkles className="text-yellow-400" size={24} />, text: 'Assets visuais únicos com Midjourney e Stable Diffusion.' },
      { title: 'LLM Integration', icon: <BrainCircuit className="text-blue-400" size={24} />, text: 'Roteiros e copy criativo estruturados com GPT-4 e Claude.' },
      { title: 'Workflow Híbrido', icon: <Cpu className="text-white" size={24} />, text: 'Integração de IA no Photoshop e After Effects para agilidade.' }
    ]
  },

  // 5. N8N (Antigo n8n Folder)
  'n8n': {
    title: 'n8n Automation',
    highlight: 'Workflow',
    icon: <Workflow className="text-orange-500" size={32} />,
    color: 'text-orange-500',
    bgIcon: 'bg-orange-500/10 border-orange-500/20',
    description: 'Orquestração de fluxos complexos. Conectando apps e APIs para criar ecossistemas digitais autônomos.',
    cards: [
      { title: 'Automação', icon: <Zap className="text-yellow-400" size={24} />, text: 'Tarefas repetitivas automatizadas para focar no estratégico.' },
      { title: 'Integrações', icon: <Share2 className="text-blue-400" size={24} />, text: 'Conexão via Webhooks entre ferramentas distintas.' },
      { title: 'Backend Low-Code', icon: <Database className="text-white" size={24} />, text: 'Tratamento de dados ágil sem servidores pesados.' }
    ]
  }
};

export default function SkillPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise);
  const skill = skillsData[params.slug];

  if (!skill) return notFound();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-blue-600">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-10 mix-blend-overlay"></div>

      <main className="max-w-5xl mx-auto px-6 pt-20 pb-20 relative z-20">
        <nav className="mb-20">
          <Link href="/#specialties" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar para Skills
          </Link>
        </nav>

        <header className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className={`w-16 h-16 ${skill.bgIcon} border border-white/5 rounded-2xl flex items-center justify-center mb-8`}>
              {skill.icon}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              {skill.title.split(' ')[0]} <br /> 
              <span className={skill.color}>{skill.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed border-l-2 border-white/10 pl-6">
              {skill.description}
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skill.cards.map((card: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 + (index * 0.1) }}
              className={`p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-colors ${index === 2 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-center gap-3 mb-4">
                 {card.icon}
                 <h3 className="text-xl font-bold">{card.title}</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}