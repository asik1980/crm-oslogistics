-- AlterTable
ALTER TABLE `User` ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('ADMIN', 'HANDLOWIEC') NOT NULL DEFAULT 'HANDLOWIEC';
