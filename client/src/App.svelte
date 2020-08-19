<script lang="typescript">
	import { store } from './store';
	export let name: string;

	let text = 'oitt';
	let Teste: any;
	import('./Test.svelte').then((module) => {
		Teste = module.default;
	});
</script>

<style type="text/scss">
	$color: blue;
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: $color;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1>Hello {name}! abcac</h1>
	{text} {$store}
	<p>
		Visit the
		<a href="https://svelte.dev/tutorial">Svelte tutorial</a>
		to learn how to build Svelte apps.
	</p>
	<svelte:component this={Teste} />
</main>
