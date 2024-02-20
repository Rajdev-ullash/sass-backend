'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthValidation = void 0;
// Define your validations here
const zod_1 = require('zod');
const loginZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    usernameOrEmail: zod_1.z.string({
      required_error: 'Username or Email is required',
    }),
    password: zod_1.z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = zod_1.z.object({
  cookies: zod_1.z.object({
    refreshToken: zod_1.z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});
exports.AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};
