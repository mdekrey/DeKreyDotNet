import type { ComponentProps } from 'react';
import type { MDXProvider } from '@mdx-js/react';
import { mergeStyles } from '@/core/jsx/mergeStyles';
import { pipeJsx } from '@/core/jsx/pipeJsx';
import { twMerge } from 'tailwind-merge';
import { recurse } from '@/core/jsx/recurse';
import { Headings } from '../headings';

export const rowTemplate = mergeStyles(
	<tr className="even:bg-gradient-to-r from-tan-fading to-white odd:bg-tan-accent border-b-2 border-white font-info" />
);
export const infoFontTemplate = mergeStyles(<i className="font-info" />);

export const components: ComponentProps<typeof MDXProvider>['components'] = {
	...Headings.stepDown(0),
	p: ({ children, className, ...props }: JSX.IntrinsicElements['p']) => (
		<p className={twMerge('my-2', className)} {...props}>
			{children}
		</p>
	),
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
	a: ({ children, className, ...props }: JSX.IntrinsicElements['a']) => (
		<a className={twMerge('underline text-theme', className)} {...props}>
			{children}
		</a>
	),
	thead: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['thead']) => (
		<thead className={twMerge('bg-theme text-white', className)} {...props}>
			{children}
		</thead>
	),
	tbody: ({ children, ...props }: JSX.IntrinsicElements['tbody']) => (
		<tbody {...props}>{pipeJsx(<>{children}</>, recurse(rowTemplate))}</tbody>
	),
	td: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['td'] & { isHeader?: boolean }) => (
		<td className={twMerge('px-2 font-bold align-top', className)} {...props}>
			{children}
		</td>
	),
	th: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['th'] & { isHeader?: boolean }) => (
		<th
			className={twMerge('px-2 font-bold align-bottom', className)}
			{...props}
		>
			{children}
		</th>
	),
	ul: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['ul'] & { ordered?: boolean }) => (
		<ul className={twMerge('list-disc ml-6', className)} {...props}>
			{children}
		</ul>
	),
	ol: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['ol'] & { ordered?: boolean }) => (
		<ul className={twMerge('list-decimal ml-6', className)} {...props}>
			{children}
		</ul>
	),
	li: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['li'] & { ordered?: boolean }) => (
		<li className={twMerge('my-1', className)} {...props}>
			{children}
		</li>
	),
	hr: ({ className, ...props }: JSX.IntrinsicElements['hr']) => (
		<hr className={twMerge('border-0 my-1.5', className)} {...props} />
	),
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
	img: ({ src, alt, ...props }: JSX.IntrinsicElements['img']) => (
		<img src={src} alt={alt} {...props} />
	),
	strong: ({ children, ...props }: JSX.IntrinsicElements['strong']) => (
		<span className="font-bold" {...props}>
			{children}
		</span>
	),
};
