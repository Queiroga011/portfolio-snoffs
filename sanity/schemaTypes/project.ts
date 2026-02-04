import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Projeto',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'role',
      title: 'Categoria / Papel (Ex: n8n + IA)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Ano do Projeto',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Capa do Projeto',
      type: 'image',
      options: { hotspot: true },
    }),
    // CAMPO NOVO 1: Descrição para a Home
    defineField({
      name: 'shortDescription',
      title: 'Descrição Resumida (Home)',
      type: 'string',
      description: 'Texto curto que aparece ao passar o mouse na Home.'
    }),
    // CAMPO NOVO 2: Descrição Interna
    defineField({
      name: 'content',
      title: 'Descrição Completa',
      type: 'text',
    }),
    // CAMPO NOVO 3: Galeria de Fotos
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})