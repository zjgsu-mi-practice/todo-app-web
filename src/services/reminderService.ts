import api from './api';
import { Reminder } from '../types';

export const reminderService = {
  // Get all reminders for a todo
  getAllForTodo: async (todoId: string): Promise<Reminder[]> => {
    const response = await api.get(`/todos/${todoId}/reminders`);
    return response.data;
  },

  // Create a reminder for a todo
  create: async (todoId: string, reminder: Omit<Reminder, 'id' | 'todoId'>): Promise<Reminder> => {
    const response = await api.post(`/todos/${todoId}/reminders`, reminder);
    return response.data;
  },
}; 