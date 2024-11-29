import { errorHandler } from "./error.js";
import  jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    
    if (!token) return next(errorHandler(401, 'You are not Authenticated'));
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;  
        next();
    });
};
