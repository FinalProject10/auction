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
-- Table `final`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role` ENUM('admin', 'user', 'seller') NULL,
  `name` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `image` VARCHAR(45) NULL,
  `telNumb` INT NULL,
  `cinNum` INT NULL,
  `userscol` INT NULL,
  `membership` ENUM('free', 'basic', 'vip') NULL,
  `batinda` VARCHAR(255) NULL,
  `longitude` VARCHAR(255) NULL,
  `lattitude` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `final`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `images` JSON NULL,
  `name` VARCHAR(255) NULL,
  `price` INT NULL,
  `timeStart` DATETIME NOT NULL,
  `timeEnd` VARCHAR(45) NULL,
  `reviews` INT NULL,
  `views` INT NULL,
  `watching` INT NULL,
  `description` LONGTEXT NULL,
  `longitude` VARCHAR(255) NULL,
  `lattitude` VARCHAR(255) NULL,
  `availibility` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `final`.`reclamation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`reclamation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` LONGTEXT NULL,
  `users_id` INT NOT NULL,
  `items_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_reclamation_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_reclamation_items1_idx` (`items_id` ASC) VISIBLE,
  CONSTRAINT `fk_reclamation_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `final`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reclamation_items1`
    FOREIGN KEY (`items_id`)
    REFERENCES `final`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `final`.`bid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `final`.`bid` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bidAmount` FLOAT NULL,
  `items_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bid_items_idx` (`items_id` ASC) VISIBLE,
  INDEX `fk_bid_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_bid_items`
    FOREIGN KEY (`items_id`)
    REFERENCES `final`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bid_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `final`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
