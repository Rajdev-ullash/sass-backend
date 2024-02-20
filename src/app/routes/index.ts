import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { brandRoutes } from '../modules/brand/brand.routes';
import { categoryRoutes } from '../modules/category/category.routes';
// import { paymentRoutes } from '../modules/payment/payment.routes';
import { EmployeeRoutes } from '../modules/employee/employee.routes';
import { orderRoutes } from '../modules/order/order.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';
import { productRoutes } from '../modules/product/product.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { zoneRoutes } from '../modules/zone/zone.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/zones',
    route: zoneRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/brands',
    route: brandRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/employees',
    route: EmployeeRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
