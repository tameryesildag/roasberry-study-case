import express, { NextFunction, Request, Response } from "express";
import { taskRouter } from "../routes/taskRoutes";
import ApiError from "../types/ApiError";
import bodyParser from "body-parser";

function createServer() {
    const app = express();

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended: true}));

    app.use("/api", taskRouter);

    app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
        res.statusCode = err.statusCode;
        res.send({ message: err.message });
        return;
    })

    return app;
}

export default createServer;