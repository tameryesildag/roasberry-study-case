import express, { Request, Response } from "express";
import 'dotenv/config'
import bodyParser from "body-parser";
import { sequelize } from "./utils/database";
import { taskRouter } from "./routes/taskRoutes";
import apiError from "./types/ApiError";
import createServer from "./utils/server";

export const app = createServer();

sequelize.authenticate().then(() => {
    console.log("Database connection has been established successfully.");
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

app.listen(3000);