import { twMerge } from 'tailwind-merge';

export function mergeComponent<
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
