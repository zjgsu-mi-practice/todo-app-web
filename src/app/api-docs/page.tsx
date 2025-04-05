import React from 'react';

// API documentation page
export default function ApiDocsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Todo App API Documentation</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Todos</h2>
          <div className="space-y-4">
            <ApiEndpoint 
              method="GET" 
              endpoint="/api/todos" 
              description="Get all todos with optional filters"
              queryParams={[
                { name: "status", type: "string", description: "Filter by status (pending, in_progress, completed)" },
                { name: "page", type: "number", description: "Page number for pagination" },
                { name: "limit", type: "number", description: "Number of items per page" },
              ]}
            />
            
            <ApiEndpoint 
              method="POST" 
              endpoint="/api/todos" 
              description="Create a new todo"
              requestBody={{
                title: "string (required)",
                description: "string (optional)",
                status: "string (pending, in_progress, completed) - defaults to pending",
                dueDate: "ISO string (optional)",
                categoryId: "string (optional)",
                tagIds: "string[] (optional)",
                memoId: "string (optional)",
              }}
            />
            
            <ApiEndpoint 
              method="GET" 
              endpoint="/api/todos/:id" 
              description="Get a specific todo by ID"
              pathParams={[
                { name: "id", type: "string", description: "Todo ID" },
              ]}
            />
            
            <ApiEndpoint 
              method="PUT" 
              endpoint="/api/todos/:id" 
              description="Update a specific todo"
              pathParams={[
                { name: "id", type: "string", description: "Todo ID" },
              ]}
              requestBody={{
                title: "string (optional)",
                description: "string (optional)",
                status: "string (optional)",
                dueDate: "ISO string (optional)",
                categoryId: "string (optional)",
                tagIds: "string[] (optional)",
                memoId: "string (optional)",
              }}
            />
            
            <ApiEndpoint 
              method="DELETE" 
              endpoint="/api/todos/:id" 
              description="Delete a specific todo"
              pathParams={[
                { name: "id", type: "string", description: "Todo ID" },
              ]}
            />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Reminders</h2>
          <div className="space-y-4">
            <ApiEndpoint 
              method="GET" 
              endpoint="/api/todos/:id/reminders" 
              description="Get all reminders for a specific todo"
              pathParams={[
                { name: "id", type: "string", description: "Todo ID" },
              ]}
            />
            
            <ApiEndpoint 
              method="POST" 
              endpoint="/api/todos/:id/reminders" 
              description="Create a reminder for a specific todo"
              pathParams={[
                { name: "id", type: "string", description: "Todo ID" },
              ]}
              requestBody={{
                time: "ISO string (required)",
                notifyMethod: "string (email, push, sms) (optional)",
              }}
            />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="space-y-4">
            <ApiEndpoint 
              method="GET" 
              endpoint="/api/categories" 
              description="Get all categories"
            />
            
            <ApiEndpoint 
              method="POST" 
              endpoint="/api/categories" 
              description="Create a new category"
              requestBody={{
                name: "string (required)",
                color: "string (optional)",
              }}
            />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Tags</h2>
          <div className="space-y-4">
            <ApiEndpoint 
              method="GET" 
              endpoint="/api/tags" 
              description="Get all tags"
            />
            
            <ApiEndpoint 
              method="POST" 
              endpoint="/api/tags" 
              description="Create a new tag"
              requestBody={{
                name: "string (required)",
              }}
            />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Memos</h2>
          <div className="space-y-4">
            <ApiEndpoint 
              method="GET" 
              endpoint="/api/memos/:id" 
              description="Get a specific memo"
              pathParams={[
                { name: "id", type: "string", description: "Memo ID" },
              ]}
            />
            
            <ApiEndpoint 
              method="PUT" 
              endpoint="/api/memos/:id" 
              description="Update a specific memo"
              pathParams={[
                { name: "id", type: "string", description: "Memo ID" },
              ]}
              requestBody={{
                content: "string (optional)",
                attachments: "string[] (optional)",
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

// Helper component for displaying API endpoints
interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  pathParams?: Array<{ name: string, type: string, description: string }>;
  queryParams?: Array<{ name: string, type: string, description: string }>;
  requestBody?: Record<string, string>;
}

function ApiEndpoint({ 
  method, 
  endpoint, 
  description, 
  pathParams, 
  queryParams, 
  requestBody 
}: ApiEndpointProps) {
  const methodColors = {
    GET: 'bg-blue-100 text-blue-800',
    POST: 'bg-green-100 text-green-800',
    PUT: 'bg-yellow-100 text-yellow-800',
    DELETE: 'bg-red-100 text-red-800',
  };
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        <span className={`${methodColors[method]} px-2 py-1 rounded font-mono text-sm font-bold`}>
          {method}
        </span>
        <span className="font-mono text-sm">{endpoint}</span>
      </div>
      
      <p className="text-gray-700 mb-3">{description}</p>
      
      {pathParams && pathParams.length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold mb-1">Path Parameters:</h4>
          <ul className="list-disc list-inside pl-2">
            {pathParams.map((param, idx) => (
              <li key={idx} className="text-sm">
                <span className="font-mono">{param.name}</span> ({param.type}): {param.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {queryParams && queryParams.length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold mb-1">Query Parameters:</h4>
          <ul className="list-disc list-inside pl-2">
            {queryParams.map((param, idx) => (
              <li key={idx} className="text-sm">
                <span className="font-mono">{param.name}</span> ({param.type}): {param.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {requestBody && Object.keys(requestBody).length > 0 && (
        <div>
          <h4 className="font-semibold mb-1">Request Body:</h4>
          <div className="bg-gray-50 p-2 rounded font-mono text-sm">
            {'{'}
            <div className="pl-4">
              {Object.entries(requestBody).map(([key, value], idx) => (
                <div key={idx}>
                  "{key}": {value}{idx < Object.keys(requestBody).length - 1 ? ',' : ''}
                </div>
              ))}
            </div>
            {'}'}
          </div>
        </div>
      )}
    </div>
  );
} 