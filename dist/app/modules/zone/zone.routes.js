'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.zoneRoutes = void 0;
// Define your routes here
const express_1 = __importDefault(require('express'));
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const zone_controller_1 = require('./zone.controller');
const zone_validations_1 = require('./zone.validations');
const router = express_1.default.Router();
router.get('/', zone_controller_1.ZoneController.getAllFromDB);
router.get('/:id', zone_controller_1.ZoneController.getByIdFromDB);
router.post(
  '/',
  (0, validateRequest_1.default)(zone_validations_1.ZoneValidation.create),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  zone_controller_1.ZoneController.insertIntoDB
);
/// I intend to explore the update course functionalities in the upcoming module.
router.patch(
  '/:id',
  (0, validateRequest_1.default)(zone_validations_1.ZoneValidation.update),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  zone_controller_1.ZoneController.updateOneInDB
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  zone_controller_1.ZoneController.deleteByIdFromDB
);
exports.zoneRoutes = router;
