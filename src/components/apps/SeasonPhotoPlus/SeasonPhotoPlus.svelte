<script lang="ts">
	import { preferences } from '🍎/state/preferences.svelte.ts';
	import RefreshIcon from '~icons/mdi/refresh';

	const spp_src = 'https://s-pp.net';

	let iframeEl: HTMLIFrameElement;
	let loading = $state(false);

	function reload() {
		loading = true;
		iframeEl.src = spp_src;
	}
</script>

<section class="container" class:dark={preferences.theme.scheme === 'dark'}>
	<header class="app-window-drag-handle titlebar">
		<span class="title">撮影会</span>

		<button
			type="button"
			class="reload"
			class:loading
			title="リロード"
			aria-label="リロード"
			disabled={loading}
			onclick={reload}
		>
			<RefreshIcon />
		</button>
	</header>

	<section class="main-area">
		<iframe
			bind:this={iframeEl}
			title="Season Photo Plus"
			src={spp_src}
			width="100%"
			height="100%"
			frameborder="0"
			onload={() => (loading = false)}
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

	.reload {
		position: absolute;
		top: 50%;
		right: 0.7rem;
		transform: translateY(-50%);

		display: flex;
		align-items: center;
		justify-content: center;

		height: 1.7rem;
		width: 1.7rem;

		border-radius: 0.4rem;

		color: hsla(var(--system-color-dark-hsl), 0.75);

		transition: background-color 100ms ease;

		&:hover {
			background-color: hsla(var(--system-color-dark-hsl), 0.12);
			color: var(--system-color-dark);
		}

		&.loading {
			cursor: default;
		}

		:global(svg) {
			height: 1rem;
			width: 1rem;
		}

		&.loading :global(svg) {
			animation: reload-spin 0.7s linear infinite;
		}
	}

	@keyframes reload-spin {
		to {
			transform: rotate(360deg);
		}
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
