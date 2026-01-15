"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = express_1.default.Router();
router.post('/register', validation_middleware_1.validateRegistration, AuthController_1.register);
router.post('/login', validation_middleware_1.validateLogin, AuthController_1.login);
exports.default = router;
