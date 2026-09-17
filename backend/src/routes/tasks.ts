import { Router, Request, Response } from "express";
import { taskStore } from "../models/task";

export const tasksRouter = Router();

tasksRouter.get("/", (_req: Request, res: Response) => {
  res.json(taskStore.getAll());
});

tasksRouter.post("/", (req: Request, res: Response) => {
  const { title } = req.body as { title?: string };

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = taskStore.create(title.trim());
  res.status(201).json(task);
});

tasksRouter.patch("/:id/toggle", (req: Request, res: Response) => {
  const task = taskStore.toggleComplete(req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

tasksRouter.delete("/:id", (req: Request, res: Response) => {
  const removed = taskStore.remove(req.params.id);

  if (!removed) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
});
