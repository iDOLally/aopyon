import type { apps_config } from '🍎/configs/apps/apps-config';

export type AppID = keyof typeof apps_config;

export const apps = $state({
	open: {
		profile: true,
		wallpapers: false,
		// safari: false,
		calendar: false,
		// 'system-preferences': false,
	} as Record<AppID, boolean>,

	active: 'profile' satisfies AppID,

	/**
	 * Maximum zIndex for the active app
	 * Initialize with -2, so that it becomes 0 when initialised
	 */
	active_z_index: -2,

	z_indices: {
		profile: 0,
		wallpapers: 0,
		// safari: 0,
		calendar: 0,
		// 'system-preferences': 0,
	} as Record<AppID, number>,

	is_being_dragged: false as boolean,

	fullscreen: {
		profile: false,
		wallpapers: false,
		// safari: false,
		calendar: false,
		// 'system-preferences': false,
	} as Record<AppID, boolean>,

	minimized: {
		profile: false,
		wallpapers: false,
		// safari: false,
		calendar: false,
		// 'system-preferences': false,
	} as Record<AppID, boolean>,
});
