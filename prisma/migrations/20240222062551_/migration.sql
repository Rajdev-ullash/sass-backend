/*
  Warnings:

  - Added the required column `zoneName` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'INPROGRESS';

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "zoneName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "assign_order_to_dps" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "remarks" "OrderStatus" NOT NULL,
    "deliveryTimeComitted" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "assign_order_to_dps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assign_order_to_dps" ADD CONSTRAINT "assign_order_to_dps_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assign_order_to_dps" ADD CONSTRAINT "assign_order_to_dps_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
