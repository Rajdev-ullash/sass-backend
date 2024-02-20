'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.categoryRoutes = void 0;
// Define your routes here
const express_1 = __importDefault(require('express'));
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const category_controller_1 = require('./category.controller');
const category_validations_1 = require('./category.validations');
const router = express_1.default.Router();
router.get('/', category_controller_1.CategoryController.getAllFromDB);
router.get('/:id', category_controller_1.CategoryController.getByIdFromDB);
router.post(
  '/',
  (0, validateRequest_1.default)(
    category_validations_1.CategoryValidation.create
  ),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  category_controller_1.CategoryController.insertIntoDB
);
/// I intend to explore the update course functionalities in the upcoming module.
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    category_validations_1.CategoryValidation.update
  ),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  category_controller_1.CategoryController.updateOneInDB
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  category_controller_1.CategoryController.deleteByIdFromDB
);
exports.categoryRoutes = router;
