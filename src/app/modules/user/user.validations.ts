// Define your validations here
import { z } from 'zod';
const isValidBangladeshiMobileNumber = (value: string): boolean => {
  // Check if the mobile number is 11 digits long and starts with either '+880' or '01'
  const mobileNumberRegex = /^(?:\+8801|01)\d{9}$/;
  return mobileNumberRegex.test(value);
};
const createBuyer = z.object({
  body: z.object({
    user: z.object({
      password: z.string({
        required_error: 'Password is required',
      }),
    }),
    buyer: z.object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
          message: 'Invalid email format',
        }),
      username: z.string({
        required_error: 'Username is required',
      }),
      zoneId: z.string({
        required_error: 'Zone ID is required',
      }),
      address: z.string({
        required_error: 'Address is required',
      }),
      mobileNumber: z
        .string({
          required_error: 'Mobile Number is required',
        })
        .refine(value => isValidBangladeshiMobileNumber(value.toString()), {
          message: 'Invalid Bangladeshi mobile number format',
        }),
    }),
  }),
});
const createMerchant = z.object({
  body: z.object({
    user: z.object({
      password: z.string({
        required_error: 'Password is required',
      }),
    }),
    merchant: z.object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
          message: 'Invalid email format',
        }),
      username: z.string({
        required_error: 'Username is required',
      }),
      zoneId: z.string({
        required_error: 'Zone ID is required',
      }),
      address: z.string({
        required_error: 'Address is required',
      }),
      mobileNumber: z
        .string({
          required_error: 'Mobile Number is required',
        })
        .refine(value => isValidBangladeshiMobileNumber(value.toString()), {
          message: 'Invalid Bangladeshi mobile number format',
        }),
    }),
  }),
});
const createAdmin = z.object({
  body: z.object({
    user: z.object({
      password: z.string({
        required_error: 'Password is required',
      }),
    }),
    admin: z.object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
          message: 'Invalid email format',
        }),
      username: z.string({
        required_error: 'Username is required',
      }),
      address: z.string({
        required_error: 'Address is required',
      }),
      mobileNumber: z
        .string({
          required_error: 'Mobile Number is required',
        })
        .refine(value => isValidBangladeshiMobileNumber(value.toString()), {
          message: 'Invalid Bangladeshi mobile number format',
        }),
    }),
  }),
});

export const UserValidation = {
  createBuyer,
  createMerchant,
  createAdmin,
};
