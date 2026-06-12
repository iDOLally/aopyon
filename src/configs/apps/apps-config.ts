import { create_app_config } from '🍎/helpers/create-app-config.ts';

const wallpapers = create_app_config({
	title: '壁紙',
	resizable: true,

	height: 600,
	width: 800,
});

const calendar = create_app_config({
	title: 'カレンダー',
	resizable: true,

	height: 640,
	width: 1000,
});

const spp = create_app_config({
	title: '撮影会',
	resizable: true,

	height: 800,
	width: 800,

	dock_breaks_before: true,
});

const profile = create_app_config({
	title: '宮澤葵',
	resizable: true,

	height: 600,
	width: 800,
});

export const apps_config = {
	profile,
	spp,
	calendar,
	wallpapers,
};
