import { antvDocsLoader, antvDocsSchema } from '@antv/astro-theme-antv/content';
import { defineCollection } from 'astro:content';

export const collections = {
  docs: defineCollection({
    loader: antvDocsLoader({ base: './docs' }),
    schema: antvDocsSchema,
  }),
};
