import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título do Projeto', type: 'string' }),
    defineField({ 
      name: 'slug', 
      title: 'URL (Slug)', 
      type: 'slug', 
      options: { source: 'title' } 
    }),
    defineField({ 
      name: 'role', 
      title: 'Categoria / Papel (Ex: n8n + IA)', 
      type: 'string' 
    }),
    defineField({ name: 'year', title: 'Ano do Projeto', type: 'string' }),
    defineField({ 
      name: 'image', 
      title: 'Capa Principal', 
      type: 'image', 
      options: { hotspot: true } 
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição Resumida (Aparece na Home)',
      type: 'string',
      description: 'Texto curto para o efeito de hover.'
    }),
    defineField({
      name: 'content',
      title: 'Descrição Completa',
      type: 'text',
      description: 'Texto detalhado que aparece dentro da página do projeto.'
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Suba aqui imagens adicionais ou capturas de ecrã do projeto.'
    }),
  ],
})

// atualização de campos v2