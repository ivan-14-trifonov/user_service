import { AppDataSource } from './src/config/database';
import { UserService } from './src/services/UserService';
import { User, UserRole } from './src/models/User';

// Set environment variable to use SQLite for testing
process.env.DB_TYPE = 'sqlite';

async function testApp() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('Database connected successfully');
    
    const userService = new UserService();
    
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
      admin.role = UserRole.ADMIN;
      admin = await AppDataSource.getRepository(User).save(admin);
      console.log('Admin user created:', admin);
    } else {
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
    } else {
      console.log('Regular user already exists:', user);
    }
    
    // Verify users were created
    const allUsers = await userService.findAll();
    console.log('All users:', allUsers.map(u => ({ id: u.id, fullName: u.fullName, email: u.email, role: u.role })));
    
    await AppDataSource.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Test error:', error);
  }
}

testApp();