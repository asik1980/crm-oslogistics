/*
  Warnings:

  - A unique constraint covering the columns `[nip]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Client_nip_key` ON `Client`(`nip`);
