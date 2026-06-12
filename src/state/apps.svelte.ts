import type { apps_config } from '🍎/configs/apps/apps-config';

export type AppID = keyof typeof apps_config;

export const apps = $state({
	open: {
		wallpapers: false,
		finder: true,
		// safari: false,
		calendar: false,
		// 'system-preferences': false,

		'purus-twitter': false,
	} as Record<AppID, boolean>,

	active: 'finder' satisfies AppID,

	/**
	 * Maximum zIndex for the active app
	 * Initialize with -2, so that it becomes 0 when initialised
	 */
	active_z_index: -2,

	z_indices: {
		wallpapers: 0,
		finder: 0,
		// safari: 0,
		calendar: 0,
		// 'system-preferences': 0,

		'purus-twitter': 0,
	} as Record<AppID, number>,

	is_being_dragged: false as boolean,

	fullscreen: {
		wallpapers: false,
		finder: false,
		// safari: false,
		calendar: false,
		// 'system-preferences': false,

		'purus-twitter': false,
	} as Record<AppID, boolean>,
});
