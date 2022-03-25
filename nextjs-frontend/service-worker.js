// remove the old service worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.ready.then(function (registration) {
		registration.unregister();
	});
}
