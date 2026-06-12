<script lang="ts">
	import AppleIcon from '~icons/mdi/apple';
</script>

<div class="container" aria-label="Apple">
	<span class="apple-icon">
		<AppleIcon />
	</span>
</div>

<style>
	.container {
		height: 100%;

		display: flex;
		position: relative;
	}

	.apple-icon {
		margin: 0 0rem 0 0.5rem;
		padding: 0 0.7rem;

		display: grid;
		place-items: center;

		position: relative;
		z-index: 1;

		height: 100%;

		:global(svg) {
			display: block;
			font-size: 1rem;
		}
	}
</style>
