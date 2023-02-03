import type { ReactNode } from 'react';
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

const MdFirstPage = (
	<svg
		stroke="currentColor"
		fill="currentColor"
		strokeWidth="0"
		viewBox="0 0 24 24"
		className="text-xl"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
		<path fill="none" d="M24 24H0V0h24v24z"></path>
	</svg>
);
const MdChevronLeft = (
	<svg
		stroke="currentColor"
		fill="currentColor"
		strokeWidth="0"
		viewBox="0 0 24 24"
		className="text-xl"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path fill="none" d="M0 0h24v24H0z"></path>
		<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
	</svg>
);
const MdChevronRight = (
	<svg
		stroke="currentColor"
		fill="currentColor"
		strokeWidth="0"
		viewBox="0 0 24 24"
		className="text-xl"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path fill="none" d="M0 0h24v24H0z"></path>
		<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
	</svg>
);
const MdLastPage = (
	<svg
		stroke="currentColor"
		fill="currentColor"
		strokeWidth="0"
		viewBox="0 0 24 24"
		className="text-xl"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path fill="none" d="M0 0h24v24H0V0z"></path>
		<path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
	</svg>
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
					<PageDisplay>{MdFirstPage}</PageDisplay>
					<PageDisplay>{MdChevronLeft}</PageDisplay>
				</>
			) : (
				<>
					<PaginationLink href={path(1)}>{MdFirstPage}</PaginationLink>
					<PaginationLink href={path(page - 1)}>{MdChevronLeft}</PaginationLink>
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
					<PageDisplay>{MdChevronRight}</PageDisplay>
					<PageDisplay>{MdLastPage}</PageDisplay>
				</>
			) : (
				<>
					<PaginationLink href={path(page + 1)}>
						{MdChevronRight}
					</PaginationLink>
					<PaginationLink href={path(pageCount)}>{MdLastPage}</PaginationLink>
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
