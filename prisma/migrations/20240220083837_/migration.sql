/*
  Warnings:

  - You are about to drop the column `shopeName` on the `shoppers` table. All the data in the column will be lost.
  - Added the required column `shopName` to the `shoppers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shoppers" DROP COLUMN "shopeName",
ADD COLUMN     "shopName" TEXT NOT NULL;
