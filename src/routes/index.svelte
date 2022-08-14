<script context="module">
	export async function load({ fetch }) {
		// Redirect to /auth until authentication is implemented
		return { status: 302, redirect: "/auth" };
		const response = await fetch("/notes");
		const json = await response.json();
		return {
			status: response.status,
			props: {
				data: response.ok && json
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
		console.info(`
	🥐 Croissant v${APP_VERSION}\n
	🛠️ ${import.meta.env.ENV_MODE}
		`);
		notes.set(data.notes);
	});
</script>

{#if import.meta.env.ENV_MODE == "Development"}
	<div
		class="absolute z-50 font-bold tracking-widest w-48 text-center top-4 -right-16 py-1 rotate-45 text-red-200 bg-red-800 opacity-50"
	>
		DEV
	</div>
{/if}

<Canvas />
