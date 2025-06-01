# Frontend README

This is a React + TypeScript frontend application for managing **Tasks**. It uses Axios for API calls, Bootstrap for styling, and React Testing Library + Jest for unit tests. It demonstrates advanced state synchronization patterns including optimistic UI updates, error recovery, debounced search, and performance optimizations with memoization.

---

## Table of Contents

- [Frontend README](#frontend-readme)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
  - [Project Structure](#project-structure)
  - [Features](#features)
  - [Environment Configuration](#environment-configuration)
  - [Testing](#testing)
  - [Styling](#styling)
  - [Folder Layout](#folder-layout)
  - [Notes](#notes)

---

## Prerequisites

- Node.js (≥ 16.x) and npm or pnpm installed  
- A running backend server at `http://localhost:3001/api` (see backend README)  
- Git (optional, if you plan to clone/pull)

---

## Installation

1. **Clone or download** the repository into your local machine.  
2. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

3. **Install dependencies** using npm or pnpm:

   ```bash
   # Using npm
   npm install

   # OR using pnpm
   pnpm install
   ```

4. **Start the development server**:

   ```bash
   # npm
   npm start

   # pnpm
   pnpm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).  

---

## Available Scripts

From the `frontend/` directory, these scripts are available:

- **`npm start`** or **`pnpm start`**  
  Starts the development server on [http://localhost:3000](http://localhost:3000). The page reloads on edits, and you will see lint or type errors in the console.

- **`npm run build`** or **`pnpm build`**  
  Bundles the app for production to the `build/` folder. Files are minified and optimized.

- **`npm test`** or **`pnpm test`**  
  Launches Jest in watch mode, running unit tests for components. Press `a` to run all tests or follow on-screen instructions.

---

## Project Structure

```
frontend/
├─ node_modules/                 # Installed packages (do NOT commit)
├─ public/
│  └─ index.html                 # Static HTML template
├─ src/
│  ├─ api/
│  │  ├─ api.ts                  # Axios instance pointing to backend
│  │  └─ types.ts                # Shared TypeScript types (Task interface)
│  ├─ components/
│  │  ├─ TaskList.tsx            # Renders list of tasks with optimistic UI
│  │  ├─ TaskList.test.tsx       # Unit tests for TaskList
│  │  ├─ NewTaskForm.tsx         # Form to create new task (with validation)
│  │  ├─ NewTaskForm.test.tsx    # Unit tests for NewTaskForm
│  ├─ hooks/
│  │  ├─ useFetchTasks.ts        # Custom hook for fetching tasks
│  │  ├─ useSearchTasks.ts       # Custom hook for server-side search
│  │  └─ useDebouncedValue.ts    # Custom hook for debounced values
│  ├─ pages/
│  │  └─ TaskPage.tsx            # Page demonstrating combined list + search
│  ├─ index.css                  # Global CSS (imports Bootstrap CSS)
│  ├─ index.tsx                  # React entry point; imports Bootstrap CSS and renders App
│  ├─ App.tsx                    # Main application component
│  ├─ setupTests.ts              # Jest/RTL setup (if needed)
├─ __mocks__/
│  └─ axios.js                   # Mocks Axios for unit tests
├─ .gitignore                    # Ignores node_modules, build/, etc.
├─ jest.config.js                # Jest configuration (transforms, moduleNameMapper)
├─ package.json                  # NPM scripts and dependencies
├─ pnpm-lock.yaml                # pnpm lockfile (if using pnpm)
├─ README.md                     # This file
└─ tsconfig.json                 # TypeScript configuration
```

---

## Features

1. **CRUD Operations**  
   - **List Tasks**: Fetches tasks from backend and displays them.  
   - **Create Task**: Form with fields for title, description, status, and due date; validates inputs.  
   - **Update Task Status**: Toggle task status between "PENDING" and "COMPLETED" with optimistic UI update.  
   - **Edit & Delete**: Edit title/description/status/due date; delete tasks with confirmation.

2. **Optimistic UI Updates with Error Recovery**  
   - Status toggles occur immediately in the UI, before server confirmation.  
   - If the API call fails, the UI reverts to the previous state and shows an error message.

3. **Debounced Search**  
   - Search input filters tasks on the server side.  
   - Debounce ensures API is called only after the user stops typing for a set delay (e.g., 500ms).  
   - Displays "Searching..." while waiting for response.

4. **Performance Optimizations**  
   - Components use `React.memo` and `useCallback` to avoid unnecessary re-renders.  
   - Custom hooks isolate data fetching and debouncing logic.

5. **Type Safety**  
   - All components and hooks are written in TypeScript with strict typing.  
   - Shared `Task` interface under `src/api/types.ts`.

6. **Unit Testing**  
   - **Jest** + **React Testing Library** for components.  
   - Axios is auto-mocked in `__mocks__/axios.js` to avoid real HTTP requests.  
   - Tests verify loading, error, empty, and data states.

---

## Environment Configuration

The frontend talks to a backend API at:

```
http://localhost:3001/api
```

This can be customized in:

```ts
// src/api/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
});
```

To use a different URL, create a `.env` file in `frontend/`:

```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## Testing

We use **Jest** + **React Testing Library** for unit tests:

- **Mocking Axios**: The file `__mocks__/axios.js` auto-mocks Axios calls.  
- **Test Files**:  
  - `TaskList.test.tsx`: Covers loading, error, success, empty, and status toggle scenarios.  
  - `NewTaskForm.test.tsx`: Covers form validation, API call simulation, and error handling.

Run tests with:

```bash
npm test
# or
pnpm test
```

---

## Styling

We use **Bootstrap (v5)**:

1. **Install Bootstrap** (already included in dependencies):

   ```bash
   pnpm add bootstrap
   # or
   npm install bootstrap
   ```

2. **Import CSS** at the top of `src/index.tsx`:

   ```ts
   import "bootstrap/dist/css/bootstrap.min.css";
   import React from "react";
   ...
   ```

3. Use Bootstrap classes in JSX:
   - Forms: `className="form-control"`, `className="form-label"`, `className="btn btn-primary"`.  
   - Lists: `className="list-group"`, `className="list-group-item"`.  
   - Layout: `d-flex`, `justify-content-between`, `mb-3`, etc.

---

## Folder Layout

Below is a visual summary of major folders/files:

```
frontend/
├─ public/
│  └─ index.html
├─ src/
│  ├─ api/
│  │  ├─ api.ts
│  │  └─ types.ts
│  ├─ components/
│  │  ├─ TaskList.tsx
│  │  ├─ TaskList.test.tsx
│  │  ├─ NewTaskForm.tsx
│  │  └─ NewTaskForm.test.tsx
│  ├─ hooks/
│  │  ├─ useFetchTasks.ts
│  │  ├─ useSearchTasks.ts
│  │  └─ useDebouncedValue.ts
│  ├─ pages/
│  │  └─ TaskPage.tsx
│  ├─ index.css
│  ├─ index.tsx
│  ├─ App.tsx
│  ├─ setupTests.ts
├─ __mocks__/
│  └─ axios.js
├─ .gitignore
├─ jest.config.js
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
└─ tsconfig.json
```

---

## Notes

- **TypeScript**: All code is in TSX/TypeScript. Confirm your IDE recognizes `tsconfig.json`.  
- **Optimistic UI**: Implemented in `TaskList.tsx` with local state to show immediate UI changes.  
- **Debounced Search**: Implemented in `TaskPage.tsx` using the `useDebouncedValue` hook.  
- **Testing**: Axios is mocked; no real network requests in tests.  
- **Bootstrap**: Ensure `bootstrap/dist/css/bootstrap.min.css` is imported; otherwise, styling is lost.

---

Happy coding! If you encounter issues, check console logs, ensure the backend is running, and verify correct dependencies.  
