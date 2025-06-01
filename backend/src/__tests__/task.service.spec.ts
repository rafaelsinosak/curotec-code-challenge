jest.mock("@prisma/client");

import { prisma } from "../services/task.service";
import * as taskService from "../services/task.service";
import { Task } from "@prisma/client";

describe("task.service", () => {
  beforeEach(() => {
    (prisma.task.findMany as unknown as jest.Mock).mockReset();
    (prisma.task.findUnique as unknown as jest.Mock).mockReset();
    (prisma.task.create as unknown as jest.Mock).mockReset();
    (prisma.task.update as unknown as jest.Mock).mockReset();
    (prisma.task.delete as unknown as jest.Mock).mockReset();
  });

  describe("fetchAllTasks", () => {
    it("should return a list of tasks", async () => {
      const fakeTasks: Task[] = [
        {
          id: 1,
          title: "Task Alpha",
          description: "Desc A",
          status: "PENDING",
          dueDate: new Date("2025-01-01T00:00:00.000Z"),
          createdAt: new Date("2024-01-01T00:00:00.000Z"),
        },
        {
          id: 2,
          title: "Task Beta",
          description: "Desc B",
          status: "COMPLETED",
          dueDate: new Date("2025-02-01T00:00:00.000Z"),
          createdAt: new Date("2024-02-01T00:00:00.000Z"),
        },
      ];
      (prisma.task.findMany as unknown as jest.Mock).mockResolvedValueOnce(fakeTasks);

      const result = await taskService.fetchAllTasks();

      expect(prisma.task.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(fakeTasks);
    });
  });

  describe("fetchTaskById", () => {
    it("should return the task when found", async () => {
      const id = 10;
      const fakeTask: Task = {
        id,
        title: "Gamma Task",
        description: "Desc Gamma",
        status: "IN_PROGRESS",
        dueDate: new Date("2025-03-15T00:00:00.000Z"),
        createdAt: new Date("2024-03-15T00:00:00.000Z"),
      };
      (prisma.task.findUnique as unknown as jest.Mock).mockResolvedValueOnce(fakeTask);

      const result = await taskService.fetchTaskById(id);

      expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(fakeTask);
    });

    it("should return null when task is not found", async () => {
      const id = 123;
      (prisma.task.findUnique as unknown as jest.Mock).mockResolvedValueOnce(null);

      const result = await taskService.fetchTaskById(id);

      expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id } });
      expect(result).toBeNull();
    });
  });

  describe("createTask", () => {
    it("should create and return a new task", async () => {
      const input = {
        title: "Delta Task",
        description: "Desc Delta",
        status: "PENDING",
        dueDate: new Date("2025-04-01T00:00:00.000Z"),
      };
      const fakeCreated: Task = {
        id: 3,
        ...input,
        createdAt: new Date("2024-04-01T00:00:00.000Z"),
      };
      (prisma.task.create as unknown as jest.Mock).mockResolvedValueOnce(fakeCreated);

      const result = await taskService.createTask(input);

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          title: input.title,
          description: input.description,
          status: input.status,
          dueDate: input.dueDate,
        },
      });
      expect(result).toEqual(fakeCreated);
    });
  });

  describe("updateTask", () => {
    it("should update and return the task", async () => {
      const id = 5;
      const input = {
        id,
        title: "Epsilon Task",
        description: "Desc Epsilon",
        status: "COMPLETED",
        dueDate: new Date("2025-05-01T00:00:00.000Z"),
      };
      const fakeUpdated: Task = {
        id: input.id,
        title: input.title!,
        description: input.description!,
        status: input.status!,
        dueDate: input.dueDate!,
        createdAt: new Date("2024-05-01T00:00:00.000Z"),
      };
      (prisma.task.update as unknown as jest.Mock).mockResolvedValueOnce(fakeUpdated);

      const result = await taskService.updateTask(input);

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          status: input.status,
          dueDate: input.dueDate,
        },
      });
      expect(result).toEqual(fakeUpdated);
    });
  });

  describe("deleteTask", () => {
    it("should delete and return the deleted task", async () => {
      const id = 7;
      const fakeDeleted: Task = {
        id,
        title: "Zeta Task",
        description: "Desc Zeta",
        status: "PENDING",
        dueDate: new Date("2025-06-01T00:00:00.000Z"),
        createdAt: new Date("2024-06-01T00:00:00.000Z"),
      };
      (prisma.task.delete as unknown as jest.Mock).mockResolvedValueOnce(fakeDeleted);

      const result = await taskService.deleteTask(id);

      expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(fakeDeleted);
    });
  });
});
