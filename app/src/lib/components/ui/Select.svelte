<script lang="ts">
  interface Props {
    label: string;
    value?: string;
    options?: { value: string; label: string }[];
    error?: string | null;
    onchange?: (value: string) => void;
  }

  let { label, value = $bindable(''), options = [], error = null, onchange }: Props = $props();

  const id = `select-${Math.random().toString(36).slice(2)}`;
</script>

<div class="flex flex-col gap-1">
  <label
    for={id}
    class="text-sm font-medium text-gray-700 dark:text-gray-300"
  >
    {label}
  </label>

  <select
    {id}
    bind:value
    aria-describedby={error ? `${id}-error` : undefined}
    aria-invalid={error ? 'true' : undefined}
    class="rounded-md border px-3 py-2 text-sm text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
      dark:bg-gray-800 dark:text-gray-100
      {error
        ? 'border-red-500 focus:ring-red-500 dark:border-red-400'
        : 'border-gray-300 dark:border-gray-600'}"
    onchange={() => onchange?.(value)}
  >
    {#each options as option (option.value)}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>

  {#if error}
    <p id="{id}-error" role="alert" class="text-xs text-red-600 dark:text-red-400">
      {error}
    </p>
  {/if}
</div>
