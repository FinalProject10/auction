-- Migration script to add new auction platform tables
-- Run this script to add all new tables for deposits, proxy bids, payments, approvals, pickups, and title transfers

-- Add new columns to items table
ALTER TABLE `final`.`items` 
ADD COLUMN `vin` VARCHAR(17) NULL COMMENT 'Vehicle Identification Number' AFTER `power`,
ADD COLUMN `titleType` ENUM('Clean', 'Salvage', 'Non-repairable', 'Rebuilt', 'Export-only') NULL AFTER `vin`,
ADD COLUMN `damageType` VARCHAR(255) NULL COMMENT 'Type of damage' AFTER `titleType`,
ADD COLUMN `lotNumber` VARCHAR(50) NULL COMMENT 'Auction lot number' AFTER `damageType`,
ADD COLUMN `inspectionReport` TEXT NULL COMMENT 'Inspection report details' AFTER `lotNumber`,
ADD COLUMN `openingBid` INT NULL COMMENT 'Opening bid amount' AFTER `inspectionReport`,
ADD COLUMN `auctionStatus` ENUM('scheduled', 'active', 'ended', 'pending_approval', 'sold', 'rejected') NULL DEFAULT 'scheduled' AFTER `openingBid`;

-- Add timestamps to bid table
ALTER TABLE `final`.`bid`
ADD COLUMN `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER `clients_id`,
ADD COLUMN `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `createdAt`;

-- Create deposits table
CREATE TABLE IF NOT EXISTS `final`.`deposits` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `clients_id` INT NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL COMMENT 'Deposit amount in currency',
  `status` ENUM('pending', 'active', 'refunded', 'forfeited') NOT NULL DEFAULT 'pending',
  `maxBiddingPower` DECIMAL(10, 2) NULL COMMENT 'Maximum bidding power (deposit × 10 multiplier)',
  `paymentMethod` VARCHAR(50) NULL COMMENT 'Payment method used (stripe, flouci, etc.)',
  `transactionId` VARCHAR(255) NULL COMMENT 'Payment gateway transaction ID',
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_deposits_clients_idx` (`clients_id` ASC) VISIBLE,
  CONSTRAINT `fk_deposits_clients`
    FOREIGN KEY (`clients_id`)
    REFERENCES `final`.`clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Create proxy_bids table
