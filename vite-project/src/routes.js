import Home from "./pages/Home.svelte";
import AnimalsOverview from "./pages/AnimalsOverview.svelte";
import Game from "./pages/Game.svelte";

export default {
	"/": Home,
	"/animals-overview": AnimalsOverview,
	"/game": Game,
};
