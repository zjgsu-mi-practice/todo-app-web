import { render, screen, fireEvent } from '@/utils/test-utils';
import TodoItem from '../TodoItem';
import { format } from 'date-fns';

// Mock the TodoEditForm component
jest.mock('../TodoEditForm', () => {
  return function MockTodoEditForm({ onSubmit, onCancel }: any) {
    return (
      <div data-testid="todo-edit-form">
        <button onClick={() => onSubmit({ title: 'Updated Todo' })}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  };
});

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    title: 'Test Todo',
    description: 'This is a test todo',
    status: 'pending' as const,
    dueDate: new Date().toISOString(),
  };

  const mockHandlers = {
    onDelete: jest.fn(),
    onStatusChange: jest.fn(),
    onEdit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // Check that the todo title and description are displayed
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.description)).toBeInTheDocument();
    
    // Check that the status badge is displayed
    expect(screen.getByText('pending')).toBeInTheDocument();
    
    // Check that the due date is displayed
    const formattedDate = format(new Date(mockTodo.dueDate), 'MMM dd');
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    
    // Check that edit and delete buttons are displayed
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // Click delete button
    fireEvent.click(screen.getByText('Delete'));
    
    // Check that onDelete was called with the todo id
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('calls onStatusChange when checkbox is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // Find and click the checkbox
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Check that onStatusChange was called with the correct parameters
    expect(mockHandlers.onStatusChange).toHaveBeenCalledWith(mockTodo.id, 'completed');
  });

  it('opens edit modal when edit button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // Edit modal should not be visible initially
    expect(screen.queryByTestId('todo-edit-form')).not.toBeInTheDocument();
    
    // Click edit button
    fireEvent.click(screen.getByText('Edit'));
    
    // Check that edit modal is now visible
    expect(screen.getByTestId('todo-edit-form')).toBeInTheDocument();
  });

  it('calls onEdit when form is submitted', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // Click edit button to open modal
    fireEvent.click(screen.getByText('Edit'));
    
    // Find and click the Save button in the edit form
    fireEvent.click(screen.getByText('Save'));
    
    // Check that onEdit was called with the correct parameters
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTodo.id, { title: 'Updated Todo' });
    
    // Modal should be closed after submit
    expect(screen.queryByTestId('todo-edit-form')).not.toBeInTheDocument();
  });

  it('closes edit modal when cancel is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // Click edit button to open modal
    fireEvent.click(screen.getByText('Edit'));
    
    // Find and click the Cancel button in the edit form
    fireEvent.click(screen.getByText('Cancel'));
    
    // Check that modal is closed
    expect(screen.queryByTestId('todo-edit-form')).not.toBeInTheDocument();
  });

  it('applies completed styling when todo is completed', () => {
    const completedTodo = { ...mockTodo, status: 'completed' as const };
    render(<TodoItem todo={completedTodo} {...mockHandlers} />);
    
    // Find the title element and check that it has line-through styling
    const titleElement = screen.getByText(completedTodo.title);
    expect(titleElement).toHaveClass('line-through');
    expect(titleElement).toHaveClass('text-gray-500');
    
    // Check that the status badge shows "completed"
    expect(screen.getByText('completed')).toBeInTheDocument();
    
    // Check that the checkbox is checked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
}); 