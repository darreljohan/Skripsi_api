-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NOT NULL,
    `description` VARCHAR(1000) NULL,
    `uploadDate` DATETIME(3) NULL,
    `documentLink` VARCHAR(2083) NULL,
    `author` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,

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

-- CreateTable
CREATE TABLE `_NewsToNewsCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NewsToNewsCategory_AB_unique`(`A`, `B`),
    INDEX `_NewsToNewsCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AssetToAssetCategory` ADD CONSTRAINT `_AssetToAssetCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetCategory` ADD CONSTRAINT `_AssetToAssetCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `asset_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetPicture` ADD CONSTRAINT `_AssetToAssetPicture_A_fkey` FOREIGN KEY (`A`) REFERENCES `asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssetToAssetPicture` ADD CONSTRAINT `_AssetToAssetPicture_B_fkey` FOREIGN KEY (`B`) REFERENCES `asset_picture`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NewsToNewsCategory` ADD CONSTRAINT `_NewsToNewsCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `news`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NewsToNewsCategory` ADD CONSTRAINT `_NewsToNewsCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `news_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
