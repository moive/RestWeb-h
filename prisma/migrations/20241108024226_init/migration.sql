/*
  Warnings:

  - You are about to drop the column `completedAte` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "completedAte",
ADD COLUMN     "completedAt" TIMESTAMP;
