<script lang="ts">
  import { onMount } from 'svelte';
  import type { Article, ArticleStatus } from '$lib/types/article';
  import { loadArticles, addArticle, editArticle, removeArticle } from '$lib/stores/articles';
  import ArticleList from '$lib/components/articles/ArticleList.svelte';
  import ArticleForm from '$lib/components/articles/ArticleForm.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';
  import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let modalOpen = $state(false);
  let editingArticle = $state<Article | null>(null);
  let deletingArticle = $state<Article | null>(null);

  const modalTitle = $derived(editingArticle ? 'Edit Article' : 'Add Article');
  const confirmOpen = $derived(deletingArticle !== null);
  const deleteMessage = $derived(
    deletingArticle
      ? `Are you sure you want to delete '${deletingArticle.title}'? This action cannot be undone.`
      : ''
  );

  onMount(() => {
    loadArticles();
  });

  function openAddModal() {
    editingArticle = null;
    modalOpen = true;
  }

  function openEditModal(article: Article) {
    editingArticle = article;
    modalOpen = true;
  }

  function closeModal() {
    modalOpen = false;
    editingArticle = null;
  }

  async function handleSave(data: { title: string; author: string; status: ArticleStatus }) {
    if (editingArticle) {
      await editArticle(editingArticle.id, data);
    } else {
      const createdAt = new Date().toISOString().slice(0, 10);
      await addArticle({ ...data, createdAt });
    }
    closeModal();
  }

  function openDeleteConfirm(article: Article) {
    deletingArticle = article;
  }

  async function handleConfirmDelete() {
    if (deletingArticle) {
      await removeArticle(deletingArticle.id);
    }
    deletingArticle = null;
  }

  function handleCancelDelete() {
    deletingArticle = null;
  }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-950">
  <header class="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">Article Desk</h1>
      <Button variant="primary" type="button" onclick={openAddModal}>
        Add Article
      </Button>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <ArticleList onedit={openEditModal} ondelete={openDeleteConfirm} />
  </main>
</div>

<Modal open={modalOpen} title={modalTitle} onclose={closeModal}>
  <ArticleForm
    article={editingArticle}
    onsave={handleSave}
    oncancel={closeModal}
  />
</Modal>

<ConfirmDialog
  open={confirmOpen}
  title="Delete Article"
  message={deleteMessage}
  onconfirm={handleConfirmDelete}
  oncancel={handleCancelDelete}
/>
