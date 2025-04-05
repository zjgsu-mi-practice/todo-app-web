import api from './api';
import { Tag } from '../types';

export const tagService = {
  // Get all tags
  getAll: async (): Promise<Tag[]> => {
    const response = await api.get('/tags');
    return response.data;
  },

  // Create a new tag
  create: async (tag: Omit<Tag, 'id'>): Promise<Tag> => {
    const response = await api.post('/tags', tag);
    return response.data;
  },
}; 