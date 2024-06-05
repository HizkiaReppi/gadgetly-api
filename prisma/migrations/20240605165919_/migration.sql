/*
  Warnings:

  - You are about to alter the column `last_login` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `slug` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `slug` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `last_login` TIMESTAMP NULL;
