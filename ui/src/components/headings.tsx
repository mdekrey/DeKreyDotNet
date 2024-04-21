import { twMerge } from 'tailwind-merge';
import { pipeJsx } from '@/core/jsx/pipeJsx';
import { mergeStyles } from '@/core/jsx/mergeStyles';
import { createElement } from 'react';
import clamp from 'lodash/fp/clamp';
import { withIdLink } from './IdLink';

const headerTemplate = mergeStyles(
	<i
		className={twMerge('font-header font-bold', 'mt-4 first:mt-0')}
		style={{ pageBreakAfter: 'avoid' }}
	/>,
);

type HeaderElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const header = (elem: HeaderElements, fontSizeClass: string) =>
	withIdLink<'h1'>(
		({ children, className, ...props }: JSX.IntrinsicElements['h1']) =>
			pipeJsx(
				createElement(
					elem,
					{
						className: twMerge(fontSizeClass, className),
						...props,
					},
					children,
				),
				headerTemplate,
			),
	);

export const Headings = {
	h1: header('h1', 'text-4xl'),
	h2: header('h2', 'text-3xl'),
	h3: header('h3', 'text-2xl'),
	h4: header('h4', 'text-xl'),
	h5: header('h5', 'text-lg'),
	h6: header('h6', 'text-base'),
	// h7 to be used because our mdx down-steps all header tags intentionally
	h7: header('h6', 'text-sm'),
	h8: header('h6', 'text-xs'),

	byNumber: (n: number) =>
		Headings[`h${Math.floor(clamp(1, 8, n)) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`],
	stepDown: (n: number) => ({
		h1: Headings.byNumber(n + 1),
		h2: Headings.byNumber(n + 2),
		h3: Headings.byNumber(n + 3),
		h4: Headings.byNumber(n + 4),
		h5: Headings.byNumber(n + 5),
		h6: Headings.byNumber(n + 6),
	}),
};
