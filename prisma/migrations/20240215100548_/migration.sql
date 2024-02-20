/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `afterDiscountPrice` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `discount` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "afterDiscountPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "discount" SET DATA TYPE INTEGER;
