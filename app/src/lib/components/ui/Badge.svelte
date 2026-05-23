<script lang="ts">
  import type { ArticleStatus } from '$lib/types/article';

  interface Props {
    status: ArticleStatus;
  }

  let { status }: Props = $props();

  const classes: Record<ArticleStatus, string> = {
    Published:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Draft:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };
</script>

<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {classes[status]}">
  {status}
</span>
