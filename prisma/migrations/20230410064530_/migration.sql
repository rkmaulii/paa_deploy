/*
  Warnings:

  - You are about to drop the column `category` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - Added the required column `place` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "category",
DROP COLUMN "price",
ADD COLUMN     "place" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
