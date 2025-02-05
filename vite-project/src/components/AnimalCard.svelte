<script>
	import { createEventDispatcher } from "svelte";
	import { fade, fly } from "svelte/transition";

	export let card;
	export let isPlayer;
	export let selectedAttribute = "";

	const dispatch = createEventDispatcher();

	function selectAttribute(attribute) {
		if (isPlayer && !selectedAttribute) {
			dispatch("select", attribute);
		}
	}

	const attributes = [
		{ key: "max_weight", label: "Max Weight", unit: "kg" },
		{ key: "max_age", label: "Max Age", unit: "years" },
		{ key: "top_speed", label: "Top Speed", unit: "km/h" },
		{ key: "max_length", label: "Max Length", unit: "cm" },
		{ key: "intelligence", label: "Intelligence", unit: "/10" },
	];
</script>

<div
	class="card"
	class:player={isPlayer}
	class:computer={!isPlayer}
	in:fly={{ y: isPlayer ? 200 : -200, duration: 500 }}
>
	<img src="/public/images/{card.image}" alt={card.name} />
	<h3>{card.name}</h3>
	<ul>
		{#each attributes as { key, label, unit }}
			<button
				type="button"
				on:click={() => selectAttribute(key)}
				on:keydown={(e) => e.key === "Enter" && selectAttribute(key)}
				class:selected={selectedAttribute === key}
				class:winning={selectedAttribute === key &&
					isPlayer &&
					card[key] > card[selectedAttribute]}
				class:losing={selectedAttribute === key &&
					isPlayer &&
					card[key] < card[selectedAttribute]}
			>
				{label}: {card[key]}
				{unit}
			</button>
		{/each}
	</ul>
</div>

<style>
	.card {
		width: 250px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 15px;
		margin: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
		background-color: #f9f9f9;
	}

	.card:hover {
		transform: scale(1.05);
	}

	.player {
		background-color: #e6f7ff;
	}

	.computer {
		background-color: #ffe6e6;
	}

	img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		border-radius: 5px;
	}

	h3 {
		text-align: center;
		margin: 10px 0;
		color: #333;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	button {
		cursor: pointer;
		padding: 8px;
		margin: 5px 0;
		background-color: #f0f0f0;
		border-radius: 5px;
		transition: background-color 0.3s;
	}

	button:hover {
		background-color: #e0e0e0;
	}

	.selected {
		font-weight: bold;
		background-color: #d4edda;
	}

	.winning {
		background-color: #28a745;
		color: white;
	}

	.losing {
		background-color: #dc3545;
		color: white;
	}
</style>
