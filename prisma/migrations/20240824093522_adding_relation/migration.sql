/*
  Warnings:

  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Todo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ToDoStatus" AS ENUM ('DONE', 'ACTIVE');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "userEmail" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "ToDoStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Password",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TodoStatus";

-- CreateIndex
CREATE INDEX "Todo_userEmail_idx" ON "Todo"("userEmail");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
