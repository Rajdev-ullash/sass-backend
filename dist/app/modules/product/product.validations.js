'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CategoryValidation = void 0;
// Define your validations here
// Define your validations here
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'Product name is required',
    }),
    description: zod_1.z.string({
      required_error: 'Description name is required',
    }),
    price: zod_1.z.number({
      required_error: 'Price is required',
    }),
    categoryId: zod_1.z.string({
      required_error: 'Category ID is required',
    }),
    stock: zod_1.z.number({
      required_error: 'Stock is required',
    }),
    unit: zod_1.z.string({
      required_error: 'Unit is required',
    }),
    sell: zod_1.z.number().default(0),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().optional(),
  }),
});
exports.CategoryValidation = {
  create,
  update,
};
