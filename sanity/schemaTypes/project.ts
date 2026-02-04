// sanity/schemaTypes/project.ts
const project = {
  name: 'project',
  title: 'Projetos',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'image', title: 'Imagem', type: 'image' },
    { name: 'description', title: 'Descrição', type: 'text' },
  ],
}

export default project