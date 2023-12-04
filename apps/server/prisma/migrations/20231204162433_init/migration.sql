/*
  Warnings:

  - You are about to drop the column `batteryCap` on the `Euc` table. All the data in the column will be lost.
  - You are about to drop the column `carryingHandle` on the `Euc` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedRange` on the `Euc` table. All the data in the column will be lost.
  - You are about to drop the column `trolleyHandle` on the `Euc` table. All the data in the column will be lost.
  - You are about to drop the column `weightLimit` on the `Euc` table. All the data in the column will be lost.
  - Added the required column `range` to the `Euc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Euc" DROP COLUMN "batteryCap",
DROP COLUMN "carryingHandle",
DROP COLUMN "estimatedRange",
DROP COLUMN "trolleyHandle",
DROP COLUMN "weightLimit",
ADD COLUMN     "range" INTEGER NOT NULL;
