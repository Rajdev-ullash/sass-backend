-- AlterTable
ALTER TABLE "users" ADD COLUMN     "shopperId" TEXT;

-- CreateTable
CREATE TABLE "shoppers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "picture" JSONB[],
    "shopeName" TEXT NOT NULL,
    "shopeId" TEXT NOT NULL,
    "tradeLicense" TEXT NOT NULL,
    "tradeLicensePicture" JSONB[],
    "ward" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shoppers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_shopperId_fkey" FOREIGN KEY ("shopperId") REFERENCES "shoppers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
