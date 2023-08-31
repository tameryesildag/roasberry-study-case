import supertest from "supertest";
import { describe, expect, it, test, beforeAll } from '@jest/globals';
import createServer from "../utils/server";

beforeAll(() => {
    process.env["db-uri"] = "db-uri=postgresql://localhost:5432/roasberry"
})

const app = createServer();
let createdTaskId = "1";

describe("Creating a task", () => {
    describe("Given that input is valid", () => {
        it("It should respond with 201 and contain created task's JSON representation", async () => {
            const response = await supertest(app).post("/api/tasks").send({
                title: "newTitle",
                description: "newDescription",
                dueDate: "2025-10-05T14:48:00.000Z"
            });
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
            expect(response.body.id).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.description).toBeDefined();
            expect(response.body.dueDate).toBeDefined();
            createdTaskId = response.body.id;
        })
    })
    describe("Given that input is not valid", () => {
        it("It should respond with 400", async () => {
            const response = await supertest(app).post("/api/tasks").send({
                dueDate: "askdaskdask"
            });
            expect(response.statusCode).toBe(400);
        })
    })

})

describe("Get task", () => {
    describe("Given the task does not exist", () => {
        it("should return 404 not found", async () => {
            const response = await supertest(app).get("/api/tasks/182382138");
            expect(response.statusCode).toBe(404);
        })
    })
    describe("Given the task does exist", () => {
        it("should return a 200 status and the product", async () => {
            const response = await supertest(app).get("/api/tasks/" + createdTaskId);
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.description).toBeDefined();
            expect(response.body.dueDate).toBeDefined();
        })
    })
})

describe("Update task", () => {
    describe("Given the task does exist", () => {
        it("it should return a 200 and JSON", async () => {
            const response = await supertest(app).put("/api/tasks/" + createdTaskId).send({
                title: "this is the new title",
                description: "newDescription",
                dueDate: "2025-10-05T14:48:00.000Z"
            }).set("accept", "application/json");;
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBeDefined();
            expect(response.body.title).toBeDefined();
            expect(response.body.description).toBeDefined();
            expect(response.body.dueDate).toBeDefined();
        })
    })

    describe("Given the task does not exist", () => {
        it("it should return 404", async () => {
            const response = await supertest(app).put("/api/tasks/1283128");
            expect(response.statusCode).toBe(404);
        })
    })

    describe("Given the input is not valid", () => {
        it("it should return 400", async () => {
            const response = await supertest(app).put("/api/tasks/" + createdTaskId);
            expect(response.statusCode).toBe(400);
        })
    })

})


describe("Deleting a task", () => {
    describe("Given the task exists", () => {
        it("it should return 204", async () => {
            const response = await supertest(app).delete("/api/tasks/" + createdTaskId);
            expect(response.statusCode).toBe(204);
        })
    })
    describe("Given the task does not exist", () => {
        it("it should return 404", async () => {
            const response = await supertest(app).delete("/api/tasks/" + createdTaskId);
            expect(response.statusCode).toBe(404);
        })
    })
})
