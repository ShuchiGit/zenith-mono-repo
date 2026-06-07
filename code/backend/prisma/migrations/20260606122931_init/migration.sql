-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(300) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `sector` VARCHAR(100) NULL,
    `city` VARCHAR(100) NOT NULL,
    `bhkTypes` VARCHAR(100) NOT NULL,
    `priceMin` DECIMAL(15, 2) NOT NULL,
    `priceMax` DECIMAL(15, 2) NOT NULL,
    `status` ENUM('UNDER_CONSTRUCTION', 'READY_TO_MOVE', 'NEW_LAUNCH') NOT NULL,
    `description` LONGTEXT NULL,
    `highlights` TEXT NULL,
    `amenities` TEXT NULL,
    `images` TEXT NULL,
    `coverImage` VARCHAR(500) NULL,
    `reraNumber` VARCHAR(100) NULL,
    `builderName` VARCHAR(255) NULL,
    `totalUnits` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `metaTitle` VARCHAR(255) NULL,
    `metaDesc` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Project_slug_key`(`slug`),
    INDEX `Project_status_idx`(`status`),
    INDEX `Project_city_idx`(`city`),
    INDEX `Project_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(300) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `sector` VARCHAR(100) NULL,
    `city` VARCHAR(100) NOT NULL,
    `bhkType` VARCHAR(50) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `type` ENUM('FLAT', 'SHOP', 'PLOT', 'STUDIO_APARTMENT') NOT NULL,
    `status` ENUM('UNDER_CONSTRUCTION', 'READY_TO_MOVE', 'NEW_LAUNCH') NOT NULL,
    `description` LONGTEXT NULL,
    `highlights` TEXT NULL,
    `images` TEXT NULL,
    `coverImage` VARCHAR(500) NULL,
    `carpetArea` DECIMAL(10, 2) NULL,
    `superArea` DECIMAL(10, 2) NULL,
    `floor` INTEGER NULL,
    `totalFloors` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `metaTitle` VARCHAR(255) NULL,
    `metaDesc` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Property_slug_key`(`slug`),
    INDEX `Property_type_idx`(`type`),
    INDEX `Property_status_idx`(`status`),
    INDEX `Property_city_idx`(`city`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enquiry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NULL,
    `message` TEXT NULL,
    `source` VARCHAR(50) NOT NULL,
    `status` ENUM('NEW', 'CONTACTED', 'CLOSED') NOT NULL DEFAULT 'NEW',
    `notes` TEXT NULL,
    `projectId` INTEGER NULL,
    `propertyId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Enquiry_status_idx`(`status`),
    INDEX `Enquiry_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `youtubeUrl` VARCHAR(500) NOT NULL,
    `youtubeId` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `views` VARCHAR(20) NULL,
    `duration` VARCHAR(10) NULL,
    `publishedAt` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(100) NOT NULL,
    `value` TEXT NOT NULL,
    `label` VARCHAR(255) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Setting_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLoginAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeoPage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(500) NOT NULL,
    `metaTitle` VARCHAR(255) NULL,
    `metaDesc` VARCHAR(500) NULL,
    `h1` VARCHAR(255) NULL,
    `content` LONGTEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SeoPage_path_key`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enquiry` ADD CONSTRAINT `Enquiry_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enquiry` ADD CONSTRAINT `Enquiry_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
