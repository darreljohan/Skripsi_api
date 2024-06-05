-- AlterTable
ALTER TABLE `assets` MODIFY `date_owned` DATETIME(3) NULL,
    MODIFY `price_owned` INTEGER NULL,
    MODIFY `location` VARCHAR(500) NULL;
