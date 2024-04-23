import { formatRelative, parse } from 'date-fns';

// Converts `data-datetime={unixMs}` into a relative date
export function applyDateTime() {
	const elems = document.querySelectorAll<HTMLElement>('[data-datetime]');
	for (const elem of elems) {
		elem.classList.remove('invisible');
		elem.title = elem.innerText;
		elem.innerHTML = formatRelative(
			Number(elem.dataset.datetime),
			new Date(),
			{},
		);
	}
}

export function applyDate() {
	const elems = document.querySelectorAll<HTMLElement>('[data-date]');
	for (const elem of elems) {
		elem.classList.remove('invisible');
		elem.title = elem.innerText;
		elem.innerHTML = formatRelative(
			parse(elem.dataset.date!, 'yyyy-MM-dd', new Date()),
			new Date(),
			{},
		);
	}
}
