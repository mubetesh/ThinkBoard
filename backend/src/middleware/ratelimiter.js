import e from "express";
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const key = req.ip || req.headers["x-forwarded-for"] || "anon";

    const { success } = await ratelimit.limit(key);
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }

    next();
  } catch (error) {
    console.log("Rate limit error: ", error);
    next(error);
  }
};

export default rateLimiter;
