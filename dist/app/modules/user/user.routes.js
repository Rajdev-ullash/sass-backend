'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
// Define your routes here
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const user_controller_1 = require('./user.controller');
const user_validations_1 = require('./user.validations');
const router = express_1.default.Router();
router.post(
  '/create-buyer',
  (0, validateRequest_1.default)(user_validations_1.UserValidation.createBuyer),
  user_controller_1.UserController.createBuyer
);
exports.UserRoutes = router;
