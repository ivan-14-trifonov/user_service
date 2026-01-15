"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./src/config/database");
const UserService_1 = require("./src/services/UserService");
const User_1 = require("./src/models/User");
// Set environment variable to use SQLite for testing
process.env.DB_TYPE = 'sqlite';
async function testApp() {
    try {
        // Initialize database connection
        await database_1.AppDataSource.initialize();
        console.log('Database connected successfully');
        const userService = new UserService_1.UserService();
        // Create an admin user
        const adminUserData = {
            fullName: 'Admin User',
            birthDate: new Date('1980-01-01'),
            email: 'admin@example.com',
            password: 'admin123'
        };
        // Check if admin already exists
        let admin = await userService.findByEmail(adminUserData.email);
        if (!admin) {
            // First create as regular user, then update to admin
            admin = await userService.createUser(adminUserData);
            admin.role = User_1.UserRole.ADMIN;
            admin = await database_1.AppDataSource.getRepository(User_1.User).save(admin);
            console.log('Admin user created:', admin);
        }
        else {
            console.log('Admin user already exists:', admin);
        }
        // Create a regular user
        const userData = {
            fullName: 'Regular User',
            birthDate: new Date('1990-01-01'),
            email: 'user@example.com',
            password: 'user123'
        };
        let user = await userService.findByEmail(userData.email);
        if (!user) {
            user = await userService.createUser(userData);
            console.log('Regular user created:', user);
        }
        else {
            console.log('Regular user already exists:', user);
        }
        // Verify users were created
        const allUsers = await userService.findAll();
        console.log('All users:', allUsers.map(u => ({ id: u.id, fullName: u.fullName, email: u.email, role: u.role })));
        await database_1.AppDataSource.destroy();
        console.log('Database connection closed');
    }
    catch (error) {
        console.error('Test error:', error);
    }
}
testApp();
