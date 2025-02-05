<script>
	import { onMount } from "svelte";
	import animalData from "../data/animaldata.json";
	// Add OpenAI import
	import { openai } from "../api/openai.js";

	let playerHand = [];
	let computerHand = [];
	let currentPlayerCard;
	let currentComputerCard;
	let gameState = "start";
	let roundWinner = "";
	let gameWinner = "";
	let selectedAttribute = "";
	let showComputerCard = false;
	let currentPlayer = "player";
	// Add new variables for OpenAI
	// let openai;
	let animalFact = "";
	// let cardCount = 5; // Standardwert
	let useSmallDeck = false;
	let useLargeDeck = false;

	// Initialize OpenAI in onMount
	// onMount(() => {
	// 	openai = new OpenAI({
	// 		apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Replace with your actual API key
	// 		dangerouslyAllowBrowser: true, // Only use this for development
	// 	});
	// 	shuffleAndDeal();
	// });

	function shuffleAndDeal() {
		const deckSize = useSmallDeck ? 10 : 32;
		const shuffled = [...animalData]
			.sort(() => Math.random() - 0.5)
			.slice(0, deckSize);
		playerHand = shuffled
			.slice(0, deckSize / 2)
			.map((card, index) => ({ ...card, id: `player-${index}` }));
		computerHand = shuffled
			.slice(deckSize / 2, deckSize)
			.map((card, index) => ({ ...card, id: `computer-${index}` }));
		updateCurrentCards();
		gameState = "playing";
		showComputerCard = false;
		currentPlayer = "player";
	}

	function updateCurrentCards() {
		currentPlayerCard = playerHand[0];
		currentComputerCard = computerHand[0];
	}

	function playRound(attribute) {
		selectedAttribute = attribute;
		showComputerCard = true;

		const playerValue = parseFloat(currentPlayerCard[attribute]);
		const computerValue = parseFloat(currentComputerCard[attribute]);

		if (playerValue > computerValue) {
			roundWinner = "player";
			// Nur die Computer-Karte nehmen und eigene Karte behalten
			playerHand.push(computerHand.shift());
			currentPlayer = "player";
			getRandomFact(currentPlayerCard.name);
		} else if (computerValue > playerValue) {
			roundWinner = "computer";
			// Nur die Spieler-Karte nehmen und eigene Karte behalten
			computerHand.push(playerHand.shift());
			currentPlayer = "computer";
		} else {
			roundWinner = "tie";
			// Beide Karten werden zurück in die Hände gegeben
			playerHand.push(playerHand.shift());
			computerHand.push(computerHand.shift());
		}

		checkGameEnd();

		if (gameState !== "gameEnd") {
			setTimeout(() => {
				gameState = "roundEnd";
				if (currentPlayer === "computer") {
					setTimeout(computerPlay, 1500);
				}
			}, 2000);
		}
	}

	// Add new function to get random fact
	async function getRandomFact(animalName) {
		try {
			const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content:
							"You are a helpful assistant that provides short, interesting facts about animals.",
					},
					{
						role: "user",
						content: `Give me a random interesting fact about the ${animalName} in one short sentence.`,
					},
				],
			});
			animalFact = response.choices[0].message.content;
		} catch (error) {
			console.error("Error fetching animal fact:", error);
			animalFact = "Oops! Couldn't fetch a fact right now.";
		}
	}

	function checkGameEnd() {
		if (playerHand.length === 0) {
			gameWinner = "Computer";
			gameState = "gameEnd";
		} else if (computerHand.length === 0) {
			gameWinner = "Player";
			gameState = "gameEnd";
		}
	}

	function nextRound() {
		updateCurrentCards();
		gameState = "playing";
		selectedAttribute = "";
		showComputerCard = false;
		if (currentPlayer === "computer") {
			computerPlay();
		}
	}

	function computerPlay() {
		const attributes = [
			"max_weight",
			"max_age",
			"top_speed",
			"max_length",
			"intelligence",
		];
		const selectedAttr = attributes.reduce((a, b) =>
			parseFloat(currentComputerCard[a]) >
			parseFloat(currentComputerCard[b])
				? a
				: b
		);
		playRound(selectedAttr);
	}

	function restartGame() {
		shuffleAndDeal();
		gameWinner = "";
	}

	onMount(() => {
		gameState = "start";
	});
</script>

