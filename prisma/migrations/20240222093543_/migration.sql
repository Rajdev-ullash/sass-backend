/*
  Warnings:

  - The `deliveryCompletionTime` column on the `assign_order_to_dps` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "assign_order_to_dps" DROP COLUMN "deliveryCompletionTime",
ADD COLUMN     "deliveryCompletionTime" INTEGER;
