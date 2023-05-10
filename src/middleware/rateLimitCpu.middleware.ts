import { RequestHandler } from "express";
const callQue: any = {};

/**
 * 5 requests within 2 seconds and calculate cost of each api - sent in header - of target api.
 */
const rateLimitCpu: RequestHandler = (req, res, next) => {
    // inside the que object, link, cost - the cost comes with the request
    // {
    //     client_id: 'xxx',
    //     cost: 1 // 1-5
    // }
    const client_id = req.get("client_id");
    const api_cost = Number(req.get("cost")) || 1;
    if (client_id) {
        // Determine the expensive requests that require cpu - We will do this by a amplifier
        // A simple cost * target amount, the large teh cost, the high the multiplication will be, right now, we have 1-5 as total cost and get it form the request header (how nice that is, vs calculating cost, but maybe we will try something.)
        // 5 * 5 = heaviest payload
        if (callQue[client_id]) {
            const computedPayload = callQue[client_id] * api_cost;
            if (callQue[client_id] > 75) {
                return res.status(429).json({
                    message: "Quota exceeded",
                });
            }
            callQue[client_id] = callQue[client_id] + computedPayload;
            next();
        } else {
            callQue[client_id] = 1;
            setTimeout(() => {
                delete callQue[client_id];
            }, 2000);
            next();
        }
    } else {
        return res.status(400).json({
            message: "Missing Client ID",
        });
    }
};

export default rateLimitCpu;
