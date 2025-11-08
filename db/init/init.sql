SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `northwind` ;
CREATE SCHEMA IF NOT EXISTS `northwind` DEFAULT CHARACTER SET latin1 ;
USE `northwind` ;


-- Vacations Table
CREATE TABLE IF NOT EXISTS `northwind`.`vacations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `destination` VARCHAR(20) NOT NULL,
  `description` VARCHAR(250) NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `image` VARCHAR(100) NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

-- Users Table
CREATE TABLE IF NOT EXISTS `northwind`.`users` (
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`email`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

-- Followers Table
CREATE TABLE IF NOT EXISTS `northwind`.`followers` (
  `user_email` VARCHAR(30) NOT NULL,
  `vacation_id` INT NOT NULL,
  PRIMARY KEY (`user_email`, `vacation_id`),
  FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE CASCADE,
  FOREIGN KEY (`vacation_id`) REFERENCES `vacations`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Insert dummy data for Vacations
INSERT INTO `northwind`.`vacations` (`destination`, `description`, `start_date`, `end_date`, `price`, `image`) VALUES
('Paris', 'Experience the City of Light with its iconic Eiffel Tower, world-class museums, and charming cafes.', '2025-06-15', '2025-06-22', 1299.99, 'paris.jpg'),
('Tokyo', 'Discover the perfect blend of ancient traditions and modern technology in Japan''s vibrant capital.', '2025-07-10', '2025-07-20', 2499.99, 'tokyo.jpg'),
('New York', 'Explore the Big Apple with Broadway shows, Central Park, and iconic skyline views.', '2025-08-05', '2025-08-12', 1799.99, 'newyork.jpg'),
('Barcelona', 'Enjoy Gaudi''s architecture, Mediterranean beaches, and delicious tapas in this Spanish gem.', '2025-09-01', '2025-09-08', 1199.99, 'barcelona.jpg'),
('Dubai', 'Luxury shopping, ultramodern architecture, and desert adventures await in this Middle Eastern paradise.', '2025-10-15', '2025-10-22', 1899.99, 'dubai.jpg'),
('Bali', 'Relax on pristine beaches, explore ancient temples, and immerse yourself in Balinese culture.', '2025-11-20', '2025-11-30', 1599.99, 'bali.jpg'),
('Rome', 'Walk through history visiting the Colosseum, Vatican, and countless ancient ruins.', '2025-05-10', '2025-05-17', 1399.99, 'rome.jpg'),
('Sydney', 'Experience the Opera House, beautiful harbors, and stunning Australian wildlife.', '2025-12-01', '2025-12-15', 2299.99, 'sydney.jpg'),
('London', 'Discover royal palaces, historic landmarks, and world-renowned museums in England''s capital.', '2025-06-20', '2025-06-27', 1499.99, 'london.jpg'),
('Santorini', 'Witness breathtaking sunsets, white-washed buildings, and crystal-clear Aegean waters.', '2025-08-15', '2025-08-22', 1699.99, 'santorini.jpg');

-- Insert dummy data for Users
INSERT INTO `northwind`.`users` (`first_name`, `last_name`, `email`, `password`, `role`) VALUES
('Gal', 'Amouyal', 'galamouyal88@gmail.com', 'admin123', 'ADMIN'),
('Tomer', 'Davidson', 'tdth@gmail.com', 'user123', 'USER'),
('Sarah', 'Cohen', 'sarah.cohen@email.com', 'pass456', 'USER'),
('David', 'Levi', 'david.levi@email.com', 'pass789', 'USER'),
('Emma', 'Miller', 'emma.miller@email.com', 'secure101', 'USER'),
('Michael', 'Brown', 'michael.brown@email.com', 'mypass202', 'USER'),
('Lisa', 'Anderson', 'lisa.anderson@email.com', 'lisa2025', 'ADMIN'),
('James', 'Wilson', 'james.wilson@email.com', 'james999', 'USER'),
('Rachel', 'Green', 'rachel.green@email.com', 'rachel456', 'USER'),
('Tom', 'Harris', 'tom.harris@email.com', 'tom1234', 'USER');

-- Insert dummy data for Followers
INSERT INTO `northwind`.`followers` (`user_email`, `vacation_id`) VALUES
('galamouyal88@gmail.com', 1),
('galamouyal88@gmail.com', 3),
('galamouyal88@gmail.com', 7),
('tdth@gmail.com', 2),
('tdth@gmail.com', 5),
('sarah.cohen@email.com', 1),
('sarah.cohen@email.com', 4),
('sarah.cohen@email.com', 10),
('david.levi@email.com', 2),
('david.levi@email.com', 6),
('emma.miller@email.com', 3),
('emma.miller@email.com', 9),
('michael.brown@email.com', 1),
('michael.brown@email.com', 5),
('michael.brown@email.com', 8),
('lisa.anderson@email.com', 7),
('james.wilson@email.com', 4),
('james.wilson@email.com', 6),
('rachel.green@email.com', 2),
('rachel.green@email.com', 10),
('tom.harris@email.com', 1),
('tom.harris@email.com', 3),
('tom.harris@email.com', 5);