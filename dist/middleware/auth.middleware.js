"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeSelfOrAdmin = exports.authorizeAdmin = exports.authenticate = void 0;
const auth_utils_1 = require("../utils/auth.utils");
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = (0, auth_utils_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.authenticate = authenticate;
const authorizeAdmin = (req, res, next) => {
    const userRole = req.user?.role;
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
// Middleware to check if user is accessing their own resource or has admin privileges
const authorizeSelfOrAdmin = (req, res, next) => {
    const userId = parseInt(req.params.id);
    const authenticatedUserId = req.user?.userId;
    const userRole = req.user?.role;
    // Allow admin to access any user
    if (userRole === 'admin') {
        next();
        return;
    }
    // Allow user to access their own data
    if (authenticatedUserId === userId) {
        next();
        return;
    }
    res.status(403).json({ message: 'Access denied. You can only access your own data.' });
};
exports.authorizeSelfOrAdmin = authorizeSelfOrAdmin;
