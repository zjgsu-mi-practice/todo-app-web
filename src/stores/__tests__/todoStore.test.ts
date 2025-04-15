import { act, renderHook } from '@testing-library/react';
import useTodoStore from '../todoStore';
import { todoService } from '@/services/todoService';
import { mockTodoResponse } from '@/utils/test-utils';

// Mock the todo service
jest.mock('@/services/todoService', () => ({
  todoService: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}));

describe('TodoStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the store state before each test
    const { result } = renderHook(() => useTodoStore());
    act(() => {
      result.current.todos = [];
      result.current.error = null;
      result.current.loading = false;
      result.current.currentPage = 1;
      result.current.totalPages = 1;
      result.current.limit = 20;
      result.current.totalTodos = 0;
      result.current.currentTodo = null;
      result.current.currentFilter = 'all';
    });
  });

  describe('fetchTodos', () => {
    it('should fetch todos and update state', async () => {
      // Mock the service response
      (todoService.getAll as jest.Mock).mockResolvedValueOnce(mockTodoResponse);

      // Get the store hook
      const { result } = renderHook(() => useTodoStore());

      // Initial state should be empty
      expect(result.current.todos).toEqual([]);
      expect(result.current.loading).toBe(false);

      // Call fetchTodos
      await act(async () => {
        await result.current.fetchTodos();
      });

      // Check that the state was updated correctly
      expect(result.current.todos).toEqual(mockTodoResponse.data);
      expect(result.current.currentPage).toBe(mockTodoResponse.pagination.page);
      expect(result.current.totalTodos).toBe(mockTodoResponse.pagination.total);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);

      // Check that service was called with correct args
      expect(todoService.getAll).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        status: undefined,
      });
    });

    it('should handle errors when fetching todos', async () => {
      // Mock a service error
      const error = new Error('Failed to fetch todos');
      (todoService.getAll as jest.Mock).mockRejectedValueOnce({
        error: {
          message: 'Failed to fetch todos',
        }
      });

      // Get the store hook
      const { result } = renderHook(() => useTodoStore());

      // Call fetchTodos
      await act(async () => {
        await result.current.fetchTodos();
      });

      // Check that the error state was set
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to fetch todos');
      expect(result.current.todos).toEqual([]);
    });

    it('should apply status filter when currentFilter is not "all"', async () => {
      // Mock the service response
      (todoService.getAll as jest.Mock).mockResolvedValueOnce(mockTodoResponse);

      // Get the store hook
      const { result } = renderHook(() => useTodoStore());

      // Set the filter
      act(() => {
        result.current.currentFilter = 'pending';
      });

      // Call fetchTodos
      await act(async () => {
        await result.current.fetchTodos();
      });

      // Check that service was called with the filter
      expect(todoService.getAll).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        status: 'pending',
      });
    });
  });

  describe('createTodo', () => {
    it('should create a new todo and update state', async () => {
      // Mock data
      const newTodo = {
        title: 'New Todo',
        status: 'pending' as const,
      };

      const createdTodo = {
        ...newTodo,
        id: '123',
      };

      // Mock the service response
      (todoService.create as jest.Mock).mockResolvedValueOnce(createdTodo);

      // Get the store hook
      const { result } = renderHook(() => useTodoStore());

      // Call createTodo
      let returnedTodo;
      await act(async () => {
        returnedTodo = await result.current.createTodo(newTodo);
      });

      // Check that the state was updated correctly
      expect(result.current.todos).toEqual([createdTodo]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(returnedTodo).toEqual(createdTodo);

      // Check that service was called with correct args
      expect(todoService.create).toHaveBeenCalledWith(newTodo);
    });

    it('should handle errors when creating a todo', async () => {
      // Mock data
      const newTodo = {
        title: 'New Todo',
        status: 'pending' as const,
      };

      // Mock a service error
      (todoService.create as jest.Mock).mockRejectedValueOnce({
        error: {
          message: 'Failed to create todo',
        }
      });

      // Get the store hook
      const { result } = renderHook(() => useTodoStore());

      // Call createTodo and expect it to throw
      await act(async () => {
        try {
          await result.current.createTodo(newTodo);
        } catch (error) {
          // This is expected - ignore the error
        }
      });

      // Check that the error state was set (in a new act to ensure state updates are applied)
      act(() => {
        // Force any pending updates to be committed
      });
      
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to create todo');
    });
  });

  describe('updateTodo', () => {
    it('should update a todo and update state', async () => {
      // Mock data
      const todoId = '1';
      const existingTodo = {
        id: todoId,
        title: 'Old Title',
        status: 'pending' as const,
      };
      const updatedTodo = {
        ...existingTodo,
        title: 'Updated Title',
        status: 'completed' as const,
      };

      // Setup initial state
      const { result } = renderHook(() => useTodoStore());
      act(() => {
        result.current.todos = [existingTodo];
      });

      // Mock the service response
      (todoService.update as jest.Mock).mockResolvedValueOnce(updatedTodo);

      // Call updateTodo
      let returnedTodo;
      await act(async () => {
        returnedTodo = await result.current.updateTodo(todoId, updatedTodo);
      });

      // Check that the state was updated correctly
      expect(result.current.todos).toEqual([updatedTodo]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(returnedTodo).toEqual(updatedTodo);

      // Check that service was called with correct args
      expect(todoService.update).toHaveBeenCalledWith(todoId, updatedTodo);
    });

    it('should handle errors when updating a todo', async () => {
      // Mock data
      const todoId = '1';
      const existingTodo = {
        id: todoId,
        title: 'Old Title',
        status: 'pending' as const,
      };
      const updatedTodo = {
        ...existingTodo,
        title: 'Updated Title',
        status: 'completed' as const,
      };

      // Setup initial state
      const { result } = renderHook(() => useTodoStore());
      act(() => {
        result.current.todos = [existingTodo];
      });

      // Mock a service error
      (todoService.update as jest.Mock).mockRejectedValueOnce({
        error: {
          message: 'Failed to update todo',
        }
      });

      // Call updateTodo and expect it to throw
      await act(async () => {
        try {
          await result.current.updateTodo(todoId, updatedTodo);
        } catch (error) {
          // This is expected - ignore the error
        }
      });

      // Force any pending state updates
      act(() => {
        // Force pending updates
      });

      // Check that the error state was set
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to update todo');
      expect(result.current.todos).toEqual([existingTodo]);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo and update state', async () => {
      // Mock data
      const todoId = '1';
      const existingTodo = {
        id: todoId,
        title: 'Todo to delete',
        status: 'pending' as const,
      };

      // Setup initial state
      const { result } = renderHook(() => useTodoStore());
      act(() => {
        result.current.todos = [existingTodo];
      });

      // Mock the service response
      (todoService.delete as jest.Mock).mockResolvedValueOnce({});

      // Call deleteTodo
      await act(async () => {
        await result.current.deleteTodo(todoId);
      });

      // Check that the state was updated correctly
      expect(result.current.todos).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);

      // Check that service was called with correct args
      expect(todoService.delete).toHaveBeenCalledWith(todoId);
    });
  });

  describe('setFilter', () => {
    it('should set the filter and trigger fetchTodos', async () => {
      // Mock the service response
      (todoService.getAll as jest.Mock).mockResolvedValueOnce(mockTodoResponse);

      // Get the store hook
      const { result } = renderHook(() => useTodoStore());

      // Call setFilter
      await act(async () => {
        result.current.setFilter('completed');
      });

      // Check that the filter was set
      expect(result.current.currentFilter).toBe('completed');

      // Check that fetchTodos was called
      expect(todoService.getAll).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        status: 'completed',
      });
    });
  });

  describe('clearError', () => {
    it('should clear the error state', () => {
      // Setup initial state with error
      const { result } = renderHook(() => useTodoStore());
      act(() => {
        result.current.error = 'Some error';
      });

      // Call clearError
      act(() => {
        result.current.clearError();
      });

      // Check that error was cleared
      expect(result.current.error).toBe(null);
    });
  });
}); 