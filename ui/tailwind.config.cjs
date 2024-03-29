/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			spacing: {
				18: '4.5rem',
			},
		},
	},
	variants: {
		extend: {
			display: ['group-hover'],
		},
	},
};
