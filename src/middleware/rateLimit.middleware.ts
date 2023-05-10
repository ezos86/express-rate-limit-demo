import { RequestHandler } from "express";
import config from "../config";

/**
 * 5 requests within 2 seconds of target api.
 */
const rateLimiter: RequestHandler = (req, res) => {
    // inside the que object, link, cost - the cost comes with the request
    // {
    //     client_id: 'xxx',
    //     cost: 1 // 1-5
    // }
    const callQue: any = {};
    const client_id = req.get("client_id");
    console.log("CLIENT ID", client_id);
    if (client_id) {
        // Determine the expensive requests that require cpu - We will do this by a amplifier
        // A simple cost * target amount, the large teh cost, the high the multiplication will be, right now, we have 1-5 as total cost and get it form the request header (how nice that is, vs calculating cost, but maybe we will try something.)
        if (callQue[client_id]) {
            if (callQue[client_id] > 5) {
                return res.status(429).json({
                    message: "Quota exceeded",
                });
            }
            callQue[client_id]++;
        } else {
            callQue[client_id] = 1;
            setTimeout(() => {
                delete callQue[client_id];
            }, 2000);
        }
    } else {
        return res.status(400).json({
            message: "Missing Client ID",
        });
    }
};

export default rateLimiter;
