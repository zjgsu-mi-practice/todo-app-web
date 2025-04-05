# Todo App Web Client

A modern, responsive web client for the Todo API built with Next.js 14, React, TypeScript, Tailwind CSS and shadcn/ui components.

## Features

- 📝 Create, read, update, and delete todos
- 🔄 Filter todos by status (all, pending, in progress, completed)
- 📅 Set due dates for todos
- 🏷️ Categorize todos
- 🔖 Add tags to todos
- 📒 Add memos with rich text content

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

3. Create a `.env.local` file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_API_URL=https://api.todoapp.com/v1
```

Replace the URL with your actual Todo API endpoint.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
│   ├── components/          # React components
│   │   ├── ui/              # UI components from shadcn/ui
│   │   ├── todo/            # Todo-specific components
│   │   ├── category/        # Category-specific components
│   │   ├── tag/             # Tag-specific components
│   │   ├── reminder/        # Reminder-specific components
│   │   └── memo/            # Memo-specific components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── services/            # API services
│   ├── stores/              # Zustand stores
│   └── types/               # TypeScript type definitions
├── public/                  # Static files
└── ...config files
```

## API Integration

This web client integrates with the Todo App API to fetch and manipulate todos, categories, tags, reminders, and memos. The API endpoints are defined in the services directory and consumed by the Zustand stores.

## License

This project is licensed under the MIT License.
