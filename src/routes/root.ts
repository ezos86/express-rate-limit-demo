import express from "express";
import getRoot from "../controllers/root/getRoot";
import postRoot from "../controllers/root/postRoot";
import rateLimiter from "../middleware/rateLimit.middleware";
import rateLimitCpu from "../middleware/rateLimitCpu.middleware";

const root = express.Router();

root.get("/", rateLimiter, getRoot);
root.get("/hello", rateLimitCpu, getRoot);
root.post("/", postRoot);

export default root;
