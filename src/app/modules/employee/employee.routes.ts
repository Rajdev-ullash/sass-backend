import express from 'express';
import { configureEmployeeImagesUpload } from '../product/product.utils';
import { EmployeeController } from './employee.controller';
const router = express.Router();

// Define your routes here
router.post(
  '/',
  // validateRequest(UserValidation.createAdmin),
  configureEmployeeImagesUpload(),
  EmployeeController.insertIntoDB
);
router.get(
  '/',
  // validateRequest(UserValidation.createAdmin),
  EmployeeController.getAllFromDB
);

export const EmployeeRoutes = router;
