'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.productRelationalFieldsMapper =
  exports.productRelationalFields =
  exports.productSearchableFields =
  exports.productFilterableFields =
    void 0;
// Define your constants here
exports.productFilterableFields = [
  'searchTerm',
  'id',
  'title',
  'stock',
  'price',
  'minPrice',
  'maxPrice',
  'categoryId',
];
exports.productSearchableFields = ['title', 'id'];
exports.productRelationalFields = ['categoryId', 'minPrice', 'maxPrice'];
exports.productRelationalFieldsMapper = {
  categoryId: 'category',
};
