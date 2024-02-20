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
exports.deleteCloudinaryFiles =
  exports.uploadToCloudinary =
  exports.validateCloudinaryUploadFile =
  exports.cloudinaryUploadFileSchema =
  exports.configureProductImagesUpload =
    void 0;
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
const cloudinary_1 = require('cloudinary');
const config_1 = __importDefault(require('../../../config'));
const multer_1 = __importDefault(require('multer'));
const zod_1 = require('zod');
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, callback) => {
  const maxFiles = 4;
  if (req.files.length > maxFiles) {
    console.log(req.files.length);
    // throw new Error(`Max files ${maxFiles}`);
    callback(new Error(`Number of ${maxFiles} files exceeds the limit`), false);
    // Indicate that there's an error, but pass null as the first argument
    // callback(null, false);
  } else {
    // Continue with the default behavior
    callback(null, true);
  }
};
const configureProductImagesUpload = () =>
  (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      files: 4,
    },
  }).array('productImages', 4);
exports.configureProductImagesUpload = configureProductImagesUpload;
// Configure Cloudinary with your credentials
cloudinary_1.v2.config({
  cloud_name: config_1.default.cloudinary_cloud_name,
  api_key: config_1.default.cloudinary_api_key,
  api_secret: config_1.default.cloudinary_api_secret,
});
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
exports.cloudinaryUploadFileSchema = zod_1.z.object({
  fieldname: zod_1.z.string(),
  originalname: zod_1.z.string(),
  encoding: zod_1.z.string(),
  mimetype: zod_1.z.string(),
  buffer: zod_1.z.instanceof(Buffer),
  size: zod_1.z.number(),
});
const validateCloudinaryUploadFile = file => {
  // Validate the file against the schema
  exports.cloudinaryUploadFileSchema.parse(file);
  // Validate the file mimetype
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error(`Invalid file type. Only JPG, PNG, and WEBP are allowed.`);
  }
};
exports.validateCloudinaryUploadFile = validateCloudinaryUploadFile;
const uploadToCloudinary = files =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Validate each file before processing
    files.forEach(exports.validateCloudinaryUploadFile);
    const uploadPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const upload_stream = cloudinary_1.v2.uploader.upload_stream(
          { folder: 'product-images' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                public_id: result.public_id,
                secure_url: result.secure_url,
              });
            }
          }
        );
        upload_stream.end(file.buffer);
      });
    });
    try {
      const uploadedFiles = yield Promise.all(uploadPromises);
      return uploadedFiles;
    } catch (error) {
      throw new Error(
        `Failed to upload images to Cloudinary: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  });
exports.uploadToCloudinary = uploadToCloudinary;
const deleteCloudinaryFiles = files =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deletePromises = files.map(file => {
      if (!file.public_id) {
        // Skip files without public_id
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        // Use the Cloudinary API to delete the file by its public ID
        const publicId = file.public_id; // Allow undefined
        if (publicId === undefined) {
          // Skip files with undefined public_id
          return resolve();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cloudinary_1.v2.uploader.destroy(publicId, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    });
    try {
      yield Promise.all(deletePromises);
    } catch (error) {
      throw new Error(`Error deleting Cloudinary files ${error}`);
    }
  });
exports.deleteCloudinaryFiles = deleteCloudinaryFiles;
