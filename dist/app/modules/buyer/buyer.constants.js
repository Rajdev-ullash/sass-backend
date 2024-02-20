'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.buyerRelationalFieldsMapper =
  exports.buyerRelationalFields =
  exports.buyerSearchableFields =
  exports.buyerFilterableFields =
    void 0;
// Define your constants here
// Define your constants here
exports.buyerFilterableFields = ['searchTerm', 'id', 'zoneId'];
exports.buyerSearchableFields = ['mobileNumber', 'username', 'email'];
exports.buyerRelationalFields = ['zoneId'];
exports.buyerRelationalFieldsMapper = {
  zoneId: 'zone',
};
