import { type SchemaTypeDefinition } from 'sanity'
import project from './project' // Verifique se o nome do arquivo é project.ts

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project], // O modelo DEVE estar dentro deste array
}