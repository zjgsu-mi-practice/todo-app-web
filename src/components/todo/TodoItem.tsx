import { useState } from 'react';
import { Calendar, Check, Clock, Edit, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Todo } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import TodoEditForm from './TodoEditForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Todo['status']) => void;
  onEdit: (id: string, todo: Todo) => void;
}

const statusColors = {
  pending: 'bg-yellow-200 text-yellow-800',
  in_progress: 'bg-blue-200 text-blue-800',
  completed: 'bg-green-200 text-green-800',
};

const TodoItem = ({ todo, onDelete, onStatusChange, onEdit }: TodoItemProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleStatusChange = () => {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    onStatusChange(todo.id!, newStatus);
  };

  return (
    <>
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`todo-${todo.id}`}
              checked={todo.status === 'completed'}
              onCheckedChange={handleStatusChange}
            />
            <CardTitle className={`text-lg ${todo.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </CardTitle>
          </div>
          <div>
            <Badge 
              variant="outline" 
              className={`${statusColors[todo.status]} mr-2`}
            >
              {todo.status.replace('_', ' ')}
            </Badge>
            {todo.dueDate && (
              <Badge variant="outline" className="bg-red-100 text-red-800">
                <Clock className="w-3 h-3 mr-1" />
                {format(new Date(todo.dueDate), 'MMM dd')}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {todo.description && (
            <p className="text-gray-600 mb-4">{todo.description}</p>
          )}
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete(todo.id!)}
            >
              <Trash className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <TodoEditForm 
            todo={todo} 
            onSubmit={(updatedTodo) => {
              onEdit(todo.id!, updatedTodo);
              setIsEditModalOpen(false);
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoItem; 