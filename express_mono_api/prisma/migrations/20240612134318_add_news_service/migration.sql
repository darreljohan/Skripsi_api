-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `uploadDate` DATETIME(3) NOT NULL,
    `documentLink` VARCHAR(2083) NOT NULL,
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
CREATE TABLE `_NewsToNewsCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NewsToNewsCategory_AB_unique`(`A`, `B`),
    INDEX `_NewsToNewsCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_NewsToNewsCategory` ADD CONSTRAINT `_NewsToNewsCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `news`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NewsToNewsCategory` ADD CONSTRAINT `_NewsToNewsCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `news_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
