-- CreateEnum
CREATE TYPE "User_role" AS ENUM ('USER', 'ADMIN', 'MANAGER');

-- CreateEnum
CREATE TYPE "User_status" AS ENUM ('INACTIVE', 'ACTIVE', 'BLOCKED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailConfirmationToken" TEXT,
    "googleId" TEXT,
    "facebookId" TEXT,
    "hasVerifiedEmail" BOOLEAN,
    "password" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiry" DECIMAL(65,30),
    "billing" TEXT,
    "address" TEXT,
    "role" "User_role" NOT NULL DEFAULT E'USER',
    "status" "User_status" NOT NULL DEFAULT E'INACTIVE',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "catagoryImage" TEXT[],
    "seoTags" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "slug" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_catagory" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "subCatagoryImage" TEXT[],
    "seoTags" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catagoryid" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "productImage" TEXT[],
    "product_thumbnail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit" INTEGER NOT NULL,
    "discount" INTEGER,
    "salePrice" INTEGER NOT NULL,
    "variants" JSONB[],
    "seoTags" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cartid" TEXT,
    "subcatagoryId" TEXT NOT NULL,
    "productenquerieID" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Enquerie" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "unit" INTEGER NOT NULL,
    "orderFrequency" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.googleId_unique" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_unique" ON "CartItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category.slug_unique" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "sub_catagory.name_unique" ON "sub_catagory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sub_catagory.slug_unique" ON "sub_catagory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product.sku_unique" ON "Product"("sku");

-- AddForeignKey
ALTER TABLE "CartItem" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_catagory" ADD FOREIGN KEY ("catagoryid") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("subcatagoryId") REFERENCES "sub_catagory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("cartid") REFERENCES "CartItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("productenquerieID") REFERENCES "Product_Enquerie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
