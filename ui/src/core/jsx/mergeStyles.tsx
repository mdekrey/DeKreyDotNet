import { cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';
import type { JsxMutator } from './pipeJsx';

export function mergeStyles(template: JSX.Element): JsxMutator {
	return (previous) =>
		cloneElement(previous, {
			...previous.props,
			className: twMerge(template.props.className, previous.props.className),
			style: {
				...(template.props.style || {}),
				...(previous.props.style || {}),
			},
		});
}
