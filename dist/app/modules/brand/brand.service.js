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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BrandService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const brand_constants_1 = require('./brand.constants');
const insertIntoDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isAnyBrand = yield prisma_1.default.brand.findFirst({
      where: {
        title: data.title,
      },
    });
    if (isAnyBrand) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        `There is already an ${isAnyBrand.title} title.`
      );
    }
    const result = yield prisma_1.default.brand.create({
      data,
    });
    return result;
  });
const getAllFromDB = (filters, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } =
      paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters,
      filterData = __rest(filters, ['searchTerm']);
    console.log(filters);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        OR: brand_constants_1.brandSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map(key => {
          return {
            [key]: {
              equals: filterData[key],
            },
          };
        }),
      });
    }
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.brand.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
              createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.brand.count({
      where: whereConditions,
    });
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  });
const getByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.brand.findUnique({
      where: {
        id,
      },
    });
    return result;
  });
const updateOneInDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.brand.update({
      where: {
        id,
      },
      data: payload,
    });
    return result;
  });
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.brand.delete({
      where: {
        id,
      },
    });
    return result;
  });
exports.BrandService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
