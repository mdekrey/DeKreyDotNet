import siteMetadata from '../../siteMetadata';

export function SourceLink({ path, isTree, ...props }: { path: string; isTree: boolean } & JSX.IntrinsicElements['a']) {
	return (
		<a
			{...props}
			href={`https://github.com/mdekrey/DeKreyDotNet/${isTree ? 'tree' : 'blob'}/${siteMetadata.gitHash}/${path}`}
		/>
	);
}
