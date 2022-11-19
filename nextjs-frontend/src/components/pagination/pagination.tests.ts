import { createPaginator } from './pagination';

describe('pagination', () => {
	describe('defaults', () => {
		const paginator = createPaginator();
		describe('for 1 page', () => {
			describe('at page 1', () => {
				const pageNumber = 1,
					pages = 1;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.prePageEnd).toBeLessThanOrEqual(boundaries.prePageStart);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(2);
					expect(boundaries.postPageEnd).toBe(2);
					expect(boundaries.postEllipsisStart).toBe(2);
					expect(boundaries.postEllipsisEnd).toBe(2);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('*1*');
				});
			});
		});
		describe('for 3 pages', () => {
			describe('at page 1', () => {
				const pageNumber = 1,
					pages = 3;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.prePageEnd).toBeLessThanOrEqual(boundaries.prePageStart);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(2);
					expect(boundaries.postPageEnd).toBe(4);
					expect(boundaries.postEllipsisStart).toBe(4);
					expect(boundaries.postEllipsisEnd).toBe(4);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('*1*  2  3');
				});
			});
			describe('at page 3', () => {
				const pageNumber = 3,
					pages = 3;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.preEllipsisEnd).toBe(1);
					expect(boundaries.prePageStart).toBe(1);
					expect(boundaries.prePageEnd).toBe(3);
					expect(boundaries.postPageEnd).toBeLessThanOrEqual(boundaries.postPageStart);
					expect(boundaries.postEllipsisEnd).toBeLessThanOrEqual(boundaries.postEllipsisStart);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  2  *3*');
				});
			});
		});
		describe('for 5 pages', () => {
			describe('at page 1', () => {
				const pageNumber = 1,
					pages = 5;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.prePageEnd).toBeLessThanOrEqual(boundaries.prePageStart);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(2);
					expect(boundaries.postPageEnd).toBe(6);
					expect(boundaries.postEllipsisStart).toBe(6);
					expect(boundaries.postEllipsisEnd).toBe(6);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('*1*  2  3  4  5');
				});
			});
			describe('at page 5', () => {
				const pageNumber = 5,
					pages = 5;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.preEllipsisEnd).toBe(1);
					expect(boundaries.prePageStart).toBe(1);
					expect(boundaries.prePageEnd).toBe(5);
					expect(boundaries.postPageEnd).toBeLessThanOrEqual(boundaries.postPageStart);
					expect(boundaries.postEllipsisEnd).toBeLessThanOrEqual(boundaries.postEllipsisStart);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  2  3  4  *5*');
				});
			});
		});
		describe('for 121 pages', () => {
			describe('at page 1', () => {
				const pageNumber = 1,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.prePageEnd).toBeLessThanOrEqual(boundaries.prePageStart);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(2);
					expect(boundaries.postPageEnd).toBe(7);
					expect(boundaries.postEllipsisStart).toBe(7);
					expect(boundaries.postEllipsisEnd).toBe(121);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('*1*  2  3  4  5  6  ...  121');
				});
			});
			describe('at page 2', () => {
				const pageNumber = 2,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.prePageStart).toBe(1);
					expect(boundaries.prePageEnd).toBe(2);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(3);
					expect(boundaries.postPageEnd).toBe(7);
					expect(boundaries.postEllipsisStart).toBe(7);
					expect(boundaries.postEllipsisEnd).toBe(121);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  *2*  3  4  5  6  ...  121');
				});
			});
			describe('at page 3', () => {
				const pageNumber = 3,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.prePageStart).toBe(1);
					expect(boundaries.prePageEnd).toBe(3);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(4);
					expect(boundaries.postPageEnd).toBe(7);
					expect(boundaries.postEllipsisStart).toBe(7);
					expect(boundaries.postEllipsisEnd).toBe(121);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  2  *3*  4  5  6  ...  121');
				});
			});
			describe('at page 4', () => {
				const pageNumber = 4,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(2);
					expect(boundaries.prePageStart).toBe(2);
					expect(boundaries.prePageEnd).toBe(4);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(5);
					expect(boundaries.postPageEnd).toBe(7);
					expect(boundaries.postEllipsisStart).toBe(7);
					expect(boundaries.postEllipsisEnd).toBe(121);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  2  3  *4*  5  6  ...  121');
				});
			});
			describe('at page 5', () => {
				const pageNumber = 5,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(2);
					expect(boundaries.preEllipsisEnd).toBe(3);
					expect(boundaries.prePageStart).toBe(3);
					expect(boundaries.prePageEnd).toBe(5);
					expect(boundaries.postPageStart).toBe(6);
					expect(boundaries.postPageEnd).toBe(8);
					expect(boundaries.postEllipsisStart).toBe(8);
					expect(boundaries.postEllipsisEnd).toBe(121);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  2  3  4  *5*  6  7  ...  121');
				});
			});
			describe('at page 6', () => {
				const pageNumber = 6,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(2);
					expect(boundaries.preEllipsisEnd).toBe(4);
					expect(boundaries.prePageStart).toBe(4);
					expect(boundaries.prePageEnd).toBe(6);
					expect(boundaries.postPageStart).toBe(7);
					expect(boundaries.postPageEnd).toBe(9);
					expect(boundaries.postEllipsisStart).toBe(9);
					expect(boundaries.postEllipsisEnd).toBe(121);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  ...  4  5  *6*  7  8  ...  121');
				});
			});
			describe('at page 116', () => {
				const pageNumber = 116,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(2);
					expect(boundaries.preEllipsisEnd).toBe(114);
					expect(boundaries.prePageStart).toBe(114);
					expect(boundaries.prePageEnd).toBe(116);
					expect(boundaries.postPageEnd).toBe(119);
					expect(boundaries.postEllipsisStart).toBe(119);
					expect(boundaries.postEllipsisEnd).toBe(121);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  ...  114  115  *116*  117  118  ...  121');
				});
			});
			describe('at page 117', () => {
				const pageNumber = 117,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(2);
					expect(boundaries.preEllipsisEnd).toBe(115);
					expect(boundaries.prePageStart).toBe(115);
					expect(boundaries.prePageEnd).toBe(117);
					expect(boundaries.postPageEnd).toBe(120);
					expect(boundaries.postEllipsisStart).toBe(120);
					expect(boundaries.postEllipsisEnd).toBe(121);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  ...  115  116  *117*  118  119  120  121');
				});
			});
			describe('at page 118', () => {
				const pageNumber = 118,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(2);
					expect(boundaries.preEllipsisEnd).toBe(116);
					expect(boundaries.prePageStart).toBe(116);
					expect(boundaries.prePageEnd).toBe(118);
					expect(boundaries.postPageEnd).toBe(121);
					expect(boundaries.postEllipsisEnd).toBeLessThanOrEqual(boundaries.postEllipsisStart);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  ...  116  117  *118*  119  120  121');
				});
			});
			describe('at page 119', () => {
				const pageNumber = 119,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(2);
					expect(boundaries.preEllipsisEnd).toBe(116);
					expect(boundaries.prePageStart).toBe(116);
					expect(boundaries.prePageEnd).toBe(119);
					expect(boundaries.postPageEnd).toBe(122);
					expect(boundaries.postEllipsisEnd).toBeLessThanOrEqual(boundaries.postEllipsisStart);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  ...  116  117  118  *119*  120  121');
				});
			});
			describe('at page 120', () => {
				const pageNumber = 120,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(2);
					expect(boundaries.preEllipsisEnd).toBe(116);
					expect(boundaries.prePageStart).toBe(116);
					expect(boundaries.prePageEnd).toBe(120);
					expect(boundaries.postPageEnd).toBe(122);
					expect(boundaries.postEllipsisEnd).toBeLessThanOrEqual(boundaries.postEllipsisStart);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  ...  116  117  118  119  *120*  121');
				});
			});
			describe('at page 121', () => {
				const pageNumber = 121,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(2);
					expect(boundaries.preEllipsisEnd).toBe(116);
					expect(boundaries.prePageStart).toBe(116);
					expect(boundaries.prePageEnd).toBe(121);
					expect(boundaries.postPageEnd).toBeLessThanOrEqual(boundaries.postPageStart);
					expect(boundaries.postEllipsisEnd).toBeLessThanOrEqual(boundaries.postEllipsisStart);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  ...  116  117  118  119  120  *121*');
				});
			});
		});
	});

	describe('no bookends', () => {
		const paginator = createPaginator(2, 0, 1, 0);
		describe('for 121 pages', () => {
			describe('at page 1', () => {
				const pageNumber = 1,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.prePageEnd).toBeLessThanOrEqual(boundaries.prePageStart);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(2);
					expect(boundaries.postPageEnd).toBe(4);
					expect(boundaries.postEllipsisStart).toBe(4);
					expect(boundaries.postEllipsisEnd).toBe(122);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('*1*  2  3  ...');
				});
			});
			describe('at page 2', () => {
				const pageNumber = 2,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.prePageStart).toBe(1);
					expect(boundaries.prePageEnd).toBe(2);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(3);
					expect(boundaries.postPageEnd).toBe(5);
					expect(boundaries.postEllipsisStart).toBe(5);
					expect(boundaries.postEllipsisEnd).toBe(122);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  *2*  3  4  ...');
				});
			});
			describe('at page 3', () => {
				const pageNumber = 3,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.prePageStart).toBe(1);
					expect(boundaries.prePageEnd).toBe(3);
					expect(boundaries.preEllipsisEnd).toBeLessThanOrEqual(boundaries.preEllipsisStart);
					expect(boundaries.postPageStart).toBe(4);
					expect(boundaries.postPageEnd).toBe(6);
					expect(boundaries.postEllipsisStart).toBe(6);
					expect(boundaries.postEllipsisEnd).toBe(122);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('1  2  *3*  4  5  ...');
				});
			});
			describe('at page 4', () => {
				const pageNumber = 4,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.prePageStart).toBe(2);
					expect(boundaries.prePageEnd).toBe(4);
					expect(boundaries.preEllipsisEnd).toBe(boundaries.prePageStart);
					expect(boundaries.postPageStart).toBe(5);
					expect(boundaries.postPageEnd).toBe(7);
					expect(boundaries.postEllipsisStart).toBe(boundaries.postPageEnd);
					expect(boundaries.postEllipsisEnd).toBe(122);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('...  2  3  *4*  5  6  ...');
				});
			});
			describe('at page 5', () => {
				const pageNumber = 5,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.preEllipsisEnd).toBe(3);
					expect(boundaries.prePageStart).toBe(3);
					expect(boundaries.prePageEnd).toBe(5);
					expect(boundaries.postPageStart).toBe(6);
					expect(boundaries.postPageEnd).toBe(8);
					expect(boundaries.postEllipsisStart).toBe(8);
					expect(boundaries.postEllipsisEnd).toBe(122);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('...  3  4  *5*  6  7  ...');
				});
			});
			describe('at page 118', () => {
				const pageNumber = 118,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.preEllipsisEnd).toBe(116);
					expect(boundaries.prePageStart).toBe(116);
					expect(boundaries.prePageEnd).toBe(118);
					expect(boundaries.postPageEnd).toBe(121);
					expect(boundaries.postEllipsisStart).toBe(boundaries.postPageEnd);
					expect(boundaries.postEllipsisEnd).toBe(122);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('...  116  117  *118*  119  120  ...');
				});
			});
			describe('at page 119', () => {
				const pageNumber = 119,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.preEllipsisEnd).toBe(117);
					expect(boundaries.prePageStart).toBe(117);
					expect(boundaries.prePageEnd).toBe(119);
					expect(boundaries.postPageEnd).toBe(122);
					expect(boundaries.postEllipsisEnd).toBeLessThanOrEqual(boundaries.postEllipsisStart);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('...  117  118  *119*  120  121');
				});
			});
			describe('at page 120', () => {
				const pageNumber = 120,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.preEllipsisEnd).toBe(118);
					expect(boundaries.prePageStart).toBe(118);
					expect(boundaries.prePageEnd).toBe(120);
					expect(boundaries.postPageEnd).toBe(122);
					expect(boundaries.postEllipsisEnd).toBeLessThanOrEqual(boundaries.postEllipsisStart);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('...  118  119  *120*  121');
				});
			});
			describe('at page 121', () => {
				const pageNumber = 121,
					pages = 121;
				it('has expected boundaries', () => {
					const boundaries = paginator.boundaries(pageNumber, pages);
					expect(boundaries.preEllipsisStart).toBe(1);
					expect(boundaries.preEllipsisEnd).toBe(119);
					expect(boundaries.prePageStart).toBe(119);
					expect(boundaries.prePageEnd).toBe(121);
					expect(boundaries.postPageEnd).toBeLessThanOrEqual(boundaries.postPageStart);
					expect(boundaries.postEllipsisEnd).toBeLessThanOrEqual(boundaries.postEllipsisStart);
				});
				it('matches expectation', () => {
					expect(
						paginator
							.pagination(pageNumber, pages)
							.flatMap<string | number>((arr) => arr)
							.join('  ')
					).toBe('...  119  120  *121*');
				});
			});
		});
	});

	describe('from docs', () => {
		it('handles aroundCurrentCount=2, bookendPageCount=0, ellipsisMinimumCount=0, bookendFocusCount=0', () => {
			const paginator = createPaginator(2, 0, 0, 0);
			expect(toLayout(paginator, 1, 5)).toBe('*1*  2  3  ...');
			expect(toLayout(paginator, 2, 5)).toBe('1  *2*  3  4  ...');
			expect(toLayout(paginator, 3, 5)).toBe('1  2  *3*  4  5');
			expect(toLayout(paginator, 4, 5)).toBe('...  2  3  *4*  5');
			expect(toLayout(paginator, 5, 5)).toBe('...  3  4  *5*');
		});

		it('handles aroundCurrentCount=2, bookendPageCount=2, ellipsisMinimumCount=0, bookendFocusCount=0', () => {
			const paginator = createPaginator(2, 2, 0, 0);
			expect(toLayout(paginator, 80, 121)).toBe('1  2  ...  78  79  *80*  81  82  ...  120  121');
		});

		it('handles aroundCurrentCount=2, bookendPageCount=2, ellipsisMinimumCount=3, bookendFocusCount=0', () => {
			const paginator = createPaginator(2, 2, 3, 0);
			expect(toLayout(paginator, 7, 8)).toBe('1  2  3  4  5  6  *7*  8');
			expect(toLayout(paginator, 8, 8)).toBe('1  2  ...  6  7  *8*');
		});
		it('handles aroundCurrentCount=2, bookendPageCount=1, ellipsisMinimumCount=2, bookendFocusCount=5', () => {
			const paginator = createPaginator(2, 1, 2, 5);
			expect(toLayout(paginator, 1, 9)).toBe('*1*  2  3  4  5  ...  9');
			expect(toLayout(paginator, 3, 9)).toBe('1  2  *3*  4  5  ...  9');
			expect(toLayout(paginator, 4, 9)).toBe('1  2  3  *4*  5  6  ...  9');
		});

		function toLayout(paginator: ReturnType<typeof createPaginator>, pageNumber: number, pages: number) {
			return paginator
				.pagination(pageNumber, pages)
				.flatMap<string | number>((arr) => arr)
				.join('  ');
		}
	});
});
