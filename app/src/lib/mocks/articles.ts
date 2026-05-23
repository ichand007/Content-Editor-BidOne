import type { Article, ArticleStatus } from '$lib/types/article';

// Simulates network latency so loading states and async flows can be exercised in development
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let nextId = 16;

let articles: Article[] = [
	{
		id: 1,
		title: 'Getting Started with SvelteKit',
		status: 'Published',
		author: 'Alice Morgan',
		createdAt: '2025-11-03'
	},
	{
		id: 2,
		title: 'TypeScript Best Practices in 2025',
		status: 'Published',
		author: 'Ben Carter',
		createdAt: '2025-11-10'
	},
	{
		id: 3,
		title: 'Understanding Svelte Stores',
		status: 'Draft',
		author: 'Clara Diaz',
		createdAt: '2025-11-18'
	},
	{
		id: 4,
		title: 'Building Accessible Forms',
		status: 'Published',
		author: 'David Nguyen',
		createdAt: '2025-11-25'
	},
	{
		id: 5,
		title: 'CSS Grid vs Flexbox: When to Use Each',
		status: 'Published',
		author: 'Alice Morgan',
		createdAt: '2025-12-01'
	},
	{
		id: 6,
		title: 'Optimising Web Vitals for SPA Apps',
		status: 'Draft',
		author: 'Elena Kovacs',
		createdAt: '2025-12-07'
	},
	{
		id: 7,
		title: 'REST vs GraphQL: A Practical Comparison',
		status: 'Published',
		author: 'Ben Carter',
		createdAt: '2025-12-14'
	},
	{
		id: 8,
		title: 'Intro to End-to-End Testing with Playwright',
		status: 'Draft',
		author: 'Clara Diaz',
		createdAt: '2025-12-20'
	},
	{
		id: 9,
		title: 'Deploying to Cloudflare Pages',
		status: 'Published',
		author: 'David Nguyen',
		createdAt: '2026-01-05'
	},
	{
		id: 10,
		title: 'State Management Without Redux',
		status: 'Draft',
		author: 'Elena Kovacs',
		createdAt: '2026-01-12'
	},
	{
		id: 11,
		title: 'Dark Mode with CSS Custom Properties',
		status: 'Published',
		author: 'Alice Morgan',
		createdAt: '2026-01-19'
	},
	{
		id: 12,
		title: 'Monorepo Workflows with pnpm',
		status: 'Draft',
		author: 'Ben Carter',
		createdAt: '2026-01-27'
	},
	{
		id: 13,
		title: 'Securing Authentication in Web Apps',
		status: 'Published',
		author: 'Clara Diaz',
		createdAt: '2026-02-03'
	},
	{
		id: 14,
		title: 'Writing Effective Unit Tests',
		status: 'Draft',
		author: 'David Nguyen',
		createdAt: '2026-02-10'
	},
	{
		id: 15,
		title: 'Progressive Enhancement in 2026',
		status: 'Published',
		author: 'Elena Kovacs',
		createdAt: '2026-02-17'
	}
];

export async function getArticles(): Promise<Article[]> {
	await delay(300);
	// shallow copy prevents callers from mutating the module-level array
	return [...articles];
}

export async function createArticle(data: {
	title: string;
	status: ArticleStatus;
	author: string;
	createdAt: string;
}): Promise<Article> {
	await delay(300);
	const article: Article = { id: nextId++, ...data };
	articles.push(article);
	// copy so the caller cannot hold a mutable reference into the stored object
	return { ...article };
}

export async function updateArticle(
	id: number,
	data: Partial<Omit<Article, 'id'>>
): Promise<Article> {
	await delay(300);
	const index = articles.findIndex((a) => a.id === id);
	if (index === -1) {
		throw new Error(`Article ${id} not found`);
	}
	// spread merges partial fields without losing unspecified ones
	articles[index] = { ...articles[index], ...data };
	// copy so the caller cannot hold a mutable reference into the stored object
	return { ...articles[index] };
}

export async function deleteArticle(id: number): Promise<void> {
	await delay(300);
	const index = articles.findIndex((a) => a.id === id);
	if (index === -1) {
		throw new Error(`Article ${id} not found`);
	}
	articles.splice(index, 1);
}
