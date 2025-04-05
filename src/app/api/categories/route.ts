import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { apiResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const categories = db.getCategories();
    return apiResponse.success(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return apiResponse.error('Failed to fetch categories');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return apiResponse.error('Name is required');
    }
    
    // Create new category
    const newCategory = db.createCategory(body);
    
    return apiResponse.success(newCategory, 201);
  } catch (error) {
    console.error('Error creating category:', error);
    return apiResponse.error('Failed to create category');
  }
} 