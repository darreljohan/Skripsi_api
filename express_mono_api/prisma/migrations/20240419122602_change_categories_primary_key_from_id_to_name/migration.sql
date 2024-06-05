/*
  Warnings:

  - The primary key for the `asset_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `asset_categories` table. All the data in the column will be lost.
  - The primary key for the `asset_on_category` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `asset_on_category` DROP FOREIGN KEY `asset_on_category_categoryId_fkey`;

-- AlterTable
ALTER TABLE `asset_categories` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `asset_on_category` DROP PRIMARY KEY,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`assetId`, `categoryId`);

-- AddForeignKey
ALTER TABLE `asset_on_category` ADD CONSTRAINT `asset_on_category_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `asset_categories`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
