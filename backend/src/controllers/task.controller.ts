import { Request, Response, NextFunction } from "express";
import {
  fetchAllTasks,
  fetchTaskById,
  createTask,
  updateTask,
  deleteTask,
  TaskCreateInput,
  TaskUpdateInput,
} from "../services/task.service";

const ALLOWED_STATUSES = ["PENDING", "IN_PROGRESS", "COMPLETED"];

function isValidISODateString(value: any): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await fetchAllTasks();
    return res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await fetchTaskById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json(task);
  } catch (err) {
    next(err);
  }
};

export const createNewTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ error: "Title is required and must be a non-empty string." });
    }
    if (typeof description !== "string") {
      return res.status(400).json({ error: "Description is required and must be a string." });
    }
    if (typeof status !== "string" || !ALLOWED_STATUSES.includes(status.toUpperCase())) {
      return res
        .status(400)
        .json({ error: `Status is required and must be one of: ${ALLOWED_STATUSES.join(", ")}` });
    }
    if (!isValidISODateString(dueDate)) {
      return res.status(400).json({ error: "dueDate must be a valid ISO date string." });
    }

    const payload: TaskCreateInput = {
      title: title.trim(),
      description: description.trim(),
      status: status.toUpperCase(),
      dueDate: new Date(dueDate),
    };
    const newTask = await createTask(payload);
    return res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

export const updateExistingTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const { title, description, status, dueDate } = req.body;
    const updateData: TaskUpdateInput = { id };

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(400).json({ error: "Title must be a non-empty string." });
      }
      updateData.title = title.trim();
    }
    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({ error: "Description must be a string." });
      }
      updateData.description = description.trim();
    }
    if (status !== undefined) {
      if (typeof status !== "string" || !ALLOWED_STATUSES.includes(status.toUpperCase())) {
        return res
          .status(400)
          .json({ error: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}` });
      }
      updateData.status = status.toUpperCase();
    }
    if (dueDate !== undefined) {
      if (!isValidISODateString(dueDate)) {
        return res.status(400).json({ error: "dueDate must be a valid ISO date string." });
      }
      updateData.dueDate = new Date(dueDate);
    }

    const updated = await updateTask(updateData);
    return res.json(updated);
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }
    next(err);
  }
};

export const deleteExistingTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const deleted = await deleteTask(id);
    return res.json(deleted);
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }
    next(err);
  }
};
