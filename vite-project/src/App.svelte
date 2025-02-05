<script>
	import Router from "svelte-spa-router";
	import routes from "./routes.js";
	import Footer from "./components/Footer.svelte";
</script>

<header>
	<nav style="left: 50%; transform: translateX(-50%);" z-index="1">
		<a href="#/">Home</a>
		<a href="#/animals-overview">Animals Overview</a>
		<a href="#/game">Game</a>
	</nav>
</header>
<main>
	<Router {routes} />
</main>

<Footer />

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
		z-index: 1;
	}

	.hero h1 {
		font-size: 3rem;
		margin-top: 180px;
	}

	.hero p {
		font-size: 1.5rem;
		margin-top: -10px;
	}

	nav {
		font-family: "Playfair Display", serif;
		position: absolute;
		top: 20px;
		display: flex;
		justify-content: center;
		gap: 60px;
		font-size: 18px;
		/* margin-bottom: 20px; */
		z-index: 10;
	}

	nav a {
		color: #345234;
		text-decoration: none;
		font-weight: bold;
		position: relative;
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

	:global(body) {
		margin: 0;
		min-height: 100vh;
	}

	:global(#app) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	/* Wenn Sie einen main Container haben, fügen Sie dies hinzu */
	:global(main) {
		flex: 1;
	}
</style>
