<script lang="ts">
	import { preferences } from '🍎/state/preferences.svelte.ts';

	const spp_src = 'https://s-pp.net';
</script>

<section class="container" class:dark={preferences.theme.scheme === 'dark'}>
	<header class="app-window-drag-handle titlebar">
		<span class="title">撮影会</span>
	</header>

	<section class="main-area">
		<iframe title="Season Photo Plus" src={spp_src} width="100%" height="100%" frameborder="0"
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

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title {
		color: var(--system-color-dark);
		font-family: var(--system-font-family);
		font-size: 0.9rem;
		font-weight: 500;

		/* Don't swallow drag events meant for the title bar. */
		pointer-events: none;
		user-select: none;
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
		border: none;
		width: 100%;
		height: 100%;
		flex: 1;
	}
</style>
