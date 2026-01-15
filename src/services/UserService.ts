import { Repository } from 'typeorm';
import { User, UserRole } from '../models/User';
import { AppDataSource } from '../config/database';
import { hashPassword } from '../utils/password.utils';
import * as bcrypt from 'bcrypt';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: Omit<User, 'id' | 'role' | 'isActive'>): Promise<User> {
    // Hash the password before saving
    const hashedPassword = await hashPassword(userData.password);
    
    const user = new User();
    user.fullName = userData.fullName;
    user.birthDate = userData.birthDate;
    user.email = userData.email;
    user.password = hashedPassword;
    user.role = UserRole.USER; // New users start as regular users
    user.isActive = true;

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'fullName', 'email', 'role', 'isActive', 'birthDate']
    });
  }

  async updateIsActive(id: number, isActive: boolean): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }

    user.isActive = isActive;
    return await this.userRepository.save(user);
  }

  async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}