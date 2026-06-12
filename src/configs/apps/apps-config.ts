import { create_app_config } from '🍎/helpers/create-app-config.ts';

const wallpapers = create_app_config({
	title: 'Wallpapers',
	resizable: true,

	height: 600,
	width: 800,

	dock_breaks_before: true,
});

const calendar = create_app_config({
	title: 'Calendar',
	resizable: true,
});

const finder = create_app_config({
	title: 'Finder',
	resizable: true,

	// dockBreaksBefore: true,
	should_open_window: false,
});

const safari = create_app_config({
	title: 'Safari',
	resizable: true,
});

const systemPreferences = create_app_config({
	title: 'System Preferences',
	resizable: true,
});

const purusTwitter = create_app_config({
	title: `About the Developer`,
	resizable: true,

	dock_breaks_before: true,

	height: 600,
	width: 800,
});

export const apps_config = {
	finder,
	wallpapers,
	calendar,
	// safari,

	// 'system-preferences': systemPreferences,

	'purus-twitter': purusTwitter,
};
