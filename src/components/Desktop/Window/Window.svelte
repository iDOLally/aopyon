<script lang="ts">
	import {
		bounds,
		BoundsFrom,
		Compartment,
		ControlFrom,
		controls,
		disabled,
		draggable,
		events,
		position,
	} from '@neodrag/svelte';
	import { onMount, tick, untrack } from 'svelte';
	import { sineInOut } from 'svelte/easing';
	import { elevation } from '🍎/actions';
	import { apps_config } from '🍎/configs/apps/apps-config.ts';
	import { rand_int } from '🍎/helpers/random.ts';
	import { sleep } from '🍎/helpers/sleep';
	import { apps, type AppID } from '🍎/state/apps.svelte.ts';
	import { device } from '🍎/state/device.svelte.ts';
	import { preferences } from '🍎/state/preferences.svelte.ts';

	import AppNexus from '../../apps/AppNexus.svelte';
	import TrafficLights from './TrafficLights.svelte';

	const { app_id }: { app_id: AppID } = $props();

	let dragging_enabled = $state(true);

	let is_maximized = $state(false);
	let minimized_translate = $state<string>();

	let windowEl = $state<HTMLElement>();

	const { height, width } = apps_config[app_id];

	const remModifier = +height * 1.2 >= window.innerHeight ? 24 : 16;

	const randX = rand_int(-600, 600);
	const randY = rand_int(-100, 100);

	let defaultPosition = {
		x: (document.body.clientWidth / 2 + randX) / 2,
		y: (100 + randY) / 2,
	};

	const disabledComp = Compartment.of(() => disabled(!dragging_enabled || device.is_mobile));

	function nextFrame() {
		return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
	}

	$effect(() => {
		apps.active_z_index;

		if (apps.active === app_id) {
			untrack(() => (apps.z_indices[app_id] = apps.active_z_index));
		}
	});

	function focusApp() {
		apps.active = app_id;
	}

	function windowTransition(
		el: HTMLElement,
		{ duration = preferences.reduced_motion ? 0 : 300 }: SvelteTransitionConfig = {},
	): SvelteTransitionReturnType {
		const existingTransform = getComputedStyle(el).transform;
		// `transform: none scale(t)` is invalid CSS, so drop "none" — otherwise
		// the scale is silently ignored.
		const base = existingTransform === 'none' ? '' : `${existingTransform} `;

		return {
			duration,
			easing: sineInOut,
			// Animating transform every frame on open also forces Safari to repaint
			// the freshly-mounted window's compositing layer, which otherwise renders
			// transparent until the window is moved (dark mode shows through).
			css: (t) => `opacity: ${t}; transform: ${base}scale(${t})`,
		};
	}

	async function maximizeApp() {
		// On mobile every window is already forced fullscreen via CSS, so the
		// maximize button is a no-op — toggling fullscreen state here would only
		// trip the dock's auto-hide logic.
		if (device.is_mobile) return;

		if (!preferences.reduced_motion) {
			windowEl.style.transition = 'height 0.3s ease, width 0.3s ease, translate 0.3s ease';
		}

		if (!is_maximized) {
			minimized_translate = windowEl.style.translate;
			dragging_enabled = false;

			await tick();
			await nextFrame();

			windowEl.style.translate = '0px 0px 0px';

			windowEl.style.width = `100%`;
			// windowEl.style.height = 'calc(100vh - 1.7rem - 5.25rem)';
			windowEl.style.height = 'calc(100vh - 1.7rem)';
		} else {
			dragging_enabled = true;
			windowEl.style.translate = minimized_translate ?? '';

			windowEl.style.width = `${+width / remModifier}rem`;
			windowEl.style.height = `${+height / remModifier}rem`;
		}

		is_maximized = !is_maximized;

		apps.fullscreen[app_id] = is_maximized;

		await sleep(300);

		if (!preferences.reduced_motion) windowEl.style.transition = '';
	}

	function closeApp() {
		apps.open[app_id] = false;
		apps.fullscreen[app_id] = false;
		apps.minimized[app_id] = false;
	}

	const MINIMIZE_DURATION = 400;

	async function minimizeApp() {
		if (!windowEl) return;

		// Compute a genie-like target: shrink the window toward its dock icon.
		const dockIcon = document.querySelector(`.dock-open-app-button.${app_id} img`);
		const winRect = windowEl.getBoundingClientRect();

		let target_transform = 'scale(0.2)';
		if (dockIcon) {
			const dockRect = dockIcon.getBoundingClientRect();
			const dx = dockRect.left + dockRect.width / 2 - (winRect.left + winRect.width / 2);
			const dy = dockRect.top + dockRect.height / 2 - (winRect.top + winRect.height / 2);
			target_transform = `translate(${dx}px, ${dy}px) scale(0.05)`;
		}

		if (!preferences.reduced_motion) {
			windowEl.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
		}

		await nextFrame();

		windowEl.style.transformOrigin = 'bottom center';
		windowEl.style.transform = `translateZ(0) ${target_transform}`;
		windowEl.style.opacity = '0';

		await sleep(preferences.reduced_motion ? 0 : MINIMIZE_DURATION);

		// Keep the window mounted (preserving its state) but out of the way.
		windowEl.style.visibility = 'hidden';
		windowEl.style.pointerEvents = 'none';
	}

	async function restoreApp() {
		if (!windowEl) return;

		windowEl.style.visibility = '';
		windowEl.style.pointerEvents = '';

		await nextFrame();

		windowEl.style.transform = 'translateZ(0)';
		windowEl.style.opacity = '1';

		await sleep(preferences.reduced_motion ? 0 : MINIMIZE_DURATION);

		if (!preferences.reduced_motion) windowEl.style.transition = '';
		windowEl.style.transformOrigin = '';

		focusApp();
	}

	// Drive minimize/restore off the shared state, so the dock icon can restore it too.
	let prev_minimized = false;
	$effect(() => {
		const minimized = apps.minimized[app_id];
		if (!windowEl || minimized === prev_minimized) return;

		prev_minimized = minimized;
		untrack(() => (minimized ? minimizeApp() : restoreApp()));
	});

	function onAppDragStart() {
		focusApp();
		apps.is_being_dragged = true;
	}

	function onAppDragEnd() {
		apps.is_being_dragged = false;
	}

	onMount(() => windowEl?.focus());
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
	role="application"
	class="container"
	class:dark={preferences.theme.scheme === 'dark'}
	class:active={apps.active === app_id}
	class:mobile={device.is_mobile}
	style:width="{+width / remModifier}rem"
	style:height="{+height / remModifier}rem"
	style:z-index={apps.z_indices[app_id]}
	tabindex="-1"
	bind:this={windowEl}
	{@attach draggable(() => [
		controls({ allow: ControlFrom.selector('.app-window-drag-handle') }),
		bounds(BoundsFrom.viewport({ bottom: -6000, top: 27.2, left: -6000, right: -6000 })),
		disabledComp,
		position({ default: defaultPosition }),
		events({ onDragStart: onAppDragStart, onDragEnd: onAppDragEnd }),
	])}
	onclick={focusApp}
	onkeydown={() => {}}
	in:windowTransition
	out:windowTransition
