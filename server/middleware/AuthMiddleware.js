import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")[1];

    if(!token) return sendErrorResponse(res, {message: "No token provided"}, 401);

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return sendErrorResponse(res, {message: "Invalid or expired token"}, 403);
        req.user = decoded;
        next();
    });
}

export default authMiddleware;