import { create } from 'zustand';
import { Tag } from '../types';
import { tagService } from '../services/tagService';

interface TagState {
  tags: Tag[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchTags: () => Promise<void>;
  createTag: (tag: Omit<Tag, 'id'>) => Promise<Tag>;
}

const useTagStore = create<TagState>((set) => ({
  tags: [],
  loading: false,
  error: null,

  fetchTags: async () => {
    set({ loading: true, error: null });
    try {
      const tags = await tagService.getAll();
      set({ tags, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch tags' });
    }
  },

  createTag: async (tag) => {
    set({ loading: true, error: null });
    try {
      const newTag = await tagService.create(tag);
      set((state) => ({
        tags: [...state.tags, newTag],
        loading: false,
      }));
      return newTag;
    } catch (error) {
      set({ loading: false, error: 'Failed to create tag' });
      throw error;
    }
  },
}));

export default useTagStore; 