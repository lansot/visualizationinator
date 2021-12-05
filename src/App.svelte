<script>
	import { onMount } from "svelte";
	import Chart from "./Chart.svelte";

	let observationData;
	let observationKeys;
	let chosenKey;
	let helpText;

	onMount(async () => {
		try {
			const response = await fetch("/data");
			const fetchedObservations = await response.json();

			if (response.ok) {
				observationData = fetchedObservations["observations"];
				helpText = fetchedObservations["helptext"];
				observationKeys = Object.keys(observationData[0]);
				observationKeys.shift(); // not considering time a user-selectable variable
			} else {
				throw new Error(fetchedObservations);
			}
		} catch (error) {
			console.error(
				`Data retrieval failed: ${error}\nTry restarting the backend, then refreshing.`
			);
		}
	});
</script>

<main>
	<div id="header">
		<img id="logo" src="images/logo.svg" alt="Visualization-inator!" />
	</div>

	{#if observationData === undefined}
		<img id="spinner" src="images/puff.svg" alt="Loading..." />
	{:else}
		<div id="userControl">
			<label for="keySelect">Variable Selection</label>
			<select id="keySelect" bind:value={chosenKey}>
				{#each observationKeys as key}
					<option value={key}>
						{key}
					</option>
				{/each}
			</select>
		</div>

		{#if chosenKey}
			<Chart {observationData} bind:chosenKey />
		{/if}

		<div id="miscText">
			<pre>{helpText}</pre>
		</div>
	{/if}
</main>

<style>
	pre {
		font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
			sans-serif;
		font-size: large;
		white-space: pre-wrap;
	}

	#miscText {
		background-color: lightgray;
		padding: 0.5rem;
		border-radius: 8px;
		width: 50%;
		margin: 1rem auto;
	}

	#spinner {
		margin: 8rem;
	}

	#userControl {
		padding: 0.5rem;
	}

	#logo {
		width: 50%;
		height: 50%;
	}

	#header {
		background-color: var(--color-1);
		padding: 1.5rem;
	}

	main {
		color: var(--color-1);
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
