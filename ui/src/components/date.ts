import { formatRelative } from 'date-fns';

// Converts `data-date={unixMs}` into time-ago text
const elems = document.querySelectorAll('[data-date]') as Iterable<HTMLElement>;
for (const elem of elems) {
	elem.classList.remove('invisible');
	elem.title = elem.innerText;
	elem.innerHTML = formatRelative(Number(elem.dataset.date), new Date(), {});
}
