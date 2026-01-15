import express from 'express';
import { getUserById, getAllUsers, blockUser, unblockUser } from '../controllers/UserController';
import { authenticate, authorizeAdmin, authorizeSelfOrAdmin } from '../middleware/auth.middleware';
import { validateUserId } from '../middleware/validation.middleware';

const router = express.Router();

// Get user by ID - accessible by admin or user accessing their own data
router.get('/:id', authenticate, authorizeSelfOrAdmin, getUserById);

// Get all users - admin only
router.get('/', authenticate, authorizeAdmin, getAllUsers);

// Block/unblock user - accessible by admin or user blocking themselves
router.put('/:id/block', authenticate, authorizeSelfOrAdmin, blockUser);
router.put('/:id/unblock', authenticate, authorizeSelfOrAdmin, unblockUser);

export default router;