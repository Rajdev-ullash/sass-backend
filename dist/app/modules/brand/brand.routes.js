'use strict';
// Define your routes here
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.brandRoutes = void 0;
const express_1 = __importDefault(require('express'));
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const brand_controller_1 = require('./brand.controller');
const brand_validations_1 = require('./brand.validations');
const router = express_1.default.Router();
router.get('/', brand_controller_1.BrandController.getAllFromDB);
router.get('/:id', brand_controller_1.BrandController.getByIdFromDB);
router.post(
  '/',
  (0, validateRequest_1.default)(brand_validations_1.BrandValidation.create),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  brand_controller_1.BrandController.insertIntoDB
);
/// I intend to explore the update course functionalities in the upcoming module.
router.patch(
  '/:id',
  (0, validateRequest_1.default)(brand_validations_1.BrandValidation.update),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  brand_controller_1.BrandController.updateOneInDB
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  brand_controller_1.BrandController.deleteByIdFromDB
);
exports.brandRoutes = router;
