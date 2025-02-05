<script>
	import { onMount } from "svelte";
	import animalData from "../data/animaldata.json"; // JSON-Daten importieren

	let animals = []; // Tiere werden hier gespeichert
	let filteredAnimals = [];
	let originalOrder = []; // Neue Variable für die ursprüngliche Reihenfolge

	// Daten beim Laden der Seite abrufen
	onMount(() => {
		animals = animalData;
		originalOrder = [...animals]; // Speichern der ursprünglichen Reihenfolge
		filteredAnimals = animals; // Initialisieren Sie filteredAnimals mit allen Tieren
	});

	// Zustand des Akkordeons speichern
	let openIndex = -1;
	let groupFilter = "";
	let habitatFilter = "";
	let sortAlphabetically = false;

	// Akkordeon-Logik
	function toggle(index) {
		openIndex = openIndex === index ? -1 : index;
	}

	// Reaktive Anweisung für das Filtern und Sortieren
	$: {
		filteredAnimals = [...originalOrder]; // Starte immer mit der ursprünglichen Reihenfolge

		if (groupFilter) {
			filteredAnimals = filteredAnimals.filter(
				(animal) => animal.groupname === groupFilter
			);
		}

		if (habitatFilter) {
			filteredAnimals = filteredAnimals.filter(
				(animal) => animal.continents === habitatFilter
			);
		}

		if (sortAlphabetically) {
			filteredAnimals = filteredAnimals.sort((a, b) =>
				a.name.localeCompare(b.name)
			);
		}
	}
</script>

<!-- Einführungstext -->
<div class="intro-text">
	<h1>Endangered Wild Animals</h1>
	<p>
		The list of endangered wild animals worldwide is vast and constantly
		changing due to habitat loss, climate change, poaching, pollution, and
		other factors. <br />Below is a categorized overview of some notable
		endangered species by region and type.
	</p>
</div>

<!-- Filter- und Sortieroptionen -->
<div class="filters">
	<label>
		Group Name:
		<select bind:value={groupFilter}>
			<option value="">All</option>
			<option value="Amphibians">Amphibians</option>
			<option value="Birds">Birds</option>
			<option value="Land Mammals">Land Mammals</option>
			<option value="Large Mammals">Large Mammals</option>
			<option value="Predators">Predators</option>
			<option value="Reptiles">Reptiles</option>
			<option value="Sea Creatures">Sea Creatures</option>
		</select>
	</label>
	<label>
		Habitat:
		<select bind:value={habitatFilter}>
			<option value="">All</option>
			<option value="Africa">Africa</option>
			<option value="Americas">America</option>
			<option value="Arctic">Arctic</option>
			<option value="Asia">Asia</option>
			<option value="Europe">Europe</option>
			<option value="North America">North America</option>
			<option value="Oceania">Oceania</option>
			<option value="Oceans">Oceans</option>
		</select>
	</label>
	<label>
		Sort Alphabetically:
		<input type="checkbox" bind:checked={sortAlphabetically} />
	</label>
</div>

<!-- Akkordeon-Menü -->
<div class="accordion">
	{#each filteredAnimals as animal, index}
		<div class="accordion-item">
			<button
				class="accordion-header"
				aria-expanded={openIndex === index}
				on:click={() => toggle(index)}
			>
				<span>{animal.name}</span>
				<span class="triangle">{openIndex === index ? "▲" : "▼"}</span>
			</button>
			{#if openIndex === index}
				<div class="accordion-content">
					<p><strong>Fact:</strong> {animal.trivia}</p>
					<p><strong>Group Name:</strong> {animal.groupname}</p>
					<p><strong>Habitat:</strong> {animal.continents}</p>
					<p><strong>Max Age:</strong> {animal.max_age}</p>
					<p><strong>Max Length:</strong> {animal.max_length}</p>
					<p><strong>Max Weight:</strong> {animal.max_weight}</p>
					<p><strong>Top Speed:</strong> {animal.top_speed}</p>
					<p><strong>Intelligence:</strong> {animal.intelligence}</p>
					<p><strong>Litter Size:</strong> {animal.litter_size}</p>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Playfair+Display:wght@700&display=swap");

	.intro-text {
		padding: 20px;
		font-family: "Nunito", sans-serif;
		line-height: 1.5;
		color: #333;
		margin-top: 50px;
	}

	.intro-text h1 {
		font-family: "Playfair Display", serif;
	}

	.filters {
		padding: 20px;
		font-family: "Nunito", sans-serif;
		line-height: 1.5;
		color: #333;
		margin-top: 20px;
		display: flex;
		gap: 20px;
	}

	.accordion {
		padding: 20px;
	}

	.accordion-item {
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-bottom: 10px;
		overflow: hidden;
	}

	.accordion-header {
		background-color: #f3efe6;
		padding: 10px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		font-weight: bold;
		width: 100%;
		text-align: left;
		border: none;
		font-family: "Nunito", sans-serif;
	}

	.accordion-header:focus {
		outline: 2px solid #345234;
	}

	.triangle {
		font-size: 16px;
		color: #666;
	}

	.accordion-content {
		background-color: #ffff;
		padding: 10px 20px;
		font-family: "Nunito", sans-serif;
	}

	.accordion-content p {
		margin: 5px 0;
	}

	@media (max-width: 768px) {
		.intro-text {
			margin-top: 30px;
		}

		.intro-text h1 {
			font-size: 1.8rem;
		}

		.intro-text p {
			font-size: 0.9rem;
		}

		.filters {
			flex-direction: column;
			gap: 10px;
		}

		.filters label {
			width: 100%;
		}

		.filters select,
		.filters input[type="checkbox"] {
			width: 100%;
			margin-top: 5px;
		}

		.accordion-header {
			padding: 8px 15px;
			font-size: 0.9rem;
		}

		.accordion-content {
			padding: 8px 15px;
			font-size: 0.85rem;
		}
	}
</style>
