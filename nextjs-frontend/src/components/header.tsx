import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { MattDeKreyAvatar } from './avatar';

const mainNavLinks = [
	{
		route: `/about`,
		title: `About`,
	},
	{
		route: `/contact`,
		title: `Contact`,
	},
];

const hideHeaderClass = '-translate-y-full';
const showHeaderClass = 'bg-white';

const Header = ({ siteTitle = '', showOnScroll }: { siteTitle: string; showOnScroll?: boolean }) => {
	const shouldShowHeader = useRef(global && global.scrollY === 0);
	const [isExpanded, toggleExpansion] = React.useState(false);
	const headerRef = useRef<HTMLHeadingElement>();

	useEffect(() => {
		let scrollPosition = window.scrollY;
		function onScroll() {
			const newScrollPosition = window.scrollY;
			if (newScrollPosition < scrollPosition) showHeader();
			else if (newScrollPosition > scrollPosition) hideHeader();

			scrollPosition = newScrollPosition;
		}

		if (showOnScroll) window.addEventListener('scroll', onScroll);
		if (scrollPosition === 0) showHeader();
		if (scrollPosition && showOnScroll) hideHeader();

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
	}, [showOnScroll]);

	return (
		<>
			<header
				className={classNames('z-10 motion-safe:transition-transform ease-in duration-100', {
					[showHeaderClass]: !showOnScroll || shouldShowHeader,
					[hideHeaderClass]: showOnScroll && !shouldShowHeader,
					sticky: !showOnScroll,
					'fixed inset-x-0': showOnScroll,
				})}
				style={{ top: 0 }}
				ref={headerRef}>
				<div className="flex flex-wrap items-center justify-between max-w-4xl p-2 mx-auto">
					<Link href="/">
						<a className="flex items-center gap-3 no-underline font-medium text-gray-900">
							<MattDeKreyAvatar />
							<span className="text-xl font-bold tracking-tight">{siteTitle}</span>
						</a>
					</Link>

					<button
						className="items-center block px-3 py-2 border border-white rounded md:hidden"
						onClick={() => toggleExpansion(!isExpanded)}>
						{/* Mobile hamburger menu */}
						<svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<title>Menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
					</button>

					<nav className={`${isExpanded ? `block` : `hidden`} md:flex md:items-center w-full md:w-auto`}>
						{mainNavLinks.map((link) => (
							<Link key={link.title} href={link.route}>
								<a className="block mt-4 no-underline md:inline-block md:mt-0 md:ml-6">{link.title}</a>
							</Link>
						))}
					</nav>
				</div>
			</header>
			<div
				className={classNames({
					'pt-16': showOnScroll,
				})}></div>
		</>
	);
};

export default Header;
