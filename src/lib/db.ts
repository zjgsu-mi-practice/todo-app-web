import { Todo, Category, Tag, Reminder, Memo } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// In-memory database
class InMemoryDB {
  todos: Todo[] = [];
  categories: Category[] = [];
  tags: Tag[] = [];
  reminders: Reminder[] = [];
  memos: Memo[] = [];

  constructor() {
    // Initialize with some sample data
    this.categories = [
      { id: '1', name: 'Work', color: '#ff5722' },
      { id: '2', name: 'Personal', color: '#2196f3' },
      { id: '3', name: 'Shopping', color: '#4caf50' },
    ];

    this.tags = [
      { id: '1', name: 'Important' },
      { id: '2', name: 'Urgent' },
      { id: '3', name: 'Later' },
    ];

    this.memos = [
      { id: '1', content: 'Remember to check the documentation' },
    ];

    this.todos = [
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Draft the project proposal for the client meeting',
        status: 'in_progress',
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        categoryId: '1',
        tagIds: ['1', '2'],
        memoId: '1',
      },
      {
        id: '2',
        title: 'Buy groceries',
        description: 'Get milk, eggs, bread, and vegetables',
        status: 'pending',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        categoryId: '3',
      },
      {
        id: '3',
        title: 'Go for a run',
        description: 'Run for 30 minutes in the park',
        status: 'completed',
        categoryId: '2',
      },
    ];

    this.reminders = [
      {
        id: '1',
        todoId: '1',
        time: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        notifyMethod: 'email',
      },
    ];
  }

  // Todos
  getTodos(filter?: { status?: Todo['status'] }, pagination?: { page: number, limit: number }) {
    let filteredTodos = [...this.todos];
    
    if (filter?.status) {
      filteredTodos = filteredTodos.filter(todo => todo.status === filter.status);
    }
    
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 20;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      data: filteredTodos.slice(start, end),
      pagination: {
        total: filteredTodos.length,
        page,
        limit,
      },
    };
  }

  getTodoById(id: string) {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(todo: Omit<Todo, 'id'>) {
    const newTodo = { ...todo, id: uuidv4() };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: string, todo: Partial<Todo>) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    this.todos[index] = { ...this.todos[index], ...todo };
    return this.todos[index];
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    
    this.todos.splice(index, 1);
    // Clean up related reminders
    this.reminders = this.reminders.filter(r => r.todoId !== id);
    return true;
  }

  // Categories
  getCategories() {
    return this.categories;
  }

  createCategory(category: Omit<Category, 'id'>) {
    const newCategory = { ...category, id: uuidv4() };
    this.categories.push(newCategory);
    return newCategory;
  }

  // Tags
  getTags() {
    return this.tags;
  }

  createTag(tag: Omit<Tag, 'id'>) {
    const newTag = { ...tag, id: uuidv4() };
    this.tags.push(newTag);
    return newTag;
  }

  // Reminders
  getRemindersForTodo(todoId: string) {
    return this.reminders.filter(reminder => reminder.todoId === todoId);
  }

  createReminder(todoId: string, reminder: Omit<Reminder, 'id' | 'todoId'>) {
    const newReminder = { ...reminder, id: uuidv4(), todoId };
    this.reminders.push(newReminder);
    return newReminder;
  }

  // Memos
  getMemoById(id: string) {
    return this.memos.find(memo => memo.id === id);
  }

  updateMemo(id: string, memo: Partial<Memo>) {
    const index = this.memos.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    this.memos[index] = { ...this.memos[index], ...memo };
    return this.memos[index];
  }

  createMemo(memo: Omit<Memo, 'id'>) {
    const newMemo = { ...memo, id: uuidv4() };
    this.memos.push(newMemo);
    return newMemo;
  }
}

// Create a singleton instance
const db = new InMemoryDB();

export default db; 