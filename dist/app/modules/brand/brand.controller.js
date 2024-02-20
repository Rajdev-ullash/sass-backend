'use strict';
// Your controller code here
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
exports.BrandController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const brand_constants_1 = require('./brand.constants');
const brand_service_1 = require('./brand.service');
const insertIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield brand_service_1.BrandService.insertIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  })
);
const getAllFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      brand_constants_1.brandFilterableFields
    );
    const options = (0, pick_1.default)(req.query, [
      'limit',
      'page',
      'sortBy',
      'sortOrder',
    ]);
    console.log(filters);
    const result = yield brand_service_1.BrandService.getAllFromDB(
      filters,
      options
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Category fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield brand_service_1.BrandService.getByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Category fetched successfully',
      data: result,
    });
  })
);
const updateOneInDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield brand_service_1.BrandService.updateOneInDB(
      id,
      req.body
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Category updated successfully',
      data: result,
    });
  })
);
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield brand_service_1.BrandService.deleteByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Category deleted successfully',
      data: result,
    });
  })
);
exports.BrandController = {
  insertIntoDB,
  getAllFromDB,
  updateOneInDB,
  getByIdFromDB,
  deleteByIdFromDB,
};
