import type { ArticleStatus } from '$lib/types/article';

export interface ArticleFormErrors {
  title: string | null;
  author: string | null;
  status: string | null;
}

export function validateArticleForm(fields: {
  title: string;
  author: string;
  status: ArticleStatus;
}): ArticleFormErrors {
  let title: string | null = null;
  let author: string | null = null;
  let status: string | null = null;

  if (fields.title.trim().length === 0) {
    title = 'Title is required';
  } else if (fields.title.trim().length < 3) {
    title = 'Title must be at least 3 characters';
  }

  if (fields.author.trim().length === 0) {
    author = 'Author is required';
  }

  if (fields.status !== 'Published' && fields.status !== 'Draft') {
    status = 'Status must be Published or Draft';
  }

  return { title, author, status };
}
