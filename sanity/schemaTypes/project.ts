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
      name: 'image',
      title: 'Capa do Projeto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
  ],
})