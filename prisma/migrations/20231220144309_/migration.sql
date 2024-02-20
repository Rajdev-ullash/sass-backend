/*
  Warnings:

  - You are about to drop the `productimages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productimages" DROP CONSTRAINT "productimages_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "productImages" JSONB[];

-- DropTable
DROP TABLE "productimages";
