<script>
	import { onMount, createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	let firstDigit;
	let digits = ["", "", "", ""];

	$: pin = digits.join("");

	function handleSelect(e) {
		e.target.select();
	}

	function handleClear() {
		digits = ["", "", "", ""];
	}

	function handleInput(e) {
		if (!e.target.nextElementSibling) {
			digits = ["", "", "", ""];
			firstDigit.focus();
		} else {
			e.target.nextElementSibling.focus();
		}
	}

	function handleLastInput(e) {
		e.target.blur();
		handleClear();
		dispatch("pin", pin);
	}

	function handleKeyUp(e) {
		if (e.key === "Backspace") {
			handleClear();
			firstDigit.focus();
		}
	}

	onMount(() => {
		firstDigit.focus();
	});
</script>

<div class="flex w-full gap-1">
	<input
		class="bg-neutral-900/80 rounded-lg appearance-none w-16 h-16 text-center"
		maxlength="1"
		bind:this={firstDigit}
		bind:value={digits[0]}
		on:focus|preventDefault={handleSelect}
		on:input|preventDefault={handleInput}
		on:keyup={handleKeyUp}
	/>
	<input
		class="bg-neutral-900/80 rounded-lg appearance-none w-16 h-16 text-center"
		maxlength="1"
		bind:value={digits[1]}
		on:focus|preventDefault={handleSelect}
		on:input|preventDefault={handleInput}
		on:keyup={handleKeyUp}
	/>
	<input
		class="bg-neutral-900/80 rounded-lg appearance-none w-16 h-16 text-center"
		maxlength="1"
		bind:value={digits[2]}
		on:focus|preventDefault={handleSelect}
		on:input|preventDefault={handleInput}
		on:keyup={handleKeyUp}
	/>
	<input
		class="bg-neutral-900/80 rounded-lg appearance-none w-16 h-16 text-center"
		maxlength="1"
		bind:value={digits[3]}
		on:focus|preventDefault={handleSelect}
		on:input|preventDefault={handleLastInput}
		on:keyup={handleKeyUp}
	/>
</div>
