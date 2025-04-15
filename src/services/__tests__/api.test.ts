import axios from 'axios';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Import but don't use immediately to avoid test issues
import * as apiModule from '../api';

describe('API Service', () => {
  it('should create axios instance with correct baseURL', () => {
    // Clear mock calls
    jest.clearAllMocks();
    
    // Force creation of a new API instance to trigger axios.create
    require('../api');
    
    // Check that axios.create was called with the right config
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'http://localhost:8000',
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      })
    );
  });
}); 