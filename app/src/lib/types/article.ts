export type ArticleStatus = 'Published' | 'Draft';

export interface Article {
  id: number;
  title: string;
  status: ArticleStatus;
  author: string;
  createdAt: string;
}
