# Todo App (Client + API)

A full-stack Todo application with both client and server-side implementation built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Features

- 📝 Create, read, update, and delete todos
- 🔄 Filter todos by status (all, pending, in progress, completed)
- 📅 Set due dates for todos
- 🏷️ Categorize todos
- 🔖 Add tags to todos
- 📒 Add memos with rich text content
- 🌐 Built-in API server with Next.js API routes

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-app-web.git
cd todo-app-web
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

### Run Production Build

```bash
npm start
# or
yarn start
```

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API Routes (Server-side)
│   │   │   ├── todos/       # Todo API endpoints
│   │   │   ├── categories/  # Categories API endpoints
│   │   │   ├── tags/        # Tags API endpoints 
│   │   │   └── memos/       # Memos API endpoints
│   ├── components/          # React components
│   │   ├── ui/              # UI components from shadcn/ui
│   │   ├── todo/            # Todo-specific components
│   │   ├── category/        # Category-specific components
│   │   ├── tag/             # Tag-specific components
│   │   ├── reminder/        # Reminder-specific components
│   │   └── memo/            # Memo-specific components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and database
│   ├── services/            # API services (Client-side)
│   ├── stores/              # Zustand stores
│   └── types/               # TypeScript type definitions
├── public/                  # Static files
└── ...config files
```

## API Implementation

The application includes a built-in API server implemented using Next.js API routes. The API routes are located in the `src/app/api` directory and follow a RESTful architecture:

- **GET /api/todos** - Get all todos with optional filters
- **POST /api/todos** - Create a new todo
- **GET /api/todos/:id** - Get a specific todo
- **PUT /api/todos/:id** - Update a specific todo
- **DELETE /api/todos/:id** - Delete a specific todo
- **GET /api/todos/:id/reminders** - Get reminders for a specific todo
- **POST /api/todos/:id/reminders** - Create a reminder for a specific todo
- **GET /api/categories** - Get all categories
- **POST /api/categories** - Create a new category
- **GET /api/tags** - Get all tags
- **POST /api/tags** - Create a new tag
- **GET /api/memos/:id** - Get a specific memo
- **PUT /api/memos/:id** - Update a specific memo

The API uses an in-memory database for persistence during the session. Data is reset when the server restarts.

## API Configuration

This application can work with either:

1. **Built-in API Server**: By default, the application uses its built-in Next.js API routes (`/api/*`) for data storage and retrieval.

2. **External API Server**: You can connect to an external API server by setting the `NEXT_PUBLIC_API_URL` variable in the `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://external-api-server.com
```

### Using the Built-in API

The built-in API uses an in-memory database for persistence during the session. Data is reset when the server restarts.

### Using an External API

If you want to use an external API server:

1. Make sure the external API follows the same endpoint structure as documented in the API Implementation section
2. Set the `NEXT_PUBLIC_API_URL` environment variable in `.env.local`
3. Run the application as usual

## License

This project is licensed under the MIT License.
