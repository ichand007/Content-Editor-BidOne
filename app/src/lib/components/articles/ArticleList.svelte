<script lang="ts">
  import { articles, loading, error } from '$lib/stores/articles';
  import type { Article } from '$lib/types/article';
  import ArticleFilters from './ArticleFilters.svelte';
  import ArticleRow from './ArticleRow.svelte';

  interface Props {
    onedit?: (article: Article) => void;
    ondelete?: (article: Article) => void;
  }

  let { onedit, ondelete }: Props = $props();

  let searchText = $state('');
  let statusFilter = $state('');

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

  function onSearch(value: string) {
    searchText = value;
  }

  function onFilter(value: string) {
    statusFilter = value;
  }

  function onEdit(article: Article) {
    onedit?.(article);
  }

  function onDelete(article: Article) {
    ondelete?.(article);
  }
</script>

<div class="flex flex-col gap-4">
  <ArticleFilters onsearch={onSearch} onfilter={onFilter} />

  {#if $loading}
    <div class="flex items-center justify-center py-16 text-sm text-gray-500 dark:text-gray-400">
      Loading articles…
    </div>

  {:else if $error}
    <div
      role="alert"
      class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
    >
      {$error}
    </div>

  {:else if filtered.length === 0}
    <div class="flex items-center justify-center py-16 text-sm text-gray-500 dark:text-gray-400">
      No articles match your filters.
    </div>

  {:else}
    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="w-full text-left">
        <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <tr>
            <th scope="col" class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Title</th>
            <th scope="col" class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Author</th>
            <th scope="col" class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</th>
            <th scope="col" class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Created</th>
            <th scope="col" class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {#each filtered as article (article.id)}
            <ArticleRow {article} onedit={onEdit} ondelete={onDelete} />
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
