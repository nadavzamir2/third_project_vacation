import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10000,
  message: "Please try again later...",
  statusCode: 409,
});
    
export default limiter;
