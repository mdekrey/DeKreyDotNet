import React from 'react';
import { withSlots } from 'react-slot-component';

import Header from './header';
import { Footer } from './footer';
import siteMetadata from '../siteMetadata';

export type NoScrollHeaderSlot = {
	children?: React.ReactNode;
};

const Layout = withSlots<{ NoScrollHeaderSlot: NoScrollHeaderSlot }, { children: React.ReactNode }>(
	({ children, slotProps: { NoScrollHeaderSlot } }) => {
		return (
			<div className="flex flex-col min-h-screen font-sans text-gray-900">
				<Header siteTitle={siteMetadata.title} showOnScroll={!!NoScrollHeaderSlot?.children} />
				{NoScrollHeaderSlot?.children}

				<main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 bg-white relative">{children}</main>

				<Footer />
			</div>
		);
	}
);

export default Layout;
