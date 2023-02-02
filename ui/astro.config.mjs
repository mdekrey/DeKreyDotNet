import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import image from '@astrojs/image';
import glslify from 'rollup-plugin-glslify';

export default defineConfig({
	vite: {
		plugins: [glslify()],
	},
	integrations: [
		tailwind({ config: './tailwind.config.cjs' }),
		react(),
		mdx({
			remarkPlugins: [
				[(await import('remark-mdx-images')).default],
				[(await import('remark-reading-time')).default],
				[(await import('remark-reading-time/mdx')).default],
				[(await import('./remark-excerpt.mjs')).default],
			],
		}),
		image(),
	],
});
