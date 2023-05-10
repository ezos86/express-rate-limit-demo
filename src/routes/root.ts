import express from "express";
import getRoot from "../controllers/root/getRoot";
import getCpu from "../controllers/root/getCpu";
import getHello from "../controllers/root/getHello";
import postRoot from "../controllers/root/postRoot";
import rateLimiter from "../middleware/rateLimit.middleware";
import rateLimitCpu from "../middleware/rateLimitCpu.middleware";

const root = express.Router();

root.get("/", rateLimiter, getRoot);
root.get("/cpu", rateLimitCpu, getCpu);
root.get("/hello", getHello);
root.post("/", postRoot);

export default root;
