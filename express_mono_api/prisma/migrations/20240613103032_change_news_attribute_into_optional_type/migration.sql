-- AlterTable
ALTER TABLE `news` MODIFY `description` VARCHAR(1000) NULL,
    MODIFY `uploadDate` DATETIME(3) NULL,
    MODIFY `documentLink` VARCHAR(2083) NULL;
