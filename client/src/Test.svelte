<script lang="typescript">
	import { store } from './store';
</script>

<teste>
	<div>Async test component</div>
	<button on:click={() => ($store += 1)}>Add 1</button>
</teste>
