const hash = import.meta.env.GIT_HASH ?? 'HEAD';

export function SourceLink({
	path,
	isTree,
	...props
}: { path: string; isTree: boolean } & JSX.IntrinsicElements['a']) {
	return (
		<a
			{...props}
			href={`https://github.com/mdekrey/DeKreyDotNet/${
				isTree ? 'tree' : 'blob'
			}/${hash}/${path}`}
		/>
	);
}