CREATE TABLE IF NOT EXISTS `final`.`proxy_bids` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `clients_id` INT NOT NULL,
  `items_id` INT NOT NULL,
  `maxAmount` DECIMAL(10, 2) NOT NULL COMMENT 'Maximum proxy bid amount',
  `currentBid` DECIMAL(10, 2) NULL COMMENT 'Current bid placed by proxy system',
  `isActive` TINYINT(1) NOT NULL DEFAULT 1,
  `incrementAmount` DECIMAL(10, 2) NULL COMMENT 'Minimum increment to use when auto-bidding',
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_proxy_bids_clients_idx` (`clients_id` ASC) VISIBLE,
  INDEX `fk_proxy_bids_items_idx` (`items_id` ASC) VISIBLE,
  CONSTRAINT `fk_proxy_bids_clients`
    FOREIGN KEY (`clients_id`)
    REFERENCES `final`.`clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proxy_bids_items`
    FOREIGN KEY (`items_id`)
    REFERENCES `final`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Create auction_payments table
CREATE TABLE IF NOT EXISTS `final`.`auction_payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bid_id` INT NOT NULL,
  `items_id` INT NOT NULL,
  `clients_id` INT NOT NULL,
  `vehiclePrice` DECIMAL(10, 2) NOT NULL COMMENT 'Winning bid amount',
  `auctionFee` DECIMAL(10, 2) NOT NULL DEFAULT 0 COMMENT 'Auction fee (percentage of winning bid)',
  `storageFee` DECIMAL(10, 2) NOT NULL DEFAULT 0 COMMENT 'Storage fees if pickup is late',
  `totalAmount` DECIMAL(10, 2) NOT NULL COMMENT 'Total amount to pay (vehiclePrice + auctionFee + storageFee)',
  `status` ENUM('pending', 'paid', 'refunded', 'failed') NOT NULL DEFAULT 'pending',
  `paidAt` DATETIME NULL,
  `paymentMethod` VARCHAR(50) NULL COMMENT 'Payment method (stripe, flouci, etc.)',
  `transactionId` VARCHAR(255) NULL COMMENT 'Payment gateway transaction ID',
  `invoiceNumber` VARCHAR(100) NULL COMMENT 'Invoice/receipt number',
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_auction_payments_bid_idx` (`bid_id` ASC) VISIBLE,
  INDEX `fk_auction_payments_items_idx` (`items_id` ASC) VISIBLE,
  INDEX `fk_auction_payments_clients_idx` (`clients_id` ASC) VISIBLE,
  CONSTRAINT `fk_auction_payments_bid`
    FOREIGN KEY (`bid_id`)
    REFERENCES `final`.`bid` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_auction_payments_items`
    FOREIGN KEY (`items_id`)
    REFERENCES `final`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_auction_payments_clients`
    FOREIGN KEY (`clients_id`)
    REFERENCES `final`.`clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Create seller_approvals table
CREATE TABLE IF NOT EXISTS `final`.`seller_approvals` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `items_id` INT NOT NULL,
  `bid_id` INT NOT NULL,
  `sellers_id` INT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected', 'counteroffer') NOT NULL DEFAULT 'pending',
  `sellerResponse` TEXT NULL COMMENT 'Seller response message or notes',
  `counterofferAmount` DECIMAL(10, 2) NULL COMMENT 'Counteroffer amount if status is counteroffer',
  `deadline` DATETIME NULL COMMENT 'Deadline for seller to respond',
  `respondedAt` DATETIME NULL COMMENT 'When seller responded',
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_seller_approvals_items_idx` (`items_id` ASC) VISIBLE,
  INDEX `fk_seller_approvals_bid_idx` (`bid_id` ASC) VISIBLE,
  INDEX `fk_seller_approvals_sellers_idx` (`sellers_id` ASC) VISIBLE,
  CONSTRAINT `fk_seller_approvals_items`
    FOREIGN KEY (`items_id`)
    REFERENCES `final`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_seller_approvals_bid`
    FOREIGN KEY (`bid_id`)
    REFERENCES `final`.`bid` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_seller_approvals_sellers`
    FOREIGN KEY (`sellers_id`)
    REFERENCES `final`.`sellers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Create pickups table
CREATE TABLE IF NOT EXISTS `final`.`pickups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `items_id` INT NOT NULL,
  `clients_id` INT NOT NULL,
  `scheduledDate` DATETIME NULL COMMENT 'Scheduled pickup date',
  `pickupDeadline` DATETIME NOT NULL COMMENT 'Deadline for pickup (typically 5 days after payment)',
  `status` ENUM('scheduled', 'pending', 'confirmed', 'late', 'completed') NOT NULL DEFAULT 'pending',
  `releaseDocument` VARCHAR(500) NULL COMMENT 'URL or path to release document',
  `confirmedAt` DATETIME NULL COMMENT 'When pickup was confirmed',
  `lateFeeAmount` DECIMAL(10, 2) NULL DEFAULT 0 COMMENT 'Late storage fee amount',
  `transportationCompany` VARCHAR(255) NULL COMMENT 'Transportation company name if applicable',
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_pickups_items_idx` (`items_id` ASC) VISIBLE,
  INDEX `fk_pickups_clients_idx` (`clients_id` ASC) VISIBLE,
  CONSTRAINT `fk_pickups_items`
    FOREIGN KEY (`items_id`)
    REFERENCES `final`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pickups_clients`
    FOREIGN KEY (`clients_id`)
    REFERENCES `final`.`clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- Create title_transfers table
CREATE TABLE IF NOT EXISTS `final`.`title_transfers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `items_id` INT NOT NULL,
  `clients_id` INT NOT NULL,
  `titleType` ENUM('Clean', 'Salvage', 'Non-repairable', 'Rebuilt', 'Export-only') NOT NULL COMMENT 'Type of title being transferred',
  `status` ENUM('pending', 'in-transit', 'completed', 'delayed') NOT NULL DEFAULT 'pending',
  `documentUrl` VARCHAR(500) NULL COMMENT 'URL or path to title document',
  `transferDate` DATETIME NULL COMMENT 'Date when title was transferred',
  `exportDocument` VARCHAR(500) NULL COMMENT 'Export documentation if applicable',
  `notes` TEXT NULL COMMENT 'Additional notes about the transfer',
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_title_transfers_items_idx` (`items_id` ASC) VISIBLE,
  INDEX `fk_title_transfers_clients_idx` (`clients_id` ASC) VISIBLE,
  CONSTRAINT `fk_title_transfers_items`
    FOREIGN KEY (`items_id`)
    REFERENCES `final`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_title_transfers_clients`
    FOREIGN KEY (`clients_id`)
    REFERENCES `final`.`clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

