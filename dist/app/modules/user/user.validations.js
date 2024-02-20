'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
// Define your validations here
const zod_1 = require('zod');
const isValidBangladeshiMobileNumber = value => {
  // Check if the mobile number is 11 digits long and starts with either '+880' or '01'
  const mobileNumberRegex = /^(?:\+8801|01)\d{9}$/;
  return mobileNumberRegex.test(value);
};
const createBuyer = zod_1.z.object({
  body: zod_1.z.object({
    user: zod_1.z.object({
      password: zod_1.z.string({
        required_error: 'Password is required',
      }),
    }),
    buyer: zod_1.z.object({
      email: zod_1.z
        .string({
          required_error: 'Email is required',
        })
        .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
          message: 'Invalid email format',
        }),
      username: zod_1.z.string({
        required_error: 'Username is required',
      }),
      zoneId: zod_1.z.string({
        required_error: 'Zone ID is required',
      }),
      address: zod_1.z.string({
        required_error: 'Address is required',
      }),
      mobileNumber: zod_1.z
        .string({
          required_error: 'Mobile Number is required',
        })
        .refine(value => isValidBangladeshiMobileNumber(value.toString()), {
          message: 'Invalid Bangladeshi mobile number format',
        }),
    }),
  }),
});
exports.UserValidation = {
  createBuyer,
};
