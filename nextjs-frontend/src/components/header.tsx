import React from 'react';
import Link from 'next/link';

const Header = ({ siteTitle = '' }: { siteTitle: string }) => {
	const [isExpanded, toggleExpansion] = React.useState(false);

	return (
		<header>
			<div className="flex flex-wrap items-center justify-between max-w-4xl p-4 mx-auto md:p-8">
				<Link href="/">
					<a>
						<h1 className="flex items-center no-underline">
							<span className="text-xl font-bold tracking-tight">{siteTitle}</span>
						</h1>
					</a>
				</Link>

				<button
					className="items-center block px-3 py-2 border border-white rounded md:hidden"
					onClick={() => toggleExpansion(!isExpanded)}>
					{/* Accessibility menu */}
					<svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>

				<nav className={`${isExpanded ? `block` : `hidden`} md:flex md:items-center w-full md:w-auto`}>
					{[
						{
							route: `/about`,
							title: `About`,
						},
						{
							route: `/contact`,
							title: `Contact`,
						},
					].map((link) => (
						<Link key={link.title} href={link.route}>
							<a className="block mt-4 no-underline md:inline-block md:mt-0 md:ml-6">{link.title}</a>
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
};

export default Header;
