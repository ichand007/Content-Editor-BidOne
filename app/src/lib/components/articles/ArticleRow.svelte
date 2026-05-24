<script lang="ts">
  import type { Article } from '$lib/types/article';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  interface Props {
    article: Article;
    onedit?: (article: Article) => void;
    ondelete?: (article: Article) => void;
  }

  let { article, onedit, ondelete }: Props = $props();

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
</script>

<tr class="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50">
  <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
    {article.title}
  </td>
  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
    {article.author}
  </td>
  <td class="px-4 py-3">
    <Badge status={article.status} />
  </td>
  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
    {formatDate(article.createdAt)}
  </td>
  <td class="px-4 py-3">
    <div class="flex items-center gap-2">
      <Button variant="secondary" type="button" ariaLabel="Edit {article.title}" onclick={() => onedit?.(article)}>
        Edit
      </Button>
      <Button variant="danger" type="button" ariaLabel="Delete {article.title}" onclick={() => ondelete?.(article)}>
        Delete
      </Button>
    </div>
  </td>
</tr>
