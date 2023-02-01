/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		extraFileExtensions: ['.astro'],
	},
	settings: {
		'mdx/code-blocks': false,
		react: {
			version: 'detect',
		},
	},
	plugins: ['@typescript-eslint', 'react'],
	extends: [
		// The order of these matter:
		// eslint baseline
		'eslint:recommended',
		// disables eslint rules in favor of using prettier separately
		'prettier',
		// React-recommended, followed by tuning off needing to `import React from "react"`
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/jsx-runtime',
		// Recommended typescript changes, which removes some "no-undef" checks that TS handles
		'plugin:@typescript-eslint/recommended',
		// MDX, which requires react previously
		'plugin:mdx/recommended',
		// Astro, which builds on the MDX and React settings
		'plugin:astro/recommended',
		'plugin:astro/jsx-a11y-strict',
	],
	rules: {},
	ignorePatterns: ['/*.js*', '/*.cjs*'],
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ['*.astro'],
			// Allows Astro components to be parsed.
			parser: 'astro-eslint-parser',
			// Parse the script in `.astro` as TypeScript by adding the following configuration.
			// It's the setting you need when using TypeScript.
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
			rules: {
				// These rules don't apply to astro files:
				'react/no-unknown-property': 'off',
				'react/jsx-key': 'off',
				'react/jsx-no-undef': 'off',
			},
		},
	],
};
