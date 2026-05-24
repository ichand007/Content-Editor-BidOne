# Article Desk

An internal content management tool for editors to manage, search, and publish articles. Built as a frontend technical assessment for BidOne.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | SvelteKit + TypeScript |
| Styling | Tailwind CSS v4 |
| Unit / component tests | Vitest |
| UI / e2e tests | Playwright |

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Run all tests (unit + e2e)
npm run test
```

The dev server starts at `http://localhost:5173`.

---

## Project Structure

```
app/src/lib/
├── components/
│   ├── ui/          # Reusable primitives — Button, Input, Select, Modal, Badge, ConfirmDialog
│   └── articles/    # Feature components — ArticleList, ArticleRow, ArticleFilters, ArticleForm
├── stores/          # Svelte state management (articles, theme)
├── mocks/           # Simulated API layer with realistic async delays
├── utils/           # Validators and formatters
└── types/           # TypeScript interfaces
```

---

## Features

- Paginated article list (8 articles per page) with search and status filter — page resets automatically when filters change
- Add, edit, and delete articles via modal form
- Client-side form validation with per-field error messages
- Loading, error, and empty states handled throughout
- Light / dark theme toggle with smooth CSS transitions
- Fully keyboard accessible and screen reader friendly (WCAG AA)
- Mobile responsive layout

---

## Architecture Notes

**Component boundaries** — UI primitives (`Button`, `Input`, etc.) are self-contained and have no knowledge of article domain logic. Feature components consume them. This separation keeps the component library portable and would support extraction into a shared package or micro frontend without restructuring.

**Duplicate detection** — `isDuplicateArticle` exists in `utils/validators` and is tested. It is intentionally not wired to the UI; whether to surface duplicate warnings, block saves, or ignore duplicates is a product decision left for a real requirements conversation.

**Data persistence** — Articles are held in a Svelte store backed by an in-memory mock. State resets on page refresh by design. Replacing the mock functions in `lib/mocks/articles.ts` with real `fetch` calls would be the only change required to connect a production API — no component code would need to change.

---

## Testing

**Unit tests** (`npm run test:unit`)

Form validation logic is covered with Vitest, written test-first. Tests live in `app/tests/unit/`.

**UI / integration tests** (`npm run test:e2e`)

Playwright tests cover the article filtering feature end-to-end: search filter, status filter, and combined filter behaviour. Tests live in `app/tests/integration/`.

---

## Engineering Practices

- Conventional commits throughout the git history
- Svelte 5 runes syntax (`$state`, `$derived`, `$effect`, `$props`) used exclusively — no legacy Options API
- Reusable component library with consistent prop interfaces
- ESLint + Prettier configured and enforced
- Accessibility pass completed: semantic landmarks, ARIA labels, focus trapping in modals, keyboard navigation
