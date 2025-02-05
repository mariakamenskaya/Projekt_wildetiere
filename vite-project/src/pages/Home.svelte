<script>
	// Daten oder Logik hinzufügen
	// import "../styles/home.css";
	import Header from "../components/Header.svelte";
	import Footer from "../components/Footer.svelte";
	import Navigation from "../components/Navigation.svelte";
</script>

<div class="hero">
	<h1>Welcome to Wild Animals</h1>
	<p>Discover endangered species.</p>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap");

	html,
	body,
	#app {
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.hero {
		background-image: url("/public/background.jpg");
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		text-align: center;
		color: white; /* Textfarbe */
		height: 100vh; /* Volle Höhe des Viewports */
		width: 100vw; /* Volle Breite des Viewports */
		margin: 0; /* Entfernt Standard-Margin */
		padding: 0; /* Entfernt Standard-Padding */
		box-sizing: border-box; /* Beinhaltet Padding und Border in der Höhe und Breite */
		/* padding-top: 20px; */
		font-family: "Playfair Display", serif;
		z-index: 1;
	}

	.hero h1 {
		font-size: 3rem;
		margin-top: 180px;
		font-family: "Playfair Display", serif;
		z-index: 100;
	}

	.hero p {
		font-size: 1.5rem;
		margin-top: -10px;
		font-family: "Playfair Display", serif;
	}

	nav {
		position: absolute;
		top: 20px;
		display: flex;
		justify-content: center;
		gap: 60px;
		font-size: 18px;
		/* margin-bottom: 20px; */
	}

	nav a {
		color: #345234;
		text-decoration: none;
		font-weight: bold;
		position: relative;
		font-family: "Playfair Display", serif;
	}

	nav a::after {
		content: "";
		position: absolute;
		width: 50%; /* Unterstreicht nur die Hälfte des Wortes */
		height: 2px;
		background-color: #345234;
		bottom: -2px;
		left: 25%; /*Zentriert die Unterstreichung  */
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	nav a:hover::after {
		transform: scaleX(1);
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2rem;
			margin-top: 120px;
		}

		.hero p {
			font-size: 1.2rem;
		}

		nav {
			flex-direction: column;
			align-items: center;
			gap: 20px;
			top: 10px;
		}

		nav a {
			font-size: 16px;
		}

		nav a::after {
			width: 100%;
			left: 0;
		}
	}
</style>
