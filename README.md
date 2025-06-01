# Curotec Code Challenge

This repository contains a full-stack application for managing tasks. It includes:

- **Backend**: Express.js API with Prisma ORM for data persistence, supporting CRUD operations on tasks with fields: title, description, status, and dueDate.
- **Frontend**: React + TypeScript application for interacting with the API, featuring data fetching, optimistic UI updates, and debounced search.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/rafaelsinosak/curotec-code-challenge.git
   cd curotec-code-challenge
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pnpm install         # or npm install
   pnpm prisma generate # Generate Prisma client
   pnpm dev             # Start development server (ts-node-dev)
   ```
   The API will run at `http://localhost:3001/api`. Database migrations and schema versioning are handled by Prisma.

3. **Frontend Setup**:
   ```bash
   cd frontend
   pnpm install         # or npm install
   pnpm dev             # Starts React dev server on http://localhost:3000
   ```

4. **Run Tests**:
   - **Backend**: `pnpm test` in `backend/`
   - **Frontend**: `pnpm test` in `frontend/`

## Project Structure

```
curotec-code-challenge/
├── backend/           # Express.js + Prisma backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── __tests__/ # Jest tests for services/controllers
│   │   └── index.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── tsconfig.json
│   └── package.json
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── __tests__/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── tsconfig.json
│   └── package.json
└── README.md          # This file
```

## Tech Stack

- **Backend**: Node.js, Express, Prisma, PostgreSQL (or SQLite), Jest
- **Frontend**: React, TypeScript, Axios, React Testing Library, Jest, Bootstrap

## Features

- RESTful API with full CRUD for tasks
- Input validation and proper HTTP status codes
- Optimistic UI updates with error recovery
- Debounced search and filtering on tasks
- Unit tests for backend services and frontend components
- Database migrations for schema versioning
