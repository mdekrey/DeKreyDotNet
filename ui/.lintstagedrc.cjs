const path = require('path');

const buildEslintCommand = (filenames) =>
	`eslint --fix ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(' ')}`;

const buildPrettierCommand = (filenames) =>
	`prettier --write ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(' ')}`;

const buildTypecheckCommand = (filenames) => `npm run typecheck`;

module.exports = {
	'*.{js,jsx,ts,tsx,astro,md,mdx}': [buildEslintCommand],
	'*.{js,jsx,ts,tsx,astro}': [buildPrettierCommand],
	'*.{ts,tsx,astro,mdx}': [buildTypecheckCommand],
};
