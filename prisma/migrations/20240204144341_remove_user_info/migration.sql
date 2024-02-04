/*
  Warnings:

  - You are about to drop the `user_info` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `admissao` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargo` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contratado` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `demissao` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nascimento` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pix` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salario` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_info" DROP CONSTRAINT "user_info_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "admissao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cargo" TEXT NOT NULL,
ADD COLUMN     "contratado" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "demissao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pix" TEXT NOT NULL,
ADD COLUMN     "salario" DECIMAL(65,30) NOT NULL;

-- DropTable
DROP TABLE "user_info";
