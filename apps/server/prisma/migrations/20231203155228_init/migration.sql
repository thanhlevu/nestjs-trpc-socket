/*
  Warnings:

  - The primary key for the `Euc` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createAt` on the `Euc` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Euc` table. All the data in the column will be lost.
  - Added the required column `batteryCap` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bluetooth` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carryingHandle` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedRange` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxSpeed` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suspension` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tire` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trolleyHandle` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Euc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightLimit` to the `Euc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Euc" DROP CONSTRAINT "Euc_pkey",
DROP COLUMN "createAt",
DROP COLUMN "name",
ADD COLUMN     "batteryCap" INTEGER NOT NULL,
ADD COLUMN     "bluetooth" BOOLEAN NOT NULL,
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "carryingHandle" BOOLEAN NOT NULL,
ADD COLUMN     "estimatedRange" INTEGER NOT NULL,
ADD COLUMN     "maxSpeed" INTEGER NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "suspension" BOOLEAN NOT NULL,
ADD COLUMN     "tire" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "trolleyHandle" BOOLEAN NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL,
ADD COLUMN     "weightLimit" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Euc_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Euc_id_seq";

-- CreateTable
CREATE TABLE "Retailer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "coupon" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "eucId" TEXT NOT NULL,

    CONSTRAINT "Retailer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Retailer_id_idx" ON "Retailer"("id");

-- CreateIndex
CREATE INDEX "Euc_id_idx" ON "Euc"("id");

-- AddForeignKey
ALTER TABLE "Retailer" ADD CONSTRAINT "Retailer_eucId_fkey" FOREIGN KEY ("eucId") REFERENCES "Euc"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
