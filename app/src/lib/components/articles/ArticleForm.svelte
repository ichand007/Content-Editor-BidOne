<script lang="ts">
  import type { Article, ArticleStatus } from '$lib/types/article';
  import { validateArticleForm } from '$lib/utils/validators';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  interface SaveData {
    title: string;
    author: string;
    status: ArticleStatus;
  }

  interface Props {
    article?: Article | null;
    onsave?: (data: SaveData) => void;
    oncancel?: () => void;
  }

  let { article = null, onsave, oncancel }: Props = $props();

  let title = $state('');
  let author = $state('');
  let status = $state<string>('Draft');
  let submitted = $state(false);
  let errors = $state({ title: null as string | null, author: null as string | null, status: null as string | null });

  const saveLabel = $derived(article === null ? 'Add Article' : 'Save Changes');

  // Reset form fields whenever the article prop changes (open/close cycles)
  $effect(() => {
    title = article?.title ?? '';
    author = article?.author ?? '';
    status = article?.status ?? 'Draft';
    submitted = false;
    errors = { title: null, author: null, status: null };
  });

  const statusOptions = [
    { value: 'Published', label: 'Published' },
    { value: 'Draft', label: 'Draft' },
  ];

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    submitted = true;

    const result = validateArticleForm({
      title,
      author,
      status: status as ArticleStatus,
    });

    errors = result;

    const hasErrors = result.title !== null || result.author !== null || result.status !== null;
    if (hasErrors) { return; }

    onsave?.({ title, author, status: status as ArticleStatus });
  }
</script>

<form onsubmit={handleSubmit} novalidate class="flex flex-col gap-4">
  <Input
    label="Title"
    bind:value={title}
    placeholder="Article title"
    error={submitted ? errors.title : null}
  />

  <Input
    label="Author"
    bind:value={author}
    placeholder="Author name"
    error={submitted ? errors.author : null}
  />

  <Select
    label="Status"
    bind:value={status}
    options={statusOptions}
    error={submitted ? errors.status : null}
  />

  <div class="flex justify-end gap-3 pt-2">
    <Button type="button" variant="secondary" onclick={() => oncancel?.()}>
      Cancel
    </Button>
    <Button type="submit" variant="primary">
      {saveLabel}
    </Button>
  </div>
</form>
