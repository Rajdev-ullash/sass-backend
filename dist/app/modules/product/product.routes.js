'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.productRoutes = void 0;
// Define your routes here
const express_1 = __importDefault(require('express'));
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
// import multer from 'multer';
const product_controller_1 = require('./product.controller');
const product_utils_1 = require('./product.utils');
// Configure Multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const router = express_1.default.Router();
router.get('/', product_controller_1.ProductController.getAllFromDB);
router.get('/:id', product_controller_1.ProductController.getByIdFromDB);
router.post(
  '/',
  // upload.array('productImages', 4),
  (0, product_utils_1.configureProductImagesUpload)(),
  //   validateRequest(RoomValidation.create),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  product_controller_1.ProductController.insertIntoDB
);
router.patch(
  '/:id',
  //   validateRequest(RoomValidation.update),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  product_controller_1.ProductController.updateOneInDB
);
router.delete(
  '/:id',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  product_controller_1.ProductController.deleteByIdFromDB
);
exports.productRoutes = router;
