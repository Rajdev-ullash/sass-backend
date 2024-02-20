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
exports.ZoneController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const zone_constants_1 = require('./zone.constants');
const zone_service_1 = require('./zone.service');
const insertIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield zone_service_1.ZoneService.insertIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Zone created successfully',
      data: result,
    });
  })
);
const getAllFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      zone_constants_1.zoneFilterableFields
    );
    const options = (0, pick_1.default)(req.query, [
      'limit',
      'page',
      'sortBy',
      'sortOrder',
    ]);
    console.log(filters);
    const result = yield zone_service_1.ZoneService.getAllFromDB(
      filters,
      options
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Zones fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield zone_service_1.ZoneService.getByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Zone fetched successfully',
      data: result,
    });
  })
);
const updateOneInDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield zone_service_1.ZoneService.updateOneInDB(id, req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Zone updated successfully',
      data: result,
    });
  })
);
const deleteByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield zone_service_1.ZoneService.deleteByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Zone deleted successfully',
      data: result,
    });
  })
);
exports.ZoneController = {
  insertIntoDB,
  getAllFromDB,
  updateOneInDB,
  getByIdFromDB,
  deleteByIdFromDB,
};
