import { createPinia, setActivePinia } from 'pinia';
import { api } from '../../src/api/api';
import { mount } from '@vue/test-utils';
import HelpRequests from '../../src/Pages/HelpRequests.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('HelpRequests', () => {
  beforeEach(async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    vi.clearAllMocks();
    localStorage.setItem(
      'tokenAuth',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0ZDE4ZjIzLWMzZjItNDQ2MC05YTc3LTliOTViZjZiMWEzMCIsImlhdCI6MTczMjcyMTc5NSwiZXhwIjoxNzMyNzI1Mzk1fQ.Zk-7KtvAWISddtb4GxaDe8PSAqKO6zgYwavN-FhGo3Q'
    );
  });
  afterEach(() => {});
  it('Получение всех запросов помощи по токену', () => {
    api.getRequests = vi.fn();
    const wrapper = mount(HelpRequests);
    expect(api.getRequests).toHaveBeenCalledTimes(1);
  });
});
