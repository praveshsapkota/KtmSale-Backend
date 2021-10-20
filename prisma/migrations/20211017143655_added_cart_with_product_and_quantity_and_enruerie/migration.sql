/*
  Warnings:

  - You are about to drop the column `productenquerieID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cartid]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enquiredProductId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_cartid_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productenquerieID_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productenquerieID",
ADD COLUMN     "enquiredProductId" TEXT;

-- AlterTable
ALTER TABLE "Product_Enquerie" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "company_name" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "unit" DROP NOT NULL,
ALTER COLUMN "orderFrequency" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "CartItem";

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartIteam" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cartId" TEXT,

    CONSTRAINT "CartIteam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enquiredProducts" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER,
    "product_EnquerieId" TEXT,

    CONSTRAINT "enquiredProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_cartid_key" ON "Product"("cartid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_enquiredProductId_key" ON "Product"("enquiredProductId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_cartid_fkey" FOREIGN KEY ("cartid") REFERENCES "CartIteam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_enquiredProductId_fkey" FOREIGN KEY ("enquiredProductId") REFERENCES "enquiredProducts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartIteam" ADD CONSTRAINT "CartIteam_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enquiredProducts" ADD CONSTRAINT "enquiredProducts_product_EnquerieId_fkey" FOREIGN KEY ("product_EnquerieId") REFERENCES "Product_Enquerie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
