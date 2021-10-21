/*
  Warnings:

  - You are about to drop the `enquiredProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_enquiredProductId_fkey";

-- DropForeignKey
ALTER TABLE "enquiredProducts" DROP CONSTRAINT "enquiredProducts_product_EnquerieId_fkey";

-- DropTable
DROP TABLE "enquiredProducts";

-- CreateTable
CREATE TABLE "enquiredProduct" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER,
    "product_EnquerieId" TEXT,

    CONSTRAINT "enquiredProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_enquiredProductId_fkey" FOREIGN KEY ("enquiredProductId") REFERENCES "enquiredProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enquiredProduct" ADD CONSTRAINT "enquiredProduct_product_EnquerieId_fkey" FOREIGN KEY ("product_EnquerieId") REFERENCES "Product_Enquerie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
