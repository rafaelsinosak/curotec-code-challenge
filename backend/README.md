# Backend README

This is the backend application for managing “Items”. It uses Node.js, TypeScript, Express, and Prisma ORM with PostgreSQL. You’ll learn how to install dependencies, set up environment variables, run migrations, generate the Prisma Client, and run the server.

---

## Table of Contents

- [Backend README](#backend-readme)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Migrations \& Prisma Client](#database-migrations--prisma-client)
  - [Available Scripts](#available-scripts)
  - [Project Structure](#project-structure)
  - [API Endpoints](#api-endpoints)
  - [Testing](#testing)
  - [Notes](#notes)

---

## Prerequisites

- Node.js (>=16.x) and pnpm or npm installed  
- PostgreSQL database (local or remote)  
- Git (optional)

---

## Installation

1. **Clone or download** the repository to your local machine.  
2. Navigate to the `backend/` directory:

   ```bash
   cd backend
   ```

3. **Install dependencies** using pnpm or npm:

   ```bash
   # Using pnpm
   pnpm install

   # Or, using npm
   npm install
   ```

---

## Environment Variables

Create a `.env` file in the `backend/` folder with your database connection. At minimum, set:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
```

- Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE_NAME` with your PostgreSQL credentials.  
- Prisma will read `DATABASE_URL` to connect and run migrations.

---

## Database Migrations & Prisma Client

Prisma manages migrations and generates a type-safe client.

1. **Edit Prisma schema**  
   Open `prisma/schema.prisma`. Define your data model, for example:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model Item {
     id        Int      @id @default(autoincrement())
     name      String
     createdAt DateTime @default(now())
   }
   ```

2. **Generate Prisma Client & run initial migration**  
   Run the following to create your first migration and generate the client:

   ```bash
   pnpm prisma migrate dev --name init
   ```

   - This will create a new folder under `prisma/migrations/` containing SQL for the `Item` table.  
   - It also updates your database schema and generates the Prisma Client in `node_modules/@prisma/client`.

3. **Subsequent migrations**  
   After modifying `schema.prisma`, run:

   ```bash
   pnpm prisma migrate dev --name describe_changes
   ```

4. **Generate Prisma Client only** (if you only need to update the client after a schema change):

   ```bash
   pnpm prisma generate
   ```

5. **Deploy migrations in production**  
   On a production environment, apply pending migrations with:

   ```bash
   pnpm prisma migrate deploy
   ```

---

## Available Scripts

In the `backend/` folder, these npm scripts are available:

- **`pnpm dev`**  
  Starts the server in development mode with auto-reload using `ts-node-dev`.  
  ```bash
  pnpm dev
  ```
  The server will run at `http://localhost:3001` by default.

- **`pnpm build`**  
  Compiles TypeScript files to JavaScript under `dist/`.  
  ```bash
  pnpm build
  ```

- **`pnpm start`**  
  After building, starts the production server from `dist/index.js`.  
  ```bash
  pnpm start
  ```

- **`pnpm test`**  
  Runs Jest tests (unit tests for services).  
  ```bash
  pnpm test
  ```

---

## Project Structure

```
backend/
├─ src/
│  ├─ controllers/
│  │  └─ item.controller.ts      # Express route handlers
│  ├─ routes/
│  │  └─ item.routes.ts          # Express router for /items endpoints
│  ├─ services/
│  │  └─ item.service.ts         # Business logic & Prisma queries
│  ├─ middlewares/
│  │  └─ errorHandler.ts         # Error-handling middleware
│  ├─ prisma/
│  │  ├─ migrations/             # Auto-generated SQL migrations
│  │  └─ schema.prisma           # Prisma schema definition
│  ├─ index.ts                   # Entry point: sets up Express, routes, middleware
│  └─ index.ts                   # (duplicate? ensure correct path)
├─ .env                          # Environment variables (DATABASE_URL)
├─ node_modules/                 # Installed dependencies (do NOT commit)
├─ tsconfig.json                 # TypeScript configuration
├─ package.json                  # Scripts & dependencies
├─ pnpm-lock.yaml                # pnpm lockfile (or package-lock.json)
├─ jest.config.js                # Jest configuration for testing
└─ README.md                     # (this file)
```

---

## API Endpoints

The server exposes a RESTful API under `/api/items`. By default, the base URL is `http://localhost:3001/api`.

| Method | Endpoint          | Description                            | Request Body           |
| ------ | ----------------- | ---------------------------------------| ---------------------- |
| GET    | `/api/items`      | Fetch all items                        | —                      |
| GET    | `/api/items/:id`  | Fetch a single item by its `id`        | —                      |
| POST   | `/api/items`      | Create a new item                      | `{ "name": "ItemName" }` |
| PUT    | `/api/items/:id`  | Update an existing item’s `name`       | `{ "name": "NewName" }`  |
| DELETE | `/api/items/:id`  | Delete an item by its `id`             | —                      |

All responses are in JSON. Errors are returned with a relevant HTTP status code and a body `{ error: "message" }`.

---

## Testing

Unit tests use **Jest** and **ts-jest**:

- Tests live in `src/__tests__/`, e.g. `item.service.spec.ts`.  
- The Prisma client is mocked (see `src/__mocks__/@prisma/client.ts`).  
- Run all tests:

  ```bash
  pnpm test
  ```
- Coverage is reported in the console.

---

## Notes

- **TypeScript**: The project is written in TypeScript. Check `tsconfig.json` for compiler settings.  
- **Prisma**: Always run `pnpm prisma generate` after changing `schema.prisma`.  
- **Port**: By default, the server listens on `PORT 3001`. You can override via `process.env.PORT` in `.env` if needed.  
- **Error Handling**: All exceptions go through a centralized error-handling middleware sending proper HTTP status and JSON error.  

Happy coding! If you run into issues, check console logs, verify that `DATABASE_URL` is correct, and ensure PostgreSQL is running.  
