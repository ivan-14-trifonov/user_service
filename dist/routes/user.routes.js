"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Get user by ID - accessible by admin or user accessing their own data
router.get('/:id', auth_middleware_1.authenticate, auth_middleware_1.authorizeSelfOrAdmin, UserController_1.getUserById);
// Get all users - admin only
router.get('/', auth_middleware_1.authenticate, auth_middleware_1.authorizeAdmin, UserController_1.getAllUsers);
// Block/unblock user - accessible by admin or user blocking themselves
router.put('/:id/block', auth_middleware_1.authenticate, auth_middleware_1.authorizeSelfOrAdmin, UserController_1.blockUser);
router.put('/:id/unblock', auth_middleware_1.authenticate, auth_middleware_1.authorizeSelfOrAdmin, UserController_1.unblockUser);
exports.default = router;
