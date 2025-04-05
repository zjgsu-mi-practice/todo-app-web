export type Todo = {
  id?: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
  categoryId?: string;
  tagIds?: string[];
  memoId?: string;
};

export type Reminder = {
  id?: string;
  todoId?: string;
  time: string;
  notifyMethod?: 'email' | 'push' | 'sms';
};

export type Category = {
  id?: string;
  name: string;
  color?: string;
};

export type Tag = {
  id?: string;
  name: string;
};

export type Memo = {
  id?: string;
  content?: string;
  attachments?: string[];
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
};

export type ApiError = {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}; 