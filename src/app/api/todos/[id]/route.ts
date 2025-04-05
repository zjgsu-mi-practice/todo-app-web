import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { apiResponse } from '@/lib/api-utils';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const todo = db.getTodoById(id);
    
    if (!todo) {
      return apiResponse.notFound('Todo not found');
    }
    
    return apiResponse.success(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return apiResponse.error('Failed to fetch todo');
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Make sure todo exists
    const existingTodo = db.getTodoById(id);
    if (!existingTodo) {
      return apiResponse.notFound('Todo not found');
    }
    
    // Update todo
    const updatedTodo = db.updateTodo(id, body);
    
    return apiResponse.success(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return apiResponse.error('Failed to update todo');
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // Make sure todo exists
    const existingTodo = db.getTodoById(id);
    if (!existingTodo) {
      return apiResponse.notFound('Todo not found');
    }
    
    // Delete todo
    db.deleteTodo(id);
    
    return apiResponse.success({ success: true }, 204);
  } catch (error) {
    console.error('Error deleting todo:', error);
    return apiResponse.error('Failed to delete todo');
  }
} 