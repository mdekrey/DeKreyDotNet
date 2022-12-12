module.exports = {
	extends: ['next/core-web-vitals', 'prettier', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
	rules: {
		'prefer-const': 'error',
		'react/no-unescaped-entities': 0,
		'@next/next/no-img-element': 0,
		'@typescript-eslint/no-var-requires': 0,
	},
	ignorePatterns: ['/*.json', '/node_modules/**/*'],
};
