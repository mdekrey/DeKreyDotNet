type PaginationParts = [
	bookendStart: number[],
	preEllipsis: '...' | number[],
	prePage: number[],
	page: number,
	postPage: number[],
	postEllipsis: '...' | number[],
	bookendEnd: number[],
];

export function createPaginator(
	aroundCurrentCount = 2,
	bookendPageCount = 1,
	ellipsisMinimumCount = 2,
	bookendFocusCount = 6, // number of pages to always show trailing/end if current page is close to it.
) {
	function boundaries(currentPage: number, lastPage: number) {
		const startBookendEnd = bookendPageCount + 1;
		const endBookendStart = lastPage - bookendPageCount + 1;

		const startFocusEnd = bookendFocusCount + 1;
		const endFocusStart = lastPage - bookendFocusCount + 1;

		const aroundStart = currentPage - aroundCurrentCount;
		const aroundEnd = currentPage + aroundCurrentCount + 1;

		const preEllipsisStart = Math.max(
			1,
			Math.min(startBookendEnd, aroundStart, endFocusStart),
		);
		const preEllipsisEnd = Math.max(Math.min(endFocusStart, aroundStart), 1);
		const prePageStart = preEllipsisEnd;
		const prePageEnd = currentPage;

		const postPageStart = currentPage + 1;
		const postPageEnd = Math.min(
			Math.max(startFocusEnd, aroundEnd),
			lastPage + 1,
		);
		const postEllipsisStart = postPageEnd;
		const postEllipsisEnd = Math.min(
			lastPage + 1,
			Math.max(postPageEnd, aroundEnd, endBookendStart),
		);

		return {
			preEllipsisStart,
			preEllipsisEnd,
			prePageStart,
			prePageEnd,
			postPageStart,
			postPageEnd,
			postEllipsisStart,
			postEllipsisEnd,
		};
	}

	return {
		boundaries,
		pagination(currentPage: number, lastPage: number): PaginationParts {
			const {
				preEllipsisStart,
				preEllipsisEnd,
				prePageStart,
				prePageEnd,
				postPageStart,
				postPageEnd,
				postEllipsisStart,
				postEllipsisEnd,
			} = boundaries(currentPage, lastPage);

			const parts: PaginationParts = [
				range(1, preEllipsisStart),
				preEllipsisStart + Math.max(1, ellipsisMinimumCount) <= preEllipsisEnd
					? '...'
					: range(preEllipsisStart, preEllipsisEnd),
				range(prePageStart, prePageEnd),
				currentPage,
				range(postPageStart, postPageEnd),
				postEllipsisStart + Math.max(1, ellipsisMinimumCount) <= postEllipsisEnd
					? '...'
					: range(postEllipsisStart, postEllipsisEnd),
				range(postEllipsisEnd, lastPage + 1),
			];

			function range(start: number, endExclusive: number) {
				return Array(Math.max(endExclusive - start, 0))
					.fill(0)
					.map((_, index) => index + start);
			}
			return parts;
		},
	};
}
