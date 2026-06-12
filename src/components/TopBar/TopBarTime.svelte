<script lang="ts">
	import { format } from 'date-fns';
	import { ja } from 'date-fns/locale';
	import { create_interval } from '🍎/state/interval.svelte';

	const time = create_interval(1000);
</script>

<div style:margin="0 0.5rem" style:font-variant-numeric="tabular-nums">
	{format(time.value, 'yyyy年M月d日（EEE）', { locale: ja })} {format(time.value, 'HH:mm:ss')}
</div>
