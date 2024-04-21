import type { MDXProvider } from '@mdx-js/react';
import type { ComponentProps } from 'react';
import type { ImageMetadata } from 'astro';
import { internalComponents } from './jsx-components';
import { Headings } from '../headings';
import { mergeComponent } from '@/core/jsx/mergeComponent';
import { linkClassName } from '../styles';

export const thoughtComponents: ComponentProps<
	typeof MDXProvider
>['components'] = {
	...internalComponents,
	...Headings.stepDown(2),
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
	a: mergeComponent(<a className={linkClassName} />),
	pre: mergeComponent(<pre className="my-8 p-4 overflow-hidden rounded-lg" />),
	p: mergeComponent(<p className="my-1 font-normal" />),
	li: mergeComponent(<li className="my-1 font-normal" />),
	ul: mergeComponent(<ul className="my-1 list-disc md:ml-16 ml-8" />),
	ol: mergeComponent(<ol className="my-1 list-decimal md:ml-16 ml-8" />),
	blockquote: mergeComponent(
		<blockquote className="border-l-4 border-gray-300 italic md:mx-8 mx-4 pl-4 md:pl-8" />,
	),
};
