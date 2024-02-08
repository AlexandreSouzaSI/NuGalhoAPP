/*
  Warnings:

  - You are about to drop the column `enterpriseId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_enterpriseId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "enterpriseId",
ADD COLUMN     "enterprise" TEXT;
