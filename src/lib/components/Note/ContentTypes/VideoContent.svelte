<script>
	export let data;
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video class="h-full w-full" controls>
	<source src={data.src} />
</video>
