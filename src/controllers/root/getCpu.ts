import { RequestHandler } from "express";
import config from "../../config";

/**
 * Health check endpoint
 */
const getCpu: RequestHandler = (req, res) => {
    res.status(200).json({
        name: config.name,
        description: "CPU",
    });
};

export default getCpu;
