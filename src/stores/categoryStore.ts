import { create } from 'zustand';
import { Category } from '../types';
import { categoryService } from '../services/categoryService';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchCategories: () => Promise<void>;
  createCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await categoryService.getAll();
      set({ categories, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch categories' });
    }
  },

  createCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const newCategory = await categoryService.create(category);
      set((state) => ({
        categories: [...state.categories, newCategory],
        loading: false,
      }));
      return newCategory;
    } catch (error) {
      set({ loading: false, error: 'Failed to create category' });
      throw error;
    }
  },
}));

export default useCategoryStore; 