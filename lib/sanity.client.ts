import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Certifique-se de que o export está aqui
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-04',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

// E aqui também
export const urlFor = (source: any) => builder.image(source)