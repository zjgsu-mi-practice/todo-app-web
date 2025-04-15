import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Import everything from testing-library
import * as testingLibrary from '@testing-library/react';

// Mock todos
export const mockTodoResponse = {
  data: [
    {
      id: '1',
      title: 'Learn React',
      description: 'Learn React basics',
      status: 'completed',
      dueDate: '2023-12-31',
    },
    {
      id: '2',
      title: 'Learn Next.js',
      description: 'Learn Next.js routing and API',
      status: 'pending',
      dueDate: '2024-01-15',
    },
  ],
  pagination: {
    total: 2,
    page: 1,
    limit: 10,
  }
};

export const mockEmptyTodoResponse = {
  data: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
  }
};

// Mock categories
export const mockCategories = [
  { id: '1', name: 'Work' },
  { id: '2', name: 'Personal' },
];

// Mock tags
export const mockTags = [
  { id: '1', name: 'Urgent' },
  { id: '2', name: 'Important' },
];

// Mock API
export const mockApi = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Export render as customRender
export { customRender as render }; 