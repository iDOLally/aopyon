import { create_app_config } from '🍎/helpers/create-app-config.ts';

const wallpapers = create_app_config({
	title: 'Wallpapers',
	resizable: true,

	height: 600,
	width: 800,
});

const calendar = create_app_config({
	title: 'Calendar',
	resizable: true,

	height: 640,
	width: 800,

	dock_breaks_before: true,
});

const profile = create_app_config({
	title: 'Profile',
	resizable: true,

	height: 600,
	width: 800,
});

export const apps_config = {
	profile,
	calendar,
	wallpapers,
};
