/**
 * Reactive device/viewport info.
 *
 * On mobile we switch the desktop into a "single-tasking" mode where every
 * window is forced fullscreen, so windows can never end up off-screen.
 */
const MOBILE_QUERY = '(max-width: 768px)';

export const device = $state({
	is_mobile: false,
});

if (typeof window !== 'undefined' && 'matchMedia' in window) {
	const mql = window.matchMedia(MOBILE_QUERY);

	device.is_mobile = mql.matches;

	mql.addEventListener('change', (event) => {
		device.is_mobile = event.matches;
	});
}
