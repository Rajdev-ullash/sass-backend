-- CreateEnum
CREATE TYPE "EmployeeTypes" AS ENUM ('GENERAL', 'DP', 'OTHERS');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zoneId" TEXT,
    "nidNumber" TEXT NOT NULL,
    "nidImage" JSONB[],
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "jobEndingDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "zones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
