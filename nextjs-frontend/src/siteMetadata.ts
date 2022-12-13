export default {
	title: `DeKrey.NET`,
	description: `Personal articles and profile of Matt DeKrey`,
	author: `@mdekrey`,
	url: process.env.NEXT_PUBLIC_DOMAIN ?? `https://example.com`,
	gitHash: process.env.NEXT_PUBLIC_GIT_HASH ?? `main`,
} as const;
