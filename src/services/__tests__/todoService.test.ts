import { todoService } from '../todoService';
import api from '../api';
import { mockTodoResponse } from '@/utils/test-utils';

// Mock the API module
jest.mock('../api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Todo Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all todos', async () => {
      // Mock the API response
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: mockTodoResponse
      });

      // Call the method
      const result = await todoService.getAll();

      // Assert API was called with correct params
      expect(api.get).toHaveBeenCalledWith('/todos', { params: undefined });
      
      // Assert the result is correct
      expect(result).toEqual(mockTodoResponse);
    });

    it('should handle filtering todos by status', async () => {
      // Mock the API response
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: mockTodoResponse
      });

      // Call the method with filter
      await todoService.getAll({ status: 'pending' });

      // Assert API was called with correct params
      expect(api.get).toHaveBeenCalledWith('/todos', { 
        params: { status: 'pending' } 
      });
    });

    it('should handle pagination', async () => {
      // Mock the API response
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: mockTodoResponse
      });

      // Call the method with pagination
      await todoService.getAll({ page: 2, limit: 10 });

      // Assert API was called with correct params
      expect(api.get).toHaveBeenCalledWith('/todos', { 
        params: { page: 2, limit: 10 } 
      });
    });

    it('should return empty data when API returns 404', async () => {
      // Mock a 404 error response
      (api.get as jest.Mock).mockRejectedValueOnce({
        error: {
          code: 404,
          message: 'Not found'
        }
      });

      // Call the method
      const result = await todoService.getAll();

      // Assert the result is an empty array
      expect(result).toEqual({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 20
        }
      });
    });

    it('should throw error for non-404 errors', async () => {
      // Mock a 500 error response
      const error = {
        error: {
          code: 500,
          message: 'Server error'
        }
      };
      (api.get as jest.Mock).mockRejectedValueOnce(error);

      // Call the method and expect it to throw
      await expect(todoService.getAll()).rejects.toEqual(error);
    });
  });

  describe('getById', () => {
    it('should fetch a todo by id', async () => {
      // Mock the API response
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: mockTodoResponse.data[0]
      });

      // Call the method
      const result = await todoService.getById('1');

      // Assert API was called with correct URL
      expect(api.get).toHaveBeenCalledWith('/todos/1');
      
      // Assert the result is correct
      expect(result).toEqual(mockTodoResponse.data[0]);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const newTodo = {
        title: 'New Todo',
        status: 'pending' as const
      };

      const createdTodo = {
        ...newTodo,
        id: '123'
      };

      // Mock the API response
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: createdTodo
      });

      // Call the method
      const result = await todoService.create(newTodo);

      // Assert API was called with correct params
      expect(api.post).toHaveBeenCalledWith('/todos', newTodo);
      
      // Assert the result is correct
      expect(result).toEqual(createdTodo);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const todoId = '1';
      const updateData = {
        id: todoId,
        title: 'Updated Todo',
        status: 'completed' as const
      };

      // Mock the API response
      (api.put as jest.Mock).mockResolvedValueOnce({
        data: updateData
      });

      // Call the method
      const result = await todoService.update(todoId, updateData);

      // Assert API was called with correct params
      expect(api.put).toHaveBeenCalledWith(`/todos/${todoId}`, updateData);
      
      // Assert the result is correct
      expect(result).toEqual(updateData);
    });
  });

  describe('delete', () => {
    it('should delete a todo', async () => {
      const todoId = '1';

      // Mock the API response
      (api.delete as jest.Mock).mockResolvedValueOnce({});

      // Call the method
      await todoService.delete(todoId);

      // Assert API was called with correct URL
      expect(api.delete).toHaveBeenCalledWith(`/todos/${todoId}`);
    });
  });
}); 