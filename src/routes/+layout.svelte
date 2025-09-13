<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../styles/styles.scss'

	import Header from '$lib/components/Header.svelte'

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

{@render children?.()}
