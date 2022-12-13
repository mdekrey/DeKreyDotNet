import { name as isIdentifierName } from 'estree-util-is-identifier-name';
import { valueToEstree } from 'estree-util-value-to-estree';
import { visit } from 'unist-util-visit';

export default function toExcerpt({ attribute = 'excerpt' } = {}) {
	if (!isIdentifierName(attribute)) {
		throw new Error(`The name should be a valid identifier name, got: ${JSON.stringify(attribute)}`);
	}

	return (info, file) => {
		let text = '';

		visit(info, ['text', 'code'], (node) => {
			text += node.value;
		});

		const excerpt = text.split(/\s/g).splice(0, 25).join(' ') + '...';
		file.data[attribute] = excerpt;

		// makes it an export in mdx files
		info.children.unshift({
			type: 'mdxjsEsm',
			data: {
				estree: {
					type: 'Program',
					sourceType: 'module',
					body: [
						{
							type: 'ExportNamedDeclaration',
							source: null,
							specifiers: [],
							declaration: {
								type: 'VariableDeclaration',
								kind: 'const',
								declarations: [
									{
										type: 'VariableDeclarator',
										id: { type: 'Identifier', name: attribute },
										init: valueToEstree(excerpt),
									},
								],
							},
						},
					],
				},
			},
		});
	};
}

// async function getExcerpt(file: string) {
// 	const content = file.split('\n');
// 	const start = skipWhile(0, true);
// 	const end = skipWhile(start, false);
// 	const excerptParagraph = content.slice(start, end).join('\n');
// 	const limited = (await remark().use(strip).process(excerptParagraph)).toString().split(' ').splice(0, 25).join(' ');
// 	const result = limited === excerptParagraph ? excerptParagraph : limited + '...';

// 	return result || '';

// 	function skipWhile(startAt: number, isMarkdown: boolean) {
// 		let result = startAt;
// 		while (result < content.length) {
// 			if (isMarkdown && content[result].match(/^[a-zA-Z]/) && !content[result].startsWith('import')) break;
// 			if (!isMarkdown && (!content[result].match(/^[a-zA-Z]/) || content[result].startsWith('import'))) break;
// 			result++;
// 		}
// 		return result;
// 	}
// }
