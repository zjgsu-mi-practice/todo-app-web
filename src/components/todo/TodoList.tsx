import { useEffect, useState } from 'react';
import { Todo } from '@/types';
import TodoItem from './TodoItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTodoStore from '@/stores/todoStore';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle, RefreshCw } from 'lucide-react';
import TodoCreateForm from './TodoCreateForm';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';

const TodoList = () => {
  const { 
    todos, loading, error, 
    fetchTodos, deleteTodo, updateTodo, 
    currentFilter, setFilter, clearError 
  } = useTodoStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleStatusChange = async (id: string, status: Todo['status']) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { ...todo, status });
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  const handleEdit = async (id: string, updatedTodo: Todo) => {
    await updateTodo(id, updatedTodo);
  };

  const handleCreateSuccess = (todo: Todo) => {
    setIsCreateModalOpen(false);
    // Optionally refresh the todos list or just rely on the store update
  };

  // Loading state
  if (loading && todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  // Error state with retry button
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-red-500">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <p className="mb-4">{error}</p>
        <Button variant="outline" onClick={() => fetchTodos()}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      <Tabs defaultValue={currentFilter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {todos.length > 0 ? (
            todos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onDelete={handleDelete} 
                onStatusChange={handleStatusChange}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No tasks found.</p>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create your first task
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending">
          {todos.filter(t => t.status === 'pending').length > 0 ? (
            todos
              .filter(t => t.status === 'pending')
              .map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onDelete={handleDelete} 
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                />
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">No pending tasks found.</div>
          )}
        </TabsContent>
        
        <TabsContent value="in_progress">
          {todos.filter(t => t.status === 'in_progress').length > 0 ? (
            todos
              .filter(t => t.status === 'in_progress')
              .map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onDelete={handleDelete} 
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                />
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">No in-progress tasks found.</div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {todos.filter(t => t.status === 'completed').length > 0 ? (
            todos
              .filter(t => t.status === 'completed')
              .map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onDelete={handleDelete} 
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                />
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">No completed tasks found.</div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Create Todo Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <TodoCreateForm 
            onSubmit={handleCreateSuccess}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoList;