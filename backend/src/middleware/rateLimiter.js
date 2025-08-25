import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({ message: "Too Many Requests, Chill out a bit and try later" });
        }
        next();
    } catch (error) {
        console.error("Rate Limiter Error:", error);
        next(error);
    }
}

export default rateLimiter;