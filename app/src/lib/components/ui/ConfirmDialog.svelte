<script lang="ts">
  import Modal from './Modal.svelte';
  import Button from './Button.svelte';

  interface Props {
    open?: boolean;
    title: string;
    message: string;
    onconfirm?: () => void;
    oncancel?: () => void;
  }

  let { open = false, title, message, onconfirm, oncancel }: Props = $props();
</script>

<Modal {open} {title} onclose={oncancel}>
  <p class="text-sm text-gray-700 dark:text-gray-300">{message}</p>

  {#snippet footer()}
    <Button type="button" variant="secondary" onclick={() => oncancel?.()}>
      Cancel
    </Button>
    <Button type="button" variant="danger" onclick={() => onconfirm?.()}>
      Confirm
    </Button>
  {/snippet}
</Modal>
