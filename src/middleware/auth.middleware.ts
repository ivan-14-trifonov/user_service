import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.utils';
import { User } from '../models/User';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = (req as any).user?.role;
  
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  
  next();
};

// Middleware to check if user is accessing their own resource or has admin privileges
export const authorizeSelfOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.id);
  const authenticatedUserId = (req as any).user?.userId;
  const userRole = (req as any).user?.role;

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