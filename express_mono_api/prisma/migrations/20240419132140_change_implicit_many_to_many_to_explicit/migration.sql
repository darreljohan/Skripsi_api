/*
  Warnings:

  - You are about to drop the column `authorId` on the `asset_picture` table. All the data in the column will be lost.
  - You are about to drop the `asset_on_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `asset_on_category` DROP FOREIGN KEY `asset_on_category_assetId_fkey`;

-- DropForeignKey
ALTER TABLE `asset_on_category` DROP FOREIGN KEY `asset_on_category_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `asset_picture` DROP FOREIGN KEY `asset_picture_authorId_fkey`;

-- AlterTable
ALTER TABLE `asset_picture` DROP COLUMN `authorId`;

-- DropTable
DROP TABLE `asset_on_category`;

-- CreateTable
CREATE TABLE `_AssetToAssetCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AssetToAssetCategory_AB_unique`(`A`, `B`),
    INDEX `_AssetToAssetCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AssetToAssetPicture` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AssetToAssetPicture_AB_unique`(`A`, `B`),
    INDEX `_AssetToAssetPicture_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AssetToAssetCategory` ADD CONSTRAINT `_AssetToAssetCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `assets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetCategory` ADD CONSTRAINT `_AssetToAssetCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `asset_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetPicture` ADD CONSTRAINT `_AssetToAssetPicture_A_fkey` FOREIGN KEY (`A`) REFERENCES `assets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetPicture` ADD CONSTRAINT `_AssetToAssetPicture_B_fkey` FOREIGN KEY (`B`) REFERENCES `asset_picture`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
