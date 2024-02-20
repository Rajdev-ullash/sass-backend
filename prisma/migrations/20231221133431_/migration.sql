/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `stock` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `sell` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "stock" SET DATA TYPE INTEGER,
ALTER COLUMN "sell" SET DEFAULT 0,
ALTER COLUMN "sell" SET DATA TYPE INTEGER;
