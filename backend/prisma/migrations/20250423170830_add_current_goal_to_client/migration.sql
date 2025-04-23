-- AlterTable
ALTER TABLE `Client` ADD COLUMN `currentGoalId` INTEGER NULL,
    MODIFY `daysBetweenTasks` INTEGER NOT NULL DEFAULT 1;
