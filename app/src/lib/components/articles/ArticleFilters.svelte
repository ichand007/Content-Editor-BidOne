<script lang="ts">
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';

  interface Props {
    onsearch?: (value: string) => void;
    onfilter?: (value: string) => void;
  }

  let { onsearch, onfilter }: Props = $props();

  let search = $state('');
  let status = $state('');

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Published', label: 'Published' },
    { value: 'Draft', label: 'Draft' },
  ];

  $effect(() => {
    onsearch?.(search);
  });

  $effect(() => {
    onfilter?.(status);
  });
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:items-end">
  <div class="flex-1">
    <Input
      label="Search"
      bind:value={search}
      placeholder="Search by title or author…"
      error={null}
    />
  </div>

  <div class="w-full sm:w-48">
    <Select
      label="Status"
      bind:value={status}
      options={statusOptions}
      error={null}
    />
  </div>
</div>
