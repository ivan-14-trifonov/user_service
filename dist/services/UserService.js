"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
const database_1 = require("../config/database");
const password_utils_1 = require("../utils/password.utils");
const bcrypt = __importStar(require("bcrypt"));
class UserService {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
    }
    async createUser(userData) {
        // Hash the password before saving
        const hashedPassword = await (0, password_utils_1.hashPassword)(userData.password);
        const user = new User_1.User();
        user.fullName = userData.fullName;
        user.birthDate = userData.birthDate;
        user.email = userData.email;
        user.password = hashedPassword;
        user.role = User_1.UserRole.USER; // New users start as regular users
        user.isActive = true;
        return await this.userRepository.save(user);
    }
    async findByEmail(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async findById(id) {
        return await this.userRepository.findOne({ where: { id } });
    }
    async findAll() {
        return await this.userRepository.find({
            select: ['id', 'fullName', 'email', 'role', 'isActive', 'birthDate']
        });
    }
    async updateIsActive(id, isActive) {
        const user = await this.findById(id);
        if (!user) {
            return null;
        }
        user.isActive = isActive;
        return await this.userRepository.save(user);
    }
    async comparePassword(inputPassword, hashedPassword) {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }
}
exports.UserService = UserService;
