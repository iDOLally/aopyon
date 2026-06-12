<script lang="ts">
	import type { AppID } from '🍎/state/apps.svelte';

	const { app_id }: { app_id: AppID } = $props();
</script>

{#if app_id === 'calendar'}
	{#await import('./Calendar/Calendar.svelte') then { default: Calendar }}
		<Calendar />
	{/await}
{:else if app_id === 'wallpapers'}
	{#await import('./WallpaperApp/WallpaperSelectorApp.svelte') then { default: WallpaperSelector }}
		<WallpaperSelector />
	{/await}
{:else if app_id === 'purus-twitter'}
	{#await import('./PurusProfile/PurusProfile.svelte') then { default: PurusProfile }}
		<PurusProfile />
	{/await}
{/if}
