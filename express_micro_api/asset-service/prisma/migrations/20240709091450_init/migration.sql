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

-- CreateTable
CREATE TABLE `asset_picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(2083) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `_AssetToAssetCategory` ADD CONSTRAINT `_AssetToAssetCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetCategory` ADD CONSTRAINT `_AssetToAssetCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `asset_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetPicture` ADD CONSTRAINT `_AssetToAssetPicture_A_fkey` FOREIGN KEY (`A`) REFERENCES `asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetPicture` ADD CONSTRAINT `_AssetToAssetPicture_B_fkey` FOREIGN KEY (`B`) REFERENCES `asset_picture`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
