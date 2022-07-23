<script context="module">
	export async function load({ fetch }) {
		// const response = await fetch("/notes");
		// const json = await response.json();
		return {
			status: 200,
			props: {
				data: { notes: [] }
			}
		};
	}
</script>

<script>
	import { onMount } from "svelte";
	import { notes } from "$lib/stores";
	import Canvas from "$lib/components/Canvas.svelte";

	export let data = { notes: [] };

	onMount(async () => {
		console.log(`🥐 Croissant v${APP_VERSION}`);
		notes.set(data.notes);
	});
</script>

<div class="h-full w-full bg-neutral-900 text-neutral-100">
	<Canvas />
</div>
