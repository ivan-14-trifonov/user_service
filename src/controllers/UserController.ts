import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only return necessary fields (excluding password)
    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      birthDate: user.birthDate
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll();
    
    // Map to exclude password field
    const usersWithoutPasswords = users.map(user => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      birthDate: user.birthDate
    }));
    
    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const blockUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Check if user exists
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Block the user by setting isActive to false
    const updatedUser = await userService.updateIsActive(userId, false);
    if (!updatedUser) {
      return res.status(500).json({ message: 'Failed to update user status' });
    }

    res.status(200).json({
      message: 'User blocked successfully',
      user: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive
      }
    });
  } catch (error) {
    console.error('Block user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const unblockUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Check if user exists
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Unblock the user by setting isActive to true
    const updatedUser = await userService.updateIsActive(userId, true);
    if (!updatedUser) {
      return res.status(500).json({ message: 'Failed to update user status' });
    }

    res.status(200).json({
      message: 'User unblocked successfully',
      user: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive
      }
    });
  } catch (error) {
    console.error('Unblock user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};