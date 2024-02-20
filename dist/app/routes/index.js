'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const auth_routes_1 = require('../modules/auth/auth.routes');
const brand_routes_1 = require('../modules/brand/brand.routes');
const category_routes_1 = require('../modules/category/category.routes');
const product_routes_1 = require('../modules/product/product.routes');
const user_routes_1 = require('../modules/user/user.routes');
const zone_routes_1 = require('../modules/zone/zone.routes');
const router = express_1.default.Router();
const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    route: user_routes_1.UserRoutes,
  },
  {
    path: '/auth',
    route: auth_routes_1.AuthRoutes,
  },
  {
    path: '/zones',
    route: zone_routes_1.zoneRoutes,
  },
  {
    path: '/categories',
    route: category_routes_1.categoryRoutes,
  },
  {
    path: '/brands',
    route: brand_routes_1.brandRoutes,
  },
  {
    path: '/products',
    route: product_routes_1.productRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
