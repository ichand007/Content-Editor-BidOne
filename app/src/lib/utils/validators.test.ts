import { describe, it, expect } from 'vitest';
import { validateArticleForm } from './validators';

describe('validateArticleForm', () => {
  describe('valid input', () => {
    it('returns no errors when all fields are valid', () => {
      const result = validateArticleForm({
        title: 'Getting Started with SvelteKit',
        author: 'Alice Morgan',
        status: 'Published',
      });

      expect(result).toEqual({ title: null, author: null, status: null });
    });

    it('returns no errors for Draft status', () => {
      const result = validateArticleForm({
        title: 'My Draft Post',
        author: 'Ben Carter',
        status: 'Draft',
      });

      expect(result).toEqual({ title: null, author: null, status: null });
    });
  });

  describe('title validation', () => {
    it('returns an error when title is empty', () => {
      const result = validateArticleForm({
        title: '',
        author: 'Alice Morgan',
        status: 'Published',
      });

      expect(result.title).not.toBeNull();
    });

    it('returns an error when title is less than 3 characters', () => {
      const result = validateArticleForm({
        title: 'Hi',
        author: 'Alice Morgan',
        status: 'Published',
      });

      expect(result.title).not.toBeNull();
    });

    it('returns no error when title is exactly 3 characters', () => {
      const result = validateArticleForm({
        title: 'Hey',
        author: 'Alice Morgan',
        status: 'Published',
      });

      expect(result.title).toBeNull();
    });
  });

  describe('author validation', () => {
    it('returns an error when author is empty', () => {
      const result = validateArticleForm({
        title: 'A Valid Title',
        author: '',
        status: 'Published',
      });

      expect(result.author).not.toBeNull();
    });
  });

  describe('status validation', () => {
    it('returns an error when status is neither Published nor Draft', () => {
      const result = validateArticleForm({
        title: 'A Valid Title',
        author: 'Alice Morgan',
        status: 'Archived' as 'Published' | 'Draft',
      });

      expect(result.status).not.toBeNull();
    });
  });

  describe('multiple errors', () => {
    it('returns errors for all invalid fields simultaneously', () => {
      const result = validateArticleForm({
        title: '',
        author: '',
        status: 'Unknown' as 'Published' | 'Draft',
      });

      expect(result.title).not.toBeNull();
      expect(result.author).not.toBeNull();
      expect(result.status).not.toBeNull();
    });
  });
});
