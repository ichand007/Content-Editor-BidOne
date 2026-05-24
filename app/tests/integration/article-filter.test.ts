import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

// Counts derived from app/src/lib/mocks/articles.ts
const TOTAL_COUNT = 15;
const PUBLISHED_COUNT = 9;
const DRAFT_COUNT = 6;

// 'SvelteKit' (case-insensitive) matches only "Getting Started with SvelteKit" (Published)
const SEARCH_TERM = 'SvelteKit';
const SEARCH_MATCH_TITLE = 'Getting Started with SvelteKit';
const SEARCH_MATCH_COUNT = 1;

// 'svelte' matches 2 articles across both statuses; combined with 'Published' → 1 article
const COMBINED_SEARCH = 'svelte';
const COMBINED_STATUS = 'Published';
const COMBINED_MATCH_COUNT = 1;
const COMBINED_MATCH_TITLE = 'Getting Started with SvelteKit';

test.describe('Article filtering', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(BASE_URL);
		// Wait for the mock delay to resolve and real rows to replace loading skeletons
		await page.getByText(SEARCH_MATCH_TITLE).waitFor();
	});

	test('Search filter matches articles and clears correctly', async ({ page }) => {
		const searchInput = page.getByLabel('Search');
		const rows = page.locator('tbody tr');

		await searchInput.fill(SEARCH_TERM);
		await expect(rows).toHaveCount(SEARCH_MATCH_COUNT);
		await expect(page.getByText(SEARCH_MATCH_TITLE)).toBeVisible();

		await searchInput.clear();
		await expect(rows).toHaveCount(TOTAL_COUNT);
	});

	test('Status filter shows only Published, only Draft, then resets to all', async ({ page }) => {
		const statusSelect = page.getByLabel('Status');
		const rows = page.locator('tbody tr');
		const publishedBadges = page.locator('tbody').getByText('Published', { exact: true });
		const draftBadges = page.locator('tbody').getByText('Draft', { exact: true });

		await statusSelect.selectOption('Published');
		await expect(rows).toHaveCount(PUBLISHED_COUNT);
		await expect(publishedBadges).toHaveCount(PUBLISHED_COUNT);
		await expect(draftBadges).toHaveCount(0);

		await statusSelect.selectOption('Draft');
		await expect(rows).toHaveCount(DRAFT_COUNT);
		await expect(draftBadges).toHaveCount(DRAFT_COUNT);
		await expect(publishedBadges).toHaveCount(0);

		await statusSelect.selectOption('');
		await expect(rows).toHaveCount(TOTAL_COUNT);
	});

	test('Combined search and status filter narrows results correctly', async ({ page }) => {
		const searchInput = page.getByLabel('Search');
		const statusSelect = page.getByLabel('Status');
		const rows = page.locator('tbody tr');

		await searchInput.fill(COMBINED_SEARCH);
		await statusSelect.selectOption(COMBINED_STATUS);

		await expect(rows).toHaveCount(COMBINED_MATCH_COUNT);
		await expect(page.getByText(COMBINED_MATCH_TITLE)).toBeVisible();
		await expect(rows.first().getByText('Published', { exact: true })).toBeVisible();
	});
});
