-- AlterTable
ALTER TABLE `Client` ADD COLUMN `interestedFTL` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `interestedRAIL` BOOLEAN NOT NULL DEFAULT false;
