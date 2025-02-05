<script>
	import Link from "svelte-spa-router";
	export let links = []; // Links werden als Prop übergeben
</script>

<nav>
	{#each links as link}
		<a href={link.href}>{link.text}</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		justify-content: center;
		gap: 20px;
		font-size: 18px;
		/* margin-bottom: 20px; */
	}

	nav a {
		color: #345234;
		text-decoration: none;
		font-weight: bold;
	}
</style>
