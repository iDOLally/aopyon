<script lang="ts">
	import { preferences } from '🍎/state/preferences.svelte.ts';

	const calendar_src =
		'https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTokyo&showPrint=0&showTitle=0&src=YnJuMzBma2xwNzYzNjA4czRzdWc3bjg2OGNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=c3BwaWRvbEBnbWFpbC5jb20&src=amEuamFwYW5lc2UjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23009688&color=%23d81b60&color=%23e67c73';
</script>

<section class="container" class:dark={preferences.theme.scheme === 'dark'}>
	<header class="app-window-drag-handle titlebar"></header>

	<section class="main-area">
		<iframe
			title="Google Calendar"
			src={calendar_src}
			width="100%"
			height="600"
			frameborder="0"
			scrolling="no"
		></iframe>
	</section>
</section>

<style>
	.container {
		--title-bar-height: 2.5rem;

		background-color: var(--system-color-light);

		border-radius: inherit;

		overflow: hidden;

		&.dark {
			box-shadow:
				inset 0 0 0 0.9px hsla(var(--system-color-dark-hsl), 0.2),
				0 0 0 1.5px hsla(var(--system-color-light-hsl), 0.5);
		}
	}

	.titlebar {
		padding: 1rem 1rem;

		width: 100%;
		height: var(--title-bar-height);

		position: absolute;
		top: 0;
		left: 0;
	}

	.main-area {
		margin-top: var(--title-bar-height);

		height: calc(100% - var(--title-bar-height));
		width: 100%;

		overflow: hidden;

		display: flex;
		flex-direction: column;
	}

	iframe {
		border: solid 1px #777;
		width: 100%;
		height: 100%;
		flex: 1;
	}
</style>
