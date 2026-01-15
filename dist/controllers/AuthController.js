"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const UserService_1 = require("../services/UserService");
const auth_utils_1 = require("../utils/auth.utils");
const userService = new UserService_1.UserService();
const register = async (req, res) => {
    try {
        const { fullName, birthDate, email, password } = req.body;
        // Check if user already exists
        const existingUser = await userService.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // Create new user
        const newUser = await userService.createUser({
            fullName,
            birthDate: new Date(birthDate),
            email,
            password
        });
        // Generate JWT token
        const token = (0, auth_utils_1.generateToken)({
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role
        });
        // Return success response with token
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await userService.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Check if user is active
        if (!user.isActive) {
            return res.status(400).json({ message: 'Account is deactivated' });
        }
        // Compare passwords
        const isValidPassword = await userService.comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = (0, auth_utils_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role
        });
        // Return success response with token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
