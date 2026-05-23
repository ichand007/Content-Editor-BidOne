<script lang="ts">
  import { onMount } from 'svelte';
  import { loadArticles } from '$lib/stores/articles';
  import ArticleList from '$lib/components/articles/ArticleList.svelte';

  onMount(() => {
    loadArticles();
  });
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-950">
  <header class="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
    <div class="mx-auto max-w-6xl px-4 py-5 sm:px-6">
      <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Article Desk</h1>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <ArticleList />
  </main>
</div>
