import type { ComponentProps } from 'react';
import type { MDXProvider } from '@mdx-js/react';
import { mergeStyles } from '@/core/jsx/mergeStyles';
import { pipeJsx } from '@/core/jsx/pipeJsx';
import { twMerge } from 'tailwind-merge';
import { recurse } from '@/core/jsx/recurse';
import { Headings } from '../headings';
import { mergeComponent } from '@/core/jsx/mergeComponent';

export const rowTemplate = mergeStyles(
	<tr className="even:bg-gradient-to-r from-tan-fading to-white odd:bg-tan-accent border-b-2 border-white font-info" />
);
export const infoFontTemplate = mergeStyles(<i className="font-info" />);

export const components: ComponentProps<typeof MDXProvider>['components'] = {
	...Headings.stepDown(0),
	p: mergeComponent(<p className="my-2" />),
	table: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['table']) => (
		<div
			className="overflow-auto print:overflow-visible my-2"
			style={{ breakInside: 'avoid' }}
		>
			<table
				className={twMerge('w-full border-collapse', className)}
				style={{ breakInside: 'avoid' }}
				{...props}
			>
				{children}
			</table>
		</div>
	),
	a: mergeComponent(
		<a className="hover:underline focus:underline text-purple-700" />
	),
	thead: mergeComponent(<thead className="bg-theme text-white" />),
	tbody: ({ children, ...props }: JSX.IntrinsicElements['tbody']) => (
		<tbody {...props}>{pipeJsx(<>{children}</>, recurse(rowTemplate))}</tbody>
	),
	td: mergeComponent(<td className="px-2 font-bold align-top" />),
	th: mergeComponent(<th className="px-2 font-bold align-bottom" />),
	ul: mergeComponent(<ul className="list-disc ml-6" />),
	ol: mergeComponent(<ol className="list-decimal ml-6" />),
	li: mergeComponent(<li className="my-1" />),
	hr: mergeComponent(<hr className="border-0 my-1.5" />),
	blockquote: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['blockquote']) => (
		<blockquote
			className={twMerge(
				'bg-gradient-to-r from-tan-fading p-2 my-4',
				className
			)}
			style={{ pageBreakInside: 'avoid' }}
			{...props}
		>
			{pipeJsx(<>{children}</>, recurse(infoFontTemplate))}
		</blockquote>
	),
	strong: mergeComponent(<span className="font-bold" />),
};
