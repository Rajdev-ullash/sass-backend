-- AlterTable
ALTER TABLE "users" ADD COLUMN     "buyerId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "buyers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
