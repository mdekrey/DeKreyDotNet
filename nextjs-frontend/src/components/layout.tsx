import React from 'react';
import { withSlots } from 'react-slot-component';

import Header from './header';
import { Footer } from './footer';
import siteMetadata from '../siteMetadata';

export type ReplacementHeaderSlot = {
	children?: React.ReactNode;
};

const Layout = withSlots<{ ReplacementHeaderSlot: ReplacementHeaderSlot }, { children: React.ReactNode }>(
	({ children, slotProps: { ReplacementHeaderSlot } }) => {
		return (
			<div className="flex flex-col min-h-screen font-sans text-gray-900">
				{ReplacementHeaderSlot?.children ? ReplacementHeaderSlot.children : <Header siteTitle={siteMetadata.title} />}

				<main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">{children}</main>

				<Footer />
			</div>
		);
	}
);

export default Layout;
