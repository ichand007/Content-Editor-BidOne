import { writable } from 'svelte/store';
import type { Article, ArticleStatus } from '$lib/types/article';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '$lib/mocks/articles';

export const articles = writable<Article[]>([]);
export const loading = writable<boolean>(false);
export const error = writable<string | null>(null);

export async function loadArticles(): Promise<void> {
  loading.set(true);
  // clear any error left over from the previous operation
  error.set(null);
  try {
    const data = await getArticles();
    articles.set(data);
  } catch (e) {
    error.set(e instanceof Error ? e.message : 'Failed to load articles');
  } finally {
    // always reset loading, even if the operation threw
    loading.set(false);
  }
}

export async function addArticle(
  data: { title: string; status: ArticleStatus; author: string; createdAt: string }
): Promise<void> {
  loading.set(true);
  error.set(null);
  try {
    const created = await createArticle(data);
    // new array reference is required to trigger Svelte reactivity
    articles.update((current) => [...current, created]);
  } catch (e) {
    error.set(e instanceof Error ? e.message : 'Failed to add article');
  } finally {
    loading.set(false);
  }
}

export async function editArticle(
  id: number,
  data: Partial<Omit<Article, 'id'>>
): Promise<void> {
  loading.set(true);
  error.set(null);
  try {
    const updated = await updateArticle(id, data);
    // map produces a new array, keeping Svelte's change detection intact
    articles.update((current) =>
      current.map((a) => (a.id === id ? updated : a))
    );
  } catch (e) {
    error.set(e instanceof Error ? e.message : 'Failed to edit article');
  } finally {
    loading.set(false);
  }
}

export async function removeArticle(id: number): Promise<void> {
  loading.set(true);
  error.set(null);
  try {
    await deleteArticle(id);
    // filter produces a new array, keeping Svelte's change detection intact
    articles.update((current) => current.filter((a) => a.id !== id));
  } catch (e) {
    error.set(e instanceof Error ? e.message : 'Failed to remove article');
  } finally {
    loading.set(false);
  }
}
