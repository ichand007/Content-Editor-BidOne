<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { tick } from 'svelte';

  export let open: boolean = false;
  export let title: string;

  const dispatch = createEventDispatcher<{ close: void }>();

  let dialogEl: HTMLDivElement;
  let previouslyFocused: HTMLElement | null = null;

  // Focusable element selector used for tab trapping
  const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function trapFocus(e: KeyboardEvent) {
    if (e.key !== 'Tab') { return; }

    const focusable = Array.from<HTMLElement>(dialogEl.querySelectorAll(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      dispatch('close');
    }
    trapFocus(e);
  }

  function onBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      dispatch('close');
    }
  }

  $: if (open) {
    previouslyFocused = document.activeElement as HTMLElement;
    tick().then(() => {
      const first = dialogEl?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    });
  } else if (previouslyFocused) {
    previouslyFocused.focus();
    previouslyFocused = null;
  }

  onDestroy(() => {
    if (previouslyFocused) {
      previouslyFocused.focus();
    }
  });
</script>

<svelte:window on:keydown={open ? onKeydown : undefined} />

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    on:click={onBackdropClick}
  >
    <div
      bind:this={dialogEl}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      class="w-full max-w-lg rounded-lg bg-white shadow-xl dark:bg-gray-900"
    >
      <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <h2
          id="modal-title"
          class="text-lg font-semibold text-gray-900 dark:text-gray-100"
        >
          {title}
        </h2>
        <button
          type="button"
          aria-label="Close"
          class="rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-gray-300"
          on:click={() => dispatch('close')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="px-6 py-4">
        <slot />
      </div>

      {#if $$slots.footer}
        <div class="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <slot name="footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}
