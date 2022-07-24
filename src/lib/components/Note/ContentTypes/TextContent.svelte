<script>
	import { createEventDispatcher } from "svelte";
	import EventTrap from "$lib/EventTrap";
	export let data;

	const dispatch = createEventDispatcher();

	let el;

	function handleBlur() {
		dispatch("update", data);
	}
</script>

<div class="bg-neutral-900 p-2 w-full h-full cursor-auto" on:mousedown|stopPropagation={() => {}}>
	<textarea
		bind:this={el}
		bind:value={data}
		on:blur={handleBlur}
		spellcheck="false"
		class="h-full w-full bg-transparent overflow-hidden border-none resize-none indent-0 outline-none placeholder:text-neutral-400 selection:text-neutral-800 selection:bg-neutral-100"
		placeholder="What's on your mind?"
	/>
</div>
