import {z, defineCollection} from 'astro:content';

const blog  = defineCollection({

    schema: z.object({
        title: z.string().max(50, 'Title must be less than 50 characters'),
        description : z.string().max(200, 'Description must be less than 200 characters'),
        date: z.date(),
        active: z.boolean(),
        author: z.string(),
        image: z.string(),
        category: z.string(),
    }),
});

export const collections = {blog};