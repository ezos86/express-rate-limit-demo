import { RequestHandler } from "express";

/**
 * Hello World
 */
const getHello: RequestHandler = (req, res) => {
    setTimeout(() => {
        res.status(200).json({
            message: "hello world",
        });
    }, 1000);
};

export default getHello;
