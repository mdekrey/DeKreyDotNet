import { twMerge } from 'tailwind-merge';

export default function FigCaption({
	className,
	...props
}: JSX.IntrinsicElements['figcaption']) {
	return (
		<figcaption
			{...props}
			className={twMerge(
				'text-xs text-gray-600 flex justify-center',
				className
			)}
		/>
	);
}
