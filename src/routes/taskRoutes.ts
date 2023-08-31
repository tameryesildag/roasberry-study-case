import express from "express";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/taskController";

export const taskRouter = express.Router();

taskRouter.post("/tasks", createTask);

taskRouter.get("/tasks/:taskId", getTask);

taskRouter.put("/tasks/:taskId", updateTask);

taskRouter.delete("/tasks/:taskId", deleteTask);