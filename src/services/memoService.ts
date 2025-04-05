import api from './api';
import { Memo } from '../types';

export const memoService = {
  // Get a memo by ID
  getById: async (memoId: string): Promise<Memo> => {
    const response = await api.get(`/memos/${memoId}`);
    return response.data;
  },

  // Update a memo
  update: async (memoId: string, memo: Memo): Promise<Memo> => {
    const response = await api.put(`/memos/${memoId}`, memo);
    return response.data;
  },
}; 