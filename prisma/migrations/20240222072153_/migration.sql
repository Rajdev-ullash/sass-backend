/*
  Warnings:

  - You are about to drop the column `deliveryTimeComitted` on the `assign_order_to_dps` table. All the data in the column will be lost.
  - Added the required column `deliveryTimeCommitted` to the `assign_order_to_dps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assign_order_to_dps" DROP COLUMN "deliveryTimeComitted",
ADD COLUMN     "deliveryTimeCommitted" INTEGER NOT NULL;
