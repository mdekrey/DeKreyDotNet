/** @type {import('next').NextConfig} */

const config = {
	// Append the default value with md extensions
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	// Force the export to add /index.html for each page
	trailingSlash: true,
	eslint: {
		dirs: ['..'],
	},
	webpack: (config) => {
		const pngRule = config.module.rules.find((p) => p.test && p.test.exec('something.png'));
		pngRule.issuer = { not: /\.(css|scss|sass|mdx)$/ };
		config.module.rules.push({
			test: /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i,
			issuer: /\.mdx$/,
			type: 'asset',
		});
		config.module.rules.push({
			test: /\.glsl$/,
			type: 'asset/source',
		});
		return config;
	},
};

function composeConfig(config, ...plugins) {
	return plugins.reduce((prev, next) => next(prev), config);
}

const withMDX = async () => {
	const remarkExcerpt = (await import('./remark-excerpt.mjs')).default;
	// console.log({ remarkExcerpt });
	return require('@next/mdx')({
		extension: /\.mdx?$/,
		options: {
			remarkPlugins: [
				(await import('remark-frontmatter')).default,
				[(await import('remark-mdx-frontmatter')).remarkMdxFrontmatter, { name: 'frontmatter' }],
				(await import('remark-unwrap-images')).default,
				(await import('remark-mdx-images')).remarkMdxImages,
				[(await import('remark-reading-time')).default, { attribute: 'readingTime' }],
				[(await import('remark-reading-time/mdx.js')).default, { attribute: 'readingTime' }],
				[remarkExcerpt],
			],
			rehypePlugins: [
				[
					(await import('rehype-highlight')).default,
					{
						languages: {
							fsharp: (await import('highlight.js/lib/languages/fsharp')).default,
							dockerfile: (await import('highlight.js/lib/languages/dockerfile')).default,
						},
					},
				],
			],
			providerImportSource: '@mdx-js/react',
		},
	});
};

module.exports = async () => composeConfig(config, await withMDX());
