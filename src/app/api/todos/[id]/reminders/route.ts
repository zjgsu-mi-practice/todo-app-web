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
    
    // Make sure todo exists
    const todo = db.getTodoById(id);
    if (!todo) {
      return apiResponse.notFound('Todo not found');
    }
    
    const reminders = db.getRemindersForTodo(id);
    return apiResponse.success(reminders);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return apiResponse.error('Failed to fetch reminders');
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Make sure todo exists
    const todo = db.getTodoById(id);
    if (!todo) {
      return apiResponse.notFound('Todo not found');
    }
    
    // Validate required fields
    if (!body.time) {
      return apiResponse.error('Time is required');
    }
    
    // Create new reminder
    const newReminder = db.createReminder(id, body);
    
    return apiResponse.success(newReminder, 201);
  } catch (error) {
    console.error('Error creating reminder:', error);
    return apiResponse.error('Failed to create reminder');
  }
} 