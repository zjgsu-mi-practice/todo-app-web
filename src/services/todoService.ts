import api from './api';
import { Todo, PaginatedResponse } from '../types';

export const todoService = {
  // Get all todos with optional filters
  getAll: async (params?: {
    status?: 'pending' | 'in_progress' | 'completed';
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Todo>> => {
    const response = await api.get('/todos', { params });
    return response.data;
  },

  // Get a todo by ID
  getById: async (id: string): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  create: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await api.post('/todos', todo);
    return response.data;
  },

  // Update an existing todo
  update: async (id: string, todo: Todo): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  },

  // Delete a todo
  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
}; 