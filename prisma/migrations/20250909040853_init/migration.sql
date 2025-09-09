/*
  Warnings:

  - You are about to drop the column `note` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `notes` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Goal" DROP COLUMN "note",
ADD COLUMN     "notes" TEXT NOT NULL;
