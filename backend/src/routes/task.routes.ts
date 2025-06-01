import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.post("/", createNewTask);

router.put("/:id", updateExistingTask);

router.delete("/:id", deleteExistingTask);

export default router;
