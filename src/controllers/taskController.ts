import { NextFunction, Request, Response } from "express";
import Task from "../models/Task";
import ApiError from "../types/ApiError";
import CreateTaskRequest from "../types/CreateTaskRequest";
import paramSchema from "./validation/taskParams";
import taskSchema from "./validation/taskValidation";

export const createTask = async (req: Request<{}, {}, CreateTaskRequest>, res: Response, next: NextFunction) => {

    let newTask;

    try {
        newTask = await taskSchema.validate(req.body);
    }
    catch (error: any) {
        error.statusCode = 400;
        return next(error as ApiError);
    }

    let createdTask = await Task.create(newTask);
    res.contentType("application/json");
    res.statusCode = 201;
    res.send(JSON.stringify(createdTask));
}

export const getTask = async (req: Request, res: Response, next: NextFunction) => {

    let params;

    try {
        params = await paramSchema.validate(req.params);
        let task = await Task.findByPk(params.taskId);
        if (!task) throw new Error("Task not found!");
        res.statusCode = 200;
        res.contentType("application/json");
        res.send(JSON.stringify(task));

    } catch (error: any) {
        error.statusCode = 404;
        return next(error as ApiError);
    }
}

export const updateTask = async (req: Request<{}, {}, CreateTaskRequest>, res: Response, next: NextFunction) => {

    let params;
    let newTask: any;
    let task;

    try {
        params = await paramSchema.validate(req.params);
        task = await Task.findByPk(params.taskId);
        if (!task) throw new Error("Task not found!");
    } catch (error: any) {
        error.statusCode = 404;
        return next(error as ApiError);
    }

    try {
        newTask = await taskSchema.validate(req.body);
    } catch (error: any) {
        error.statusCode = 400;
        return next(error as ApiError);
    }

    task.set({
        ...newTask
    })

    await task.save();

    res.contentType("application/json");
    res.statusCode = 200;
    res.send(JSON.stringify(task));


}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    let params;

    try {
        params = await paramSchema.validate(req.params);
        let task = await Task.findByPk(params.taskId);
        if (!task) throw new Error("Task not found!");

        await task.destroy();

        res.contentType("application/json");
        res.statusCode = 204;
        res.send();

    } catch (error: any) {
        error.statusCode = 404;
        return next(error as ApiError);
    }

}