// Define your routes here
import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
// import multer from 'multer';

import { ProductController } from './product.controller';
import {
  configureProductFileUpload,
  configureProductImagesUpload,
} from './product.utils';
// Configure Multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const router = express.Router();

router.get('/', ProductController.getAllFromDB);
router.get('/:id', ProductController.getByIdFromDB);

router.post(
  '/',
  // upload.array('productImages', 4),

  configureProductImagesUpload(),

  //   validateRequest(RoomValidation.create),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ProductController.insertIntoDB
);
router.post(
  '/upload-excel',
  configureProductFileUpload(),

  //   validateRequest(RoomValidation.create),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ProductController.insertExcelIntoDB
);

router.patch(
  '/:id',
  //   validateRequest(RoomValidation.update),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  // configureProductImagesUpload(),
  ProductController.updateOneInDB
);

router.delete(
  '/:id',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ProductController.deleteByIdFromDB
);

export const productRoutes = router;
