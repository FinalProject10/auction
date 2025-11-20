-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema final
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema final
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `final` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `final` ;

-- -----------------------------------------------------
-- Table `final`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  `telNumb` INT NULL DEFAULT NULL,
  `cinNum` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final`.`memberships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`memberships` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL DEFAULT NULL,
  `price` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`clients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  `telNumb` INT NULL DEFAULT NULL,
  `cinNum` INT NULL DEFAULT NULL,
  `longitude` VARCHAR(255) NULL DEFAULT NULL,
  `lattitude` VARCHAR(255) NULL DEFAULT NULL,
  `adress` VARCHAR(255) NULL DEFAULT NULL,
  `memberships_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_clients_memberships1_idx` (`memberships_id` ASC) VISIBLE,
  CONSTRAINT `fk_clients_memberships1`
    FOREIGN KEY (`memberships_id`)
    REFERENCES `final`.`memberships` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final`.`sellers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`sellers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  `telNumb` INT NULL DEFAULT NULL,
  `cinNum` INT NULL DEFAULT NULL,
  `batinda` VARCHAR(255) NULL DEFAULT NULL,
  `longitude` VARCHAR(255) NULL DEFAULT NULL,
  `lattitude` VARCHAR(255) NULL DEFAULT NULL,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `images` JSON NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `price` INT NULL DEFAULT NULL,
  `timeStart` DATETIME NOT NULL,
  `timeEnd` VARCHAR(45) NULL DEFAULT NULL,
  `reviews` INT NULL DEFAULT NULL,
  `views` INT NULL DEFAULT NULL,
  `watching` INT NULL DEFAULT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `longitude` VARCHAR(255) NULL DEFAULT NULL,
  `lattitude` VARCHAR(255) NULL DEFAULT NULL,
  `sold` TINYINT NULL DEFAULT NULL,
  `sellers_id` INT NOT NULL,
  `body` VARCHAR(45) NULL,
  `climatisation` VARCHAR(45) NULL,
  `cubicCapacity` VARCHAR(45) NULL,
  `emissionClass` VARCHAR(45) NULL,
  `mileage` VARCHAR(45) NULL,
  `parkingsensors` VARCHAR(45) NULL,
  `airbags` VARCHAR(45) NULL,
  `color` VARCHAR(45) NULL,
  `doorCount` VARCHAR(45) NULL,
  `gearBox` VARCHAR(45) NULL,
  `numberOfSeats` INT NULL,
  `power` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_items_sellers1_idx` (`sellers_id` ASC) VISIBLE,
  CONSTRAINT `fk_items_sellers1`
    FOREIGN KEY (`sellers_id`)
    REFERENCES `final`.`sellers` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final`.`bid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`bid` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bidAmount` FLOAT NULL DEFAULT NULL,
  `items_id` INT NOT NULL,
  `clients_id` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_bid_items_idx` (`items_id` ASC) VISIBLE,
  INDEX `fk_bid_clients1_idx` (`clients_id` ASC) VISIBLE,
  CONSTRAINT `fk_bid_clients1`
    FOREIGN KEY (`clients_id`)
    REFERENCES `final`.`clients` (`id`),
  CONSTRAINT `fk_bid_items`
    FOREIGN KEY (`items_id`)
    REFERENCES `final`.`items` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `final`.`reclamation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`reclamation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` LONGTEXT NULL DEFAULT NULL,
  `clients_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_reclamation_clients1_idx` (`clients_id` ASC) VISIBLE,
  CONSTRAINT `fk_reclamation_clients1`
    FOREIGN KEY (`clients_id`)
    REFERENCES `final`.`clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;