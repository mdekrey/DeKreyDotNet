import React from 'react';
import { withSlots } from 'react-slot-component';

import Header from './header';
import { Footer } from './footer';
import siteMetadata from '../siteMetadata';
import { twMerge } from 'tailwind-merge';

export type NoScrollHeaderSlot = {
	children?: React.ReactNode;
};
export type MainSlot = {
	className?: string;
	children?: React.ReactNode;
};
export type FooterSlot = {
	className?: string;
};

const Layout = withSlots<
	{ NoScrollHeaderSlot: NoScrollHeaderSlot; Main: MainSlot; Footer: FooterSlot },
	{ children: React.ReactNode }
>(({ children, slotProps: { NoScrollHeaderSlot, Main, Footer: FooterSlot } }) => {
	return (
		<div className="flex flex-col min-h-screen font-sans text-gray-900">
			<Header siteTitle={siteMetadata.title} />
			{NoScrollHeaderSlot?.children}

			<main
				className={twMerge(
					'flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 bg-white relative',
					Main?.className
				)}>
				{Main?.children ?? children}
			</main>

			<Footer className={twMerge('bg-white', FooterSlot?.className)} />
		</div>
	);
});

export default Layout;
