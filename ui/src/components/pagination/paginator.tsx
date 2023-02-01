import type { ReactNode } from 'react';
import {
	MdChevronLeft,
	MdChevronRight,
	MdFirstPage,
	MdLastPage,
} from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { linkClassName } from '../styles';
import { createPaginator } from './pagination';

const paginator = createPaginator(1, 1, 2, 2);

const baseClassName: string = (
	<a className="inline-flex h-8 w-8 items-center justify-center font-bold" />
).props.className;

const PaginationLink = ({
	href,
	children,
}: {
	href: string;
	children?: ReactNode;
}) => (
	<a
		href={href}
		className={twMerge(
			baseClassName,
			linkClassName,
			'transition hover:bg-purple-700 hover:text-white'
		)}
	>
		{children}
	</a>
);
const PageDisplay = ({ children }: { children?: ReactNode }) => (
	<span className={twMerge(baseClassName, 'font-bold')}>{children}</span>
);

export function Paginator({
	page,
	pageCount,
	path,
}: {
	page: number;
	pageCount: number;
	path: (page: number) => string;
}) {
	const [
		bookendStart,
		preEllipsis,
		prePage,
		pageMarker,
		postPage,
		postEllipsis,
		bookendEnd,
	] = paginator.pagination(page, pageCount);

	return (
		<div className="flex gap-2">
			{page === 1 ? (
				<>
					<PageDisplay>
						<MdFirstPage className="text-xl" />
					</PageDisplay>
					<PageDisplay>
						<MdChevronLeft className="text-xl" />
					</PageDisplay>
				</>
			) : (
				<>
					<PaginationLink href={path(1)}>
						<MdFirstPage className="text-xl" />
					</PaginationLink>
					<PaginationLink href={path(page - 1)}>
						<MdChevronLeft className="text-xl" />
					</PaginationLink>
				</>
			)}
			{pages(bookendStart)}
			{preEllipsis === '...' ? (
				<PageDisplay>&hellip;</PageDisplay>
			) : (
				pages(preEllipsis)
			)}
			{pages(prePage)}
			<PageDisplay>{pageMarker}</PageDisplay>
			{pages(postPage)}
			{postEllipsis === '...' ? (
				<PageDisplay>&hellip;</PageDisplay>
			) : (
				pages(postEllipsis)
			)}
			{pages(bookendEnd)}
			{page === pageCount ? (
				<>
					<PageDisplay>
						<MdChevronRight className="text-xl" />
					</PageDisplay>
					<PageDisplay>
						<MdLastPage className="text-xl" />
					</PageDisplay>
				</>
			) : (
				<>
					<PaginationLink href={path(page + 1)}>
						<MdChevronRight className="text-xl" />
					</PaginationLink>
					<PaginationLink href={path(pageCount)}>
						<MdLastPage className="text-xl" />
					</PaginationLink>
				</>
			)}
		</div>
	);

	function pages(p: number[]) {
		return p.map((v) => (
			<PaginationLink href={path(v)} key={v}>
				{v}
			</PaginationLink>
		));
	}
}
