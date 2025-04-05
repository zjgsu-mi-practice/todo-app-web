import { create } from 'zustand';
import { Todo } from '../types';
import { todoService } from '../services/todoService';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  limit: number;
  totalTodos: number;
  currentTodo: Todo | null;
  currentFilter: 'all' | 'pending' | 'in_progress' | 'completed';

  // Actions
  fetchTodos: (page?: number, status?: 'pending' | 'in_progress' | 'completed') => Promise<void>;
  fetchTodoById: (id: string) => Promise<void>;
  createTodo: (todo: Omit<Todo, 'id'>) => Promise<Todo>;
  updateTodo: (id: string, todo: Todo) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
  setFilter: (filter: 'all' | 'pending' | 'in_progress' | 'completed') => void;
}

const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  limit: 20,
  totalTodos: 0,
  currentTodo: null,
  currentFilter: 'all',

  fetchTodos: async (page = 1, status) => {
    set({ loading: true, error: null });
    try {
      const filter = status || (get().currentFilter !== 'all' ? get().currentFilter as 'pending' | 'in_progress' | 'completed' : undefined);
      const response = await todoService.getAll({
        page,
        limit: get().limit,
        status: filter,
      });
      
      set({
        todos: response.data,
        currentPage: response.pagination.page,
        totalTodos: response.pagination.total,
        totalPages: Math.ceil(response.pagination.total / response.pagination.limit),
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: 'Failed to fetch todos',
      });
    }
  },

  fetchTodoById: async (id) => {
    set({ loading: true, error: null });
    try {
      const todo = await todoService.getById(id);
      set({ currentTodo: todo, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch todo' });
    }
  },

  createTodo: async (todo) => {
    set({ loading: true, error: null });
    try {
      const newTodo = await todoService.create(todo);
      set((state) => ({
        todos: [newTodo, ...state.todos],
        loading: false,
      }));
      return newTodo;
    } catch (error) {
      set({ loading: false, error: 'Failed to create todo' });
      throw error;
    }
  },

  updateTodo: async (id, todo) => {
    set({ loading: true, error: null });
    try {
      const updatedTodo = await todoService.update(id, todo);
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
        currentTodo: state.currentTodo?.id === id ? updatedTodo : state.currentTodo,
        loading: false,
      }));
      return updatedTodo;
    } catch (error) {
      set({ loading: false, error: 'Failed to update todo' });
      throw error;
    }
  },

  deleteTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      await todoService.delete(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: 'Failed to delete todo' });
      throw error;
    }
  },

  setFilter: (filter) => {
    set({ currentFilter: filter });
    get().fetchTodos(1);
  },
}));

export default useTodoStore; 