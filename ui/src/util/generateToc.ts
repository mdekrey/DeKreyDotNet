import type { MarkdownHeading } from 'astro';
export interface TocItem extends MarkdownHeading {
	children: TocItem[];
}

function diveChildren(item: TocItem, depth: number): TocItem[] {
	const lastChild = item.children[item.children.length - 1];
	if (depth === 1 || !lastChild) {
		return item.children;
	} else {
		return diveChildren(lastChild, depth - 1);
	}
}

export function generateToc(headings: MarkdownHeading[], maxDepth = 3) {
	headings = [...headings.filter(({ depth }) => depth <= maxDepth)];
	const toc: Array<TocItem> = [];

	for (const heading of headings) {
		const lastItemInToc = toc[toc.length - 1];
		if (!lastItemInToc) {
			toc.push({
				...heading,
				children: [],
			});
		} else {
			if (heading.depth < lastItemInToc.depth) {
				console.error(
					'in generateToc, heading depth is less than last item',
					headings
				);
				throw new Error(`Orphan heading found: ${heading.text}.`);
			}
			if (heading.depth === lastItemInToc.depth) {
				// same depth
				toc.push({
					...heading,
					children: [],
				});
			} else {
				// higher depth
				// push into children, or children' children alike
				const gap = heading.depth - lastItemInToc.depth;
				const target = diveChildren(lastItemInToc, gap);
				target.push({
					...heading,
					children: [],
				});
			}
		}
	}
	return toc;
}
