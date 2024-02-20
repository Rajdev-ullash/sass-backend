/*
  Warnings:

  - You are about to drop the column `productId` on the `ratings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_productId_fkey";

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "productId";