<div class="game-container">
	{#if gameState === "start"}
		<h1 class="title">Quartett Game</h1>
		<!-- <img src="/public/quartett.jpeg" alt="Game" class="game-image" /> -->
		<div class="settings">
			<label>
				<input
					type="checkbox"
					bind:checked={useSmallDeck}
					on:change={() => {
						useSmallDeck = true;
						useLargeDeck = false;
					}}
				/>
				Spielen mit 5 Karten
			</label>
			<label>
				<input
					type="checkbox"
					bind:checked={useLargeDeck}
					on:change={() => {
						useLargeDeck = true;
						useSmallDeck = false;
					}}
				/>
				Spielen mit 16 Karten
			</label>
		</div>
		<button
			class="start-button"
			on:click={shuffleAndDeal}
			disabled={!useSmallDeck && !useLargeDeck}>Start Game</button
		>
	{:else}
		<h1>
			{currentPlayer === "player" ? "Your turn" : "Wait for Player..."}
		</h1>

		<div class="cards-container">
			<div class="card player-card">
				<img
					src="/images/{currentPlayerCard.image}"
					alt={currentPlayerCard.name}
				/>
				<h3>{currentPlayerCard.name}</h3>
				<ul>
					{#each ["max_weight", "max_age", "top_speed", "max_length", "intelligence"] as attr}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li
							on:click={() =>
								gameState === "playing" &&
								currentPlayer === "player" &&
								playRound(attr)}
							class:selected={selectedAttribute === attr}
							class:winning={gameState === "roundEnd" &&
								roundWinner === "player" &&
								selectedAttribute === attr}
							class:losing={gameState === "roundEnd" &&
								roundWinner === "computer" &&
								selectedAttribute === attr}
						>
							{attr.replace("_", " ")}: {currentPlayerCard[attr]}
						</li>
					{/each}
				</ul>
			</div>

			<div class="card computer-card">
				{#if showComputerCard}
					<img
						src="/images/{currentComputerCard.image}"
						alt={currentComputerCard.name}
					/>
					<h3>{currentComputerCard.name}</h3>
					<ul>
						{#each ["max_weight", "max_age", "top_speed", "max_length", "intelligence"] as attr}
							<li
								class:selected={selectedAttribute === attr}
								class:winning={gameState === "roundEnd" &&
									roundWinner === "computer" &&
									selectedAttribute === attr}
								class:losing={gameState === "roundEnd" &&
									roundWinner === "player" &&
									selectedAttribute === attr}
							>
								{attr.replace("_", " ")}: {currentComputerCard[
									attr
								]}
							</li>
						{/each}
					</ul>
				{:else}
					<div class="card-back">?</div>
				{/if}
			</div>
		</div>

		<div class="score">
			<p>Player: {playerHand.length} cards</p>
			<p>Computer: {computerHand.length} cards</p>
		</div>

		{#if gameState === "roundEnd"}
			<p>
				Round winner: {roundWinner === "player"
					? "Player"
					: roundWinner === "computer"
						? "Computer"
						: "Tie"}
			</p>
			<button on:click={nextRound}>Next Round</button>
		{/if}

		{#if gameState === "roundEnd" && roundWinner === "player"}
			<div class="animal-fact">
				<p>{animalFact}</p>
			</div>
		{/if}

		<button class="restart-button" on:click={restartGame}
			>Restart Game</button
		>

		{#if gameState === "gameEnd"}
			<div class="game-over">
				<h2>Game Over! Winner: {gameWinner}</h2>
				<!-- <button on:click={restartGame}>New Game</button> -->
			</div>
		{/if}
		{#if gameState === "gameEnd" && gameWinner === "Player"}
			<div class="fireworks"></div>
		{/if}
	{/if}
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap");

	.game-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		max-width: 1200px;
		margin: 0 auto;
		font-family: "Nunito", sans-serif;
		margin-top: 110px;
	}
	.title {
		font-size: 2.5rem;
		margin-bottom: 20px;
		margin-top: 300px;
	}

	.game-image {
		width: 500px;
		height: auto;
		margin-bottom: 20px;
	}

	.start-button {
		margin-top: 20px;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 5px;
		transition: background-color 0.3s;
		font-family: "Nunito", sans-serif;
	}

	.start-button:hover {
		background-color: #45a049;
	}

	.settungs {
		margin-bottom: 20px;
		font-family: "Nunito", sans-serif;
	}

	.settings label {
		display: block;
		margin-bottom: 10px;
	}

	.cards-container {
		display: flex;
		justify-content: space-around;
		width: 100%;
		margin-top: 20px;
		z-index: 2;
	}

	.card {
		width: 250px;
		border: 1px solid #ccc;
		border-radius: 10px;
		background-color: #949387;
		padding: 15px;
		margin: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.card img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		border-radius: 5px;
	}

	.card-back {
		width: 100%;
		height: 100%;
		background-color: #d4d2c2;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 48px;
		color: #999;
	}

	.hidden {
		visibility: hidden;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		cursor: pointer;
		padding: 8px;
		margin: 5px 0;
		background-color: #d4d2c2;
		border-radius: 5px;
		transition: background-color 0.3s;
	}

	li:hover {
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

	.score {
		margin-top: 20px;
		text-align: center;
		font-size: 1.2em;
	}

	button {
		margin-top: 20px;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 5px;
		transition: background-color 0.3s;
	}

	button:hover {
		background-color: #45a049;
	}

	.fireworks {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("/public/fireworks.gif") no-repeat center center;
		background-size: cover;
		z-index: 1;
		opacity: 0.8;
	}

	/* Restart button */
	.restart-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
		font-family: "Nunito", sans-serif;
	}

	.animal-fact {
		margin-top: 20px;
		padding: 10px;
		background-color: #949387;
		border-radius: 5px;
	}

	.player-card {
		position: relative;
	}

	.player-card::before,
	.player-card::after {
		content: "";
		position: absolute;
		background-color: #949387;
		border: 1px solid #ccc;
		border-radius: 10px;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.player-card::before {
		transform: rotate(2deg) translateX(3px) translateY(3px);
	}

	.player-card::after {
		transform: rotate(-2deg) translateX(-3px) translateY(3px);
	}

	.computer-card {
		position: relative;
	}

	.computer-card::before,
	.computer-card::after {
		content: "";
		position: absolute;
		background-color: #949387;
		border: 1px solid #ccc;
		border-radius: 10px;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.computer-card::before {
		transform: rotate(2deg) translateX(3px) translateY(3px);
	}

	.computer-card::after {
		transform: rotate(-2deg) translateX(-3px) translateY(3px);
	}

	@media (max-width: 768px) {
		.game-container {
			margin-top: 20px;
		}

		.cards-container {
			flex-direction: column;
			align-items: center;
		}

		.card {
			width: 90%;
			max-width: 300px;
		}

		.title {
			font-size: 2rem;
			margin-top: 50px;
		}

		.start-button,
		button {
			width: 100%;
			max-width: 300px;
		}

		.restart-button {
			position: static;
			margin-top: 20px;
		}
	}
</style>