>
	<div class="tl-container {app_id}" use:elevation={'window-traffic-lights'}>
		<TrafficLights
			{app_id}
			on_maximize_click={maximizeApp}
			on_close_app={closeApp}
			on_minimize_click={() => (apps.minimized[app_id] = true)}
		/>
	</div>

	<AppNexus {app_id} />
</section>

<style>
	.container {
		--elevated-shadow: 0px 8.5px 10px rgba(0, 0, 0, 0.115), 0px 68px 80px rgba(0, 0, 0, 0.23);

		width: 100%;
		height: 100%;

		display: grid;
		grid-template-rows: 1fr;

		position: absolute;

		will-change: transform;
		transform: translateZ(0);

		border-radius: 0.75rem;
		box-shadow: var(--elevated-shadow);

		cursor: var(--system-cursor-default), auto;

		&.active {
			/* // --elevated-shadow: 0px 6.7px 12px rgba(0, 0, 0, 0.218), 0px 22.3px 40.2px rgba(0, 0, 0, 0.322),
      //   0px 100px 180px rgba(0, 0, 0, 0.54); */
			--elevated-shadow: 0px 8.5px 10px rgba(0, 0, 0, 0.28), 0px 68px 80px rgba(0, 0, 0, 0.56);
		}

		/* On mobile every window is forced fullscreen (single-tasking), so a window
		   can never end up dragged off-screen. `!important` is required because
		   neodrag and the maximize logic write width/height/translate as inline
		   styles, which would otherwise win over these rules. */
		&.mobile {
			top: 0;
			left: 0;

			width: 100% !important;
			/* Leave a gap at the bottom so the always-visible dock tooltips, which
			   float up above the dock icons, don't overlap the window content. */
			height: calc(100% - 1rem) !important;

			translate: 0px 0px 0px !important;
		}

		&.dark {
			& > :global(section),
			& > :global(div) {
				border-radius: inherit;
				box-shadow:
					inset 0 0 0 0.9px hsla(var(--system-color-dark-hsl), 0.3),
					0 0 0 1px hsla(var(--system-color-light-hsl), 0.5),
					var(--elevated-shadow);
			}
		}
	}

	.tl-container {
		position: absolute;
		top: 1rem;
		left: 1rem;

		/* // Necessary, as `.container` tries to apply shadow on it */
		box-shadow: none !important;
	}
</style>
