import { twMerge } from 'tailwind-merge';

export default function FigCaption({
	className,
	...props
}: JSX.IntrinsicElements['figcaption']) {
	return (
		<figcaption
			{...props}
			className={twMerge(
				'mt-2 font-serif text-center text-gray-600 text-sm',
				className
			)}
		/>
	);
}
