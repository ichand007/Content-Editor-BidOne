import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

const _store = writable<Theme>('light');

export const theme = { subscribe: _store.subscribe };

export function initTheme(): void {
  if (typeof window === 'undefined') { return; }

  const stored = localStorage.getItem('theme');
  const initial: Theme =
    stored === 'light' || stored === 'dark'
      ? stored
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

  _store.set(initial);
  document.documentElement.classList.toggle('dark', initial === 'dark');
}

export function toggleTheme(): void {
  _store.update((current) => {
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
    return next;
  });
}
