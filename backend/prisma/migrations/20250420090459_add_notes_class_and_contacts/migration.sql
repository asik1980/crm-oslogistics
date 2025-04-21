-- AlterTable
ALTER TABLE `Client` ADD COLUMN `clientClass` VARCHAR(191) NULL DEFAULT 'D',
    ADD COLUMN `notes` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `position` VARCHAR(191) NULL,
    ADD COLUMN `salutation` VARCHAR(191) NULL;
