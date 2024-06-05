/*
  Warnings:

  - You are about to drop the `asset_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_assettoassetcategory` DROP FOREIGN KEY `_AssetToAssetCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_assettoassetcategory` DROP FOREIGN KEY `_AssetToAssetCategory_B_fkey`;

-- DropForeignKey
ALTER TABLE `_assettoassetpicture` DROP FOREIGN KEY `_AssetToAssetPicture_A_fkey`;

-- DropTable
DROP TABLE `asset_categories`;

-- DropTable
DROP TABLE `assets`;

-- CreateTable
CREATE TABLE `asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `date_owned` DATETIME(3) NULL,
    `price_owned` INTEGER NULL,
    `location` VARCHAR(500) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(8000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AssetToAssetCategory` ADD CONSTRAINT `_AssetToAssetCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetCategory` ADD CONSTRAINT `_AssetToAssetCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `asset_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetPicture` ADD CONSTRAINT `_AssetToAssetPicture_A_fkey` FOREIGN KEY (`A`) REFERENCES `asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
