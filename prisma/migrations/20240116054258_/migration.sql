-- AlterTable
ALTER TABLE "products" ADD COLUMN     "afterDiscountPrice" INTEGER,
ADD COLUMN     "discount" INTEGER,
ADD COLUMN     "productTags" JSONB[];
