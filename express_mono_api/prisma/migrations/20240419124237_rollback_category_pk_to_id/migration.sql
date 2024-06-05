/*
  Warnings:

  - The primary key for the `asset_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `asset_categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - The primary key for the `asset_on_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `categoryId` on the `asset_on_category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `id` to the `asset_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `asset_on_category` DROP FOREIGN KEY `asset_on_category_categoryId_fkey`;

-- AlterTable
ALTER TABLE `asset_categories` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `name` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `asset_on_category` DROP PRIMARY KEY,
    MODIFY `categoryId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`assetId`, `categoryId`);

-- AddForeignKey
ALTER TABLE `asset_on_category` ADD CONSTRAINT `asset_on_category_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `asset_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
