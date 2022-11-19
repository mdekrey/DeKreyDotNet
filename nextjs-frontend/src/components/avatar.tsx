import React from 'react';
import headshotUrl from 'src/images/headshot.jpg';

export function MattDeKreyAvatar() {
	return (
		<img src={headshotUrl.src} className="rounded-full items-center justify-center w-10 h-10 inline-block" alt="" />
	);
}
