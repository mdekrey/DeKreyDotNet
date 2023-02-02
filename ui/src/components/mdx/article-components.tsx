import type { MDXProvider } from '@mdx-js/react';
import type { ComponentProps } from 'react';
import type { ImageMetadata } from '@astrojs/image/dist/vite-plugin-astro-image';
import { components } from './components';
import { twMerge } from 'tailwind-merge';
import { Headings } from '../headings';

function mergeComponent<
	T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements
>({
	type: Type,
	props: { className: templateClassName, ...originalProps },
}: JSX.Element) {
	return function MergedComponent({
		className,
		...props
	}: JSX.IntrinsicElements[T]) {
		return (
			<Type
				className={twMerge(templateClassName, className)}
				{...originalProps}
				{...props}
			/>
		);
	};
}

export const articleComponents: ComponentProps<
	typeof MDXProvider
>['components'] = {
	...components,
	...Headings.stepDown(1),
	img: ({ src, ...props }) => {
		const source =
			typeof src === 'string' || typeof src === 'undefined'
				? src
				: (src as unknown as ImageMetadata).src;
		return (
			<span className="relative flex justify-center">
				<img style={{ maxWidth: '590px' }} alt="" src={source} {...props} />
			</span>
		);
	},
	a: mergeComponent(<a className="font-bold underline" />),
	pre: mergeComponent(<pre className="my-8 p-4 overflow-hidden rounded-lg" />),
	p: mergeComponent(<p className="my-4 font-serif font-normal text-xl" />),
	li: mergeComponent(<li className="my-4 font-serif font-normal text-xl" />),
	ul: mergeComponent(<ul className="my-4 list-disc md:ml-16 ml-8" />),
	ol: mergeComponent(<ol className="my-4 list-decimal md:ml-16 ml-8" />),
	blockquote: mergeComponent(
		<blockquote className="border-l-4 border-gray-300 italic md:mx-8 mx-4 pl-4 md:pl-8" />
	),
};
