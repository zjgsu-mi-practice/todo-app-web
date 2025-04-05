import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { apiResponse } from '@/lib/api-utils';
import { Todo } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse filter parameters
    const status = searchParams.get('status') as Todo['status'] | null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Get todos with filters
    const todos = db.getTodos(
      { status: status || undefined },
      { page, limit }
    );
    
    return apiResponse.success(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return apiResponse.error('Failed to fetch todos');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title) {
      return apiResponse.error('Title is required');
    }
    
    if (!body.status) {
      body.status = 'pending'; // Default status
    }
    
    // Create new todo
    const newTodo = db.createTodo(body);
    
    return apiResponse.success(newTodo, 201);
  } catch (error) {
    console.error('Error creating todo:', error);
    return apiResponse.error('Failed to create todo');
  }
} 