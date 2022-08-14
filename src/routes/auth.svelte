<script>
	import PinLock from "$lib/components/PinLock.svelte";

	let pin = "";

	function handlePin(e) {
		pin = e.detail;
	}
</script>

<template>
	<div class="h-full w-full flex justify-center items-center">
		<div class="bg-neutral-700/50 backdrop-blur-lg rounded-lg flex flex-col items-center p-8">
			<img src="/images/croissant-white.svg" alt="logo" class="w-24 h-24 mb-8" />
			{#if !pin}
				<PinLock on:pin={handlePin} />
			{:else}
				<div>Login to be implemented!</div>
			{/if}
		</div>
	</div>
</template>
