import type { ComponentType } from 'react';
import LinkIcon from '@heroicons/react/24/outline/LinkIcon';
import { twMerge } from 'tailwind-merge';

export function IdLink({ id }: { id?: string | undefined }) {
	if (!id) return null;
	return (
		<a href={`#${id}`} className="px-2">
			<LinkIcon className="w-4 h-4 inline opacity-0 group-hover:opacity-100 text-gray-500" />
		</a>
	);
}

export function withIdLink<K extends keyof JSX.IntrinsicElements>(
	Component: ComponentType<JSX.IntrinsicElements[K]> | K,
) {
	return function ComponentWithIdLink({
		id,
		className,
		children,
		...props
	}: JSX.IntrinsicElements[K]) {
		if (typeof Component === 'string') {
			return null;
		}
		return (
			<Component className={twMerge('group', className)} id={id} {...props}>
				{children}
				<IdLink id={id} />
			</Component>
		);
	};
}
