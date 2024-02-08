/*
  Warnings:

  - You are about to drop the column `user_id` on the `enterprise` table. All the data in the column will be lost.
  - Added the required column `enterpriseId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "enterprise" DROP CONSTRAINT "enterprise_user_id_fkey";

-- AlterTable
ALTER TABLE "enterprise" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "enterpriseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
