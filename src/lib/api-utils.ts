import { NextResponse } from 'next/server';

export const apiResponse = {
  success: <T>(data: T, status = 200) => {
    return NextResponse.json(data, { status });
  },
  
  error: (message: string, status = 400, details?: any) => {
    return NextResponse.json(
      {
        error: {
          code: status.toString(),
          message,
          details,
        },
      },
      { status }
    );
  },
  
  notFound: (message = 'Resource not found') => {
    return apiResponse.error(message, 404);
  },
  
  methodNotAllowed: (allowedMethods: string[]) => {
    return NextResponse.json(
      {
        error: {
          code: '405',
          message: 'Method not allowed',
        },
      },
      {
        status: 405,
        headers: {
          Allow: allowedMethods.join(', '),
        },
      }
    );
  },
}; 