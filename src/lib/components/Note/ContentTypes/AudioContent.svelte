<script>
	export let data;
</script>

<audio class="h-full w-full" controls>
	<source src={data.src} type={data.type} />
</audio>
