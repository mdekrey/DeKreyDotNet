import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function ScrollHeader({
	className,
	showHeaderClass,
	hideHeaderClass,
	children,
}: {
	className?: string;
	showHeaderClass: string;
	hideHeaderClass: string;
	children?: React.ReactNode;
}) {
	const shouldShowHeader = useRef(global && !global.scrollY);
	const headerRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		let scrollPosition = window.scrollY;
		function onScroll() {
			const newScrollPosition = window.scrollY;
			if (newScrollPosition < scrollPosition || newScrollPosition <= 0)
				showHeader();
			else if (newScrollPosition > scrollPosition) hideHeader();

			scrollPosition = newScrollPosition;
		}

		window.addEventListener('scroll', onScroll);
		if (scrollPosition <= 0) showHeader();
		if (scrollPosition) hideHeader();

		return () => {
			window.removeEventListener('scroll', onScroll);
		};

		function hideHeader() {
			headerRef.current?.classList.remove(showHeaderClass);
			headerRef.current?.classList.add(hideHeaderClass);
			shouldShowHeader.current = false;
		}
		function showHeader() {
			headerRef.current?.classList.add(showHeaderClass);
			headerRef.current?.classList.remove(hideHeaderClass);
			shouldShowHeader.current = true;
		}
	}, [showHeaderClass, hideHeaderClass]);

	return (
		<header
			className={twMerge(
				className,
				shouldShowHeader.current ? showHeaderClass : hideHeaderClass,
			)}
			style={{ top: 0 }}
			ref={headerRef}
		>
			{children}
		</header>
	);
}
