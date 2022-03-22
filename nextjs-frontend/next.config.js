/** @type {import('next').NextConfig} */
const config = {
    // Append the default value with md extensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    // Force the export to add /index.html for each page
    trailingSlash: true,
};

function composeConfig(config, ...plugins) {
    return plugins.reduce((prev, next) => next(prev), config);
}

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
        providerImportSource: "@mdx-js/react",
    },
});

module.exports = composeConfig(config, withMDX);