"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserId = exports.validateLogin = exports.validateRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
const validateRegistration = (req, res, next) => {
    const schema = joi_1.default.object({
        fullName: joi_1.default.string().max(100).required(),
        birthDate: joi_1.default.date().iso().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateRegistration = validateRegistration;
const validateLogin = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
exports.validateLogin = validateLogin;
const validateUserId = (req, res, next) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().integer().positive().required()
    });
    const { error } = schema.validate({ id: parseInt(req.params.id) });
    if (error) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    next();
};
exports.validateUserId = validateUserId;
