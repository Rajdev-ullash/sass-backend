'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
// Your service code here
const createBuyer = (buyer, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // set role
    user.role = 'buyer';
    const isEmailExist = yield prisma_1.default.buyer.findFirst({
      where: {
        email: buyer.email,
      },
    });
    if (isEmailExist) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'This email already exists'
      );
    }
    const isUserNameExist = yield prisma_1.default.buyer.findFirst({
      where: {
        username: buyer.username,
      },
    });
    if (isUserNameExist) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'This username already exists'
      );
    }
    const hashedPassword = yield bcrypt_1.default.hash(
      user.password,
      Number(config_1.default.bycrypt_salt_rounds)
    );
    const data = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        const buyers = yield transactionClient.buyer.create({
          data: {
            email: buyer.email,
            username: buyer.username,
            zoneId: buyer.zoneId,
            address: buyer.address,
            mobileNumber: buyer.mobileNumber,
          },
        });
        const createNewUser = yield transactionClient.user.create({
          data: {
            role: user.role,
            password: hashedPassword,
            buyerId: buyers.id,
          },
          include: {
            buyer: true,
          },
        });
        if (!createNewUser) {
          throw new ApiError_1.default(
            http_status_1.default.BAD_REQUEST,
            'Failed to create user'
          );
        }
        return createNewUser;
      })
    );
    return data;
  });
exports.UserService = {
  createBuyer,
};
