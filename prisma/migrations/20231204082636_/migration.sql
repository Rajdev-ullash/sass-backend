/*
  Warnings:

  - The primary key for the `zones` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "zones" DROP CONSTRAINT "zones_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "zones_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "zones_id_seq";
