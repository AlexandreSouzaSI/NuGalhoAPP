/*
  Warnings:

  - Added the required column `user_id` to the `enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enterprise" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "user_info" (
    "id" TEXT NOT NULL,
    "admissao" TIMESTAMP(3) NOT NULL,
    "demissao" TIMESTAMP(3) NOT NULL,
    "cargo" TEXT NOT NULL,
    "salario" DECIMAL(65,30) NOT NULL,
    "cpf" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "pix" TEXT NOT NULL,
    "contratado" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "enterprise" ADD CONSTRAINT "enterprise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
