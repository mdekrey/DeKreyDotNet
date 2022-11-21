import React from 'react';
import fullUrl from 'src/images/full.jpg';
import styles from './intro-block.module.css';
import classNames from 'classnames';

import { MdToggleOff } from 'react-icons/md';

export function IntroBlock() {
	return (
		<div
			className={classNames(
				'flex flex-col items-center md:flex-row md:items-start md:justify-center max-h-screen overflow-hidden mx-auto max-w-4xl sticky top-0 px-4 md:px-8 -z-10',
				styles['post-blur']
			)}>
			<div className="flex flex-col flex-shrink-0 mt-8 md:mt-[15min]">
				<h1 className="text-2xl md:text-left font-bold">
					Hey, <br />
					<span className="text-purple-700 text-4xl">I'm Matt DeKrey!</span>
				</h1>
				<p className="text-xs">MAT deh-KRAY</p>
				<p className="text-xs">/mæt d&#x026A;&#x02c8;kre&#x026A;/</p>
				<p className="text-xs">he/him</p>

				<p className="text-sm">
					<MdToggleOff className="text-red-700 text-[36px] inline-block" /> Not available for contracting
				</p>
			</div>
			<div
				className="max-w-screen md:flex-shrink-default bg-contain bg-no-repeat h-[100vmin] w-[100vmin] md:h-[60vmin] md:w-[80vmin]"
				style={{
					backgroundImage: `url(${fullUrl.src})`,
					backgroundPosition: '50% bottom',
				}}
			/>
		</div>
	);
}
