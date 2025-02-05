<script>
	const githubLink = "https://github.com/mariakamenskaya/Projekt_wildetiere";
	const rawPixelLink =
		"https://www.rawpixel.com/image/581179/hand-drawn-wild-animals";
</script>

<footer>
	<div class="footer-content">
		<p>Semesterprojekt <span class="separator">•</span></p>
		<p>
			Pictures from
			<a href={rawPixelLink} target="_blank" rel="noopener noreferrer"
				>Rawpixel</a
			>
			and Stable Diffusion <span class="separator">•</span>
		</p>
		<a href={githubLink} target="_blank" rel="noopener noreferrer"
			>GitHub Repository</a
		>
	</div>
</footer>

<style>
	footer {
		background-color: #d4d2c2;
		padding: 10px 20px;
		text-align: center;
		font-family: "Nunito", sans-serif;
		margin-top: auto;
		margin-bottom: 20px;
		border-radius: 10px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		max-width: 80%;
		width: auto;
		margin-left: auto;
		margin-right: auto;
		z-index: 100;
		position: relative;
	}

	.footer-content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	a {
		color: #345234;
		text-decoration: none;
		font-weight: bold;
	}

	.separator {
		margin: 0 10px;
		color: #666;
	}

	@media (max-width: 768px) {
		footer {
			padding: 8px 15px;
			max-width: 90%;
		}

		.footer-content {
			font-size: 0.8rem;
		}

		.separator {
			margin: 0 5px;
		}
	}
</style>
