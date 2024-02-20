/*
  Warnings:

  - A unique constraint covering the columns `[shopeId]` on the table `shoppers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shoppers_shopeId_key" ON "shoppers"("shopeId");
