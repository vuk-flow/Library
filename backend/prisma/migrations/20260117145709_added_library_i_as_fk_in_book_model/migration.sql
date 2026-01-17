/*
  Warnings:

  - Added the required column `library_id` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book" ADD COLUMN     "library_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
