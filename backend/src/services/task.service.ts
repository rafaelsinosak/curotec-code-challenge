import { PrismaClient, Task } from "@prisma/client";

export const prisma = new PrismaClient();

export async function fetchAllTasks(): Promise<Task[]> {
  return prisma.task.findMany();
}

export async function fetchTaskById(id: number): Promise<Task | null> {
  return prisma.task.findUnique({ where: { id } });
}

export interface TaskCreateInput {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
}

export async function createTask(data: TaskCreateInput): Promise<Task> {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
    },
  });
}

export interface TaskUpdateInput {
  id: number;
  title?: string;
  description?: string;
  status?: string;
  dueDate?: Date;
}

export async function updateTask(data: TaskUpdateInput): Promise<Task> {
  const { id, ...rest } = data;
  return prisma.task.update({
    where: { id },
    data: { ...rest },
  });
}

export async function deleteTask(id: number): Promise<Task> {
  return prisma.task.delete({ where: { id } });
}
