import supertest from "supertest";
import app from "../app";

describe("Testing rate limits", () => {
    test("Retreive data failed due to quota exceed", async () => {
        const result = [];
        for (let i = 0; i < 7; i++) {
            result[i] = await supertest(app).get("/").set("client_id", "xxx");
        }
        expect(result[result.length - 1].statusCode).toEqual(429);
        expect(result[result.length - 1].body.message).toBeTruthy();
    });

    test("Retrieves data", async () => {
        const result = await supertest(app).get("/");
        const getApi = setInterval(async () => {
            await supertest(app).get("/");
        }, 1000);

        setTimeout(() => {
            clearInterval(getApi);
            expect(result.statusCode).toEqual(200);
            expect(result.body.message).toBeTruthy();
        }, 4000);
    });

    test("Retrives data for Rate Sliding Window until fail", async () => {
        setTimeout(async () => {
            await supertest(app).get("/");
            await supertest(app).get("/");
            await supertest(app).get("/");
            await supertest(app).get("/");
            await supertest(app).get("/");
        }, 1900);
        setTimeout(async () => {
            const result = await supertest(app).get("/");
            expect(result.statusCode).toEqual(429);
            expect(result.body.message).toBeTruthy();
            expect(result.body.message).toEqual("Quota exceeded");
        }, 2100);
    });
});
