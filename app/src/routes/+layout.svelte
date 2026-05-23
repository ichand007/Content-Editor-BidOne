<script lang="ts">
  import { onMount } from 'svelte';
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { initTheme } from '$lib/stores/theme';

  let { children } = $props();

  onMount(() => {
    initTheme();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-white text-gray-900 transition-colors duration-300 ease-in-out dark:bg-gray-950 dark:text-gray-100">
  {@render children()}
</div>
