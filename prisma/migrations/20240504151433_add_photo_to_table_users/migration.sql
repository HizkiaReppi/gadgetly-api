/*
  Warnings:

  - You are about to alter the column `last_login` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `photo` VARCHAR(255) NULL,
    MODIFY `last_login` TIMESTAMP NULL;
