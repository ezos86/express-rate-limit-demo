import supertest from "supertest";
import app from "../app";

describe("root endpoint get and post", () => {
    test("get root returns 200 and data", async () => {
        const result = await supertest(app).get("/").set("client_id", "xxx");
        expect(result.statusCode).toEqual(200);
    });

    test("post root echoes json", async () => {
        const result = await supertest(app).post("/").send({
            test: "value",
        });
        expect(result.statusCode).toEqual(200);
        expect(result.body).toBeTruthy();
        expect(result.body.test).toBe("value");
    });

    test("404 & json returned from nonexistent route", async () => {
        const result = await supertest(app).get("/badPath");
        expect(result.statusCode).toEqual(404);
        expect(result.body.message).toBeTruthy();
    });
});
