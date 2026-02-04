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
    // ESTE É O CAMPO QUE FALTA NO SEU PRINT:
    defineField({
      name: 'shortDescription',
      title: 'Descrição Resumida (Home)',
      type: 'string',
      description: 'Texto curto que aparece ao passar o mouse na Home.'
    }),
    defineField({
      name: 'content',
      title: 'Descrição Completa',
      type: 'text',
    }),
    // ESTE TAMBÉM FALTA:
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})