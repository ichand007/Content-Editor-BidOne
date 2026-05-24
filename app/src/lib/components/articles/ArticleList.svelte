<script lang="ts">
  import { articles, loading, error, loadArticles } from '$lib/stores/articles';
  import type { Article } from '$lib/types/article';
  import ArticleFilters from './ArticleFilters.svelte';
  import ArticleRow from './ArticleRow.svelte';
  import Pagination from '$lib/components/ui/Pagination.svelte';

  interface Props {
    onedit?: (article: Article) => void;
    ondelete?: (article: Article) => void;
  }

  let { onedit, ondelete }: Props = $props();

  const PAGE_SIZE = 8;

  let searchText = $state('');
  let statusFilter = $state('');
  let currentPage = $state(1);

  const isFiltering = $derived(searchText.trim() !== '' || statusFilter !== '');

  const filtered = $derived(
    $articles.filter((a) => {
      const matchesSearch =
        searchText.trim() === '' ||
        a.title.toLowerCase().includes(searchText.toLowerCase()) ||
        a.author.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus = statusFilter === '' || a.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
  );

  const totalPages = $derived(Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = $derived(
    filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  );

  function onSearch(value: string) {
    searchText = value;
    currentPage = 1;
  }

  function onFilter(value: string) {
    statusFilter = value;
    currentPage = 1;
  }

  function onEdit(article: Article) {
    onedit?.(article);
  }

  function onDelete(article: Article) {
    ondelete?.(article);
  }

  const thClass = 'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400';
</script>

<div class="flex flex-col gap-4">
  <ArticleFilters onsearch={onSearch} onfilter={onFilter} />

  <div class="min-h-[400px]">
  {#if $loading}
    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table aria-busy="true" aria-label="Loading articles" class="w-full text-left">
        <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <tr>
            <th scope="col" class={thClass}>Title</th>
            <th scope="col" class={thClass}>Author</th>
            <th scope="col" class={thClass}>Status</th>
            <th scope="col" class={thClass}>Created</th>
            <th scope="col" class={thClass}>Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {#each Array(5) as _, i (i)}
            <tr class="animate-pulse">
              <td class="px-4 py-3"><div class="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700"></div></td>
              <td class="px-4 py-3"><div class="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700"></div></td>
              <td class="px-4 py-3"><div class="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div></td>
              <td class="px-4 py-3"><div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div></td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <div class="h-8 w-14 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div class="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

  {:else if $error}
    <div
      role="alert"
      class="flex items-start justify-between gap-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-900/20"
    >
      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium text-red-700 dark:text-red-400">Failed to load articles</p>
        <p class="text-sm text-red-600 dark:text-red-500">{$error}</p>
      </div>
      <button
        type="button"
        onclick={() => loadArticles()}
        class="shrink-0 rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-700 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
      >
        Retry
      </button>
    </div>

  {:else if filtered.length === 0}
    <div class="flex flex-col items-center justify-center gap-2 py-16 text-center">
      {#if isFiltering}
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">No articles match your search.</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters.</p>
      {:else}
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">No articles yet.</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">Add your first article to get started.</p>
      {/if}
    </div>

  {:else}
    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="w-full text-left">
        <caption class="sr-only">Articles</caption>
        <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <tr>
            <th scope="col" class={thClass}>Title</th>
            <th scope="col" class={thClass}>Author</th>
            <th scope="col" class={thClass}>Status</th>
            <th scope="col" class={thClass}>Created</th>
            <th scope="col" class={thClass}>Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {#each paginated as article (article.id)}
            <ArticleRow {article} onedit={onEdit} ondelete={onDelete} />
          {/each}
        </tbody>
      </table>
    </div>
    {#if totalPages > 1}
      <Pagination
        {currentPage}
        {totalPages}
        onpagechange={(page) => { currentPage = page; }}
      />
    {/if}
  {/if}
  </div>
</div>
