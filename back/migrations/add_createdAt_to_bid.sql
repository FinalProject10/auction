-- Migration: Add createdAt column to bid table
-- This migration adds a createdAt timestamp column to the bid table
-- to track when each bid was placed

-- Add createdAt column if it doesn't exist
ALTER TABLE `final`.`bid` 
ADD COLUMN IF NOT EXISTS `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER `clients_id`;

-- Update existing bids to have createdAt timestamp based on auction start time
-- This sets a default timestamp for existing bids based on their item's auction start time
UPDATE `final`.`bid` b
INNER JOIN `final`.`items` i ON b.`items_id` = i.`id`
SET b.`createdAt` = i.`timeStart`
WHERE b.`createdAt` IS NULL;

-- Add index on createdAt for better query performance
CREATE INDEX IF NOT EXISTS `idx_bid_createdAt` ON `final`.`bid` (`createdAt`);

