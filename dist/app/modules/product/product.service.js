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
exports.ProductService = void 0;
const slugify_1 = __importDefault(require('slugify'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const product_constants_1 = require('./product.constants');
const product_utils_1 = require('./product.utils');
const insertIntoDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { title } = data;
    // console.log(data.title);
    const baseSlug = (0, slugify_1.default)(title, { lower: true });
    // Check if the base slug already exists in the database
    let existingProduct = yield prisma_1.default.product.findFirst({
      where: {
        slug: {
          startsWith: baseSlug,
        },
      },
    });
    // If there is an existing product, append a count to the base slug
    let slugCount = 1;
    let uniqueSlug = baseSlug;
    while (existingProduct) {
      slugCount += 1;
      uniqueSlug = `${baseSlug}-${slugCount}`;
      existingProduct = yield prisma_1.default.product.findFirst({
        where: {
          slug: {
            startsWith: uniqueSlug,
          },
        },
      });
    }
    // Set the unique slug in the data object
    data.slug = uniqueSlug;
    const productImages = yield (0, product_utils_1.uploadToCloudinary)(
      data.productImages
    );
    const result = yield prisma_1.default.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: Number(data.price),
        categoryId: data.categoryId,
        stock: Number(data.stock),
        unit: data.unit,
        sell: Number(data.sell),
        productImages: productImages.map(url => ({ url })),
      },
    });
    if (!result) {
      yield (0, product_utils_1.deleteCloudinaryFiles)(data.productImages);
    }
    return result;
  });
const getAllFromDB = (filters, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } =
      paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, minPrice, maxPrice } = filters,
      filterData = __rest(filters, ['searchTerm', 'minPrice', 'maxPrice']);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        OR: product_constants_1.productSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
    if (minPrice !== undefined) {
      andConditions.push({
        price: { gte: Number(minPrice) },
      });
    }
    if (maxPrice !== undefined) {
      andConditions.push({
        price: { lte: Number(maxPrice) },
      });
    }
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map(key => {
          if (product_constants_1.productRelationalFields.includes(key)) {
            return {
              [product_constants_1.productRelationalFieldsMapper[key]]: {
                id: filterData[key],
              },
            };
          } else {
            return {
              [key]: {
                equals: filterData[key],
              },
            };
          }
        }),
      });
    }
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.product.findMany({
      include: {
        category: true,
      },
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
    const total = yield prisma_1.default.product.count({
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
    const result = yield prisma_1.default.product.findUnique({
      where: {
        slug: id,
      },
      include: {
        category: true,
      },
    });
    return result;
  });
const updateOneInDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.update({
      where: {
        id,
      },
      data: payload,
      include: {
        category: true,
      },
    });
    return result;
  });
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.delete({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    return result;
  });
exports.ProductService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
