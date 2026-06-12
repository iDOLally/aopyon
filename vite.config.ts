import { svelte } from '@sveltejs/vite-plugin-svelte';
import UnpluginIcons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { VitePWA } from 'vite-plugin-pwa';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

import { prefetch } from './prefetch-plugin';

export default defineConfig({
	plugins: [
		svelte(),
		prefetch(),

		UnpluginIcons({ autoInstall: true, compiler: 'svelte' }),
		VitePWA({
			includeAssets: [
				'robots.txt',
				'profile/avatar.jpg',
				'cover-image.png',
				'cursors/(normal|link|text|help)-select.svg',
				'**/*.mp3',
			],
			manifest: {
				name: '宮澤葵',
				theme_color: '#9edbff',
				icons: [
					{
						src: 'profile/avatar.jpg',
						sizes: '400x400',
						type: 'image/jpeg',
					},
				],
			},
		}),
		imagetools({}),
	],
	resolve: {
		alias: {
			'🍎': new URL('./src/', import.meta.url).pathname,
		},
	},
	build: {
		minify: 'terser',
		cssMinify: 'lightningcss',
	},
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('defaults, not IE 11, not IE_Mob 11, not dead')),
		},
	},
});
