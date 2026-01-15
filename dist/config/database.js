"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const dbType = process.env.DB_TYPE || 'postgres'; // Default to postgres
exports.AppDataSource = new typeorm_1.DataSource({
    type: dbType === 'sqlite' ? 'sqlite' : 'postgres',
    host: dbType === 'sqlite' ? undefined : (process.env.DB_HOST || 'localhost'),
    port: dbType === 'sqlite' ? undefined : parseInt(process.env.DB_PORT || '5432'),
    username: dbType === 'sqlite' ? undefined : (process.env.DB_USERNAME || 'postgres'),
    password: dbType === 'sqlite' ? undefined : (process.env.DB_PASSWORD || 'postgres'),
    database: dbType === 'sqlite' ? './database.sqlite' : (process.env.DB_NAME || 'user_management_db'),
    synchronize: true, // Only for development, should be false in production
    logging: false,
    entities: [User_1.User],
    migrations: [],
    subscribers: [],
});
