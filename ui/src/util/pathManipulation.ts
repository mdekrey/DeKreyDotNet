import { parse } from 'node:path';

/** Remove \ and / from beginning of string */
export function removeLeadingSlash(path: string) {
	return path.replace(/^[/\\]+/, '');
}

/** Remove \ and / from end of string */
export function removeTrailingSlash(path: string) {
	return path.replace(/[/\\]+$/, '');
}

/** Remove the subpage segment of a URL string */
export function removeSubpageSegment(path: string) {
	// TODO - not sure what this is
	return path;
}

export function removeExtension(path: string) {
	const { name, dir } = parse(path);
	return `${dir}/${name}`;
}
