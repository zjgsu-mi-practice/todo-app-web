import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { apiResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const tags = db.getTags();
    return apiResponse.success(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return apiResponse.error('Failed to fetch tags');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return apiResponse.error('Name is required');
    }
    
    // Create new tag
    const newTag = db.createTag(body);
    
    return apiResponse.success(newTag, 201);
  } catch (error) {
    console.error('Error creating tag:', error);
    return apiResponse.error('Failed to create tag');
  }
} 