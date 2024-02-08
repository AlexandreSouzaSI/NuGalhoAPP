-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_enterpriseId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "enterpriseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
