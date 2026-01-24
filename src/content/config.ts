import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// This ensures every blog post has these fields
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
        tags: z.array(z.string()).optional()
	}),
});

const projects = defineCollection({
    type: 'content',
    // This ensures every project has these fields
    schema: z.object({
        title: z.string(),
        description: z.string(),
        stack: z.array(z.string()), // e.g. ["Python", "React"]
        heroImage: z.string().optional(),
        repoUrl: z.string().optional(),
        liveUrl: z.string().optional(),
    })
});

// Export both collections so Astro knows they exist
export const collections = { blog, projects };