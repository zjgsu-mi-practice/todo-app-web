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
    const memo = db.getMemoById(id);
    
    if (!memo) {
      return apiResponse.notFound('Memo not found');
    }
    
    return apiResponse.success(memo);
  } catch (error) {
    console.error('Error fetching memo:', error);
    return apiResponse.error('Failed to fetch memo');
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Make sure memo exists
    const existingMemo = db.getMemoById(id);
    if (!existingMemo) {
      return apiResponse.notFound('Memo not found');
    }
    
    // Update memo
    const updatedMemo = db.updateMemo(id, body);
    
    return apiResponse.success(updatedMemo);
  } catch (error) {
    console.error('Error updating memo:', error);
    return apiResponse.error('Failed to update memo');
  }
} 