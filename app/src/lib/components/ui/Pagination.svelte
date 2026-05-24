<script lang="ts">
  import Button from './Button.svelte';

  interface Props {
    currentPage: number;
    totalPages: number;
    onpagechange?: (page: number) => void;
  }

  let { currentPage, totalPages, onpagechange }: Props = $props();
</script>

<nav aria-label="Pagination" class="flex items-center justify-between gap-4 pt-2">
  <Button
    variant="secondary"
    type="button"
    disabled={currentPage <= 1}
    ariaLabel="Go to previous page"
    onclick={() => { onpagechange?.(currentPage - 1); }}
  >
    Previous
  </Button>

  <span
    aria-live="polite"
    aria-atomic="true"
    class="text-sm text-gray-600 dark:text-gray-400"
  >
    Page {currentPage} of {totalPages}
  </span>

  <Button
    variant="secondary"
    type="button"
    disabled={currentPage >= totalPages}
    ariaLabel="Go to next page"
    onclick={() => { onpagechange?.(currentPage + 1); }}
  >
    Next
  </Button>
</nav>
