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
('Santorini', 'Witness breathtaking sunsets, white-washed buildings, and crystal-clear Aegean waters.', '2025-08-15', '2025-08-22', 1699.99, 'santorini.jpg'),
('Amsterdam', 'Explore charming canals, world-famous museums, and vibrant tulip gardens in the Netherlands.', '2025-04-10', '2025-04-17', 1149.99, 'amsterdam.jpg'),
('Maldives', 'Paradise awaits with overwater bungalows, pristine coral reefs, and turquoise lagoons.', '2025-12-20', '2025-12-28', 3299.99, 'maldives.jpg'),
('Prague', 'Discover medieval architecture, stunning castles, and rich Czech culture in this fairytale city.', '2025-05-05', '2025-05-12', 999.99, 'prague.jpg'),
('Iceland', 'Experience dramatic landscapes, northern lights, geysers, and breathtaking waterfalls.', '2026-01-15', '2026-01-25', 2799.99, 'iceland.jpg'),
('Singapore', 'Modern metropolis featuring futuristic gardens, incredible food scene, and cultural diversity.', '2025-09-15', '2025-09-22', 2099.99, 'singapore.jpg'),
('Rio de Janeiro', 'Soak up the sun at Copacabana, visit Christ the Redeemer, and experience Carnival spirit.', '2026-02-10', '2026-02-20', 1899.99, 'rio.jpg'),
('Istanbul', 'Bridge between East and West with historic mosques, bustling bazaars, and delicious cuisine.', '2025-10-01', '2025-10-08', 1299.99, 'istanbul.jpg'),
('Machu Picchu', 'Trek to the ancient Incan citadel and explore the mystical ruins high in the Andes.', '2025-07-05', '2025-07-15', 2199.99, 'machupicchu.jpg'),
('Cairo', 'Witness the Great Pyramids, Sphinx, and explore thousands of years of Egyptian history.', '2025-11-10', '2025-11-17', 1549.99, 'cairo.jpg'),
('Venice', 'Romantic canals, gondola rides, stunning palazzos, and authentic Italian cuisine await.', '2025-06-01', '2025-06-08', 1749.99, 'venice.jpg'),
('Thailand', 'Tropical beaches, ancient temples, elephant sanctuaries, and vibrant street food culture.', '2025-08-20', '2025-08-30', 1449.99, 'thailand.jpg'),
('Banff', 'Stunning Canadian Rockies with turquoise lakes, wildlife, and world-class skiing.', '2026-03-01', '2026-03-10', 1999.99, 'banff.jpg'),
('Morocco', 'Explore colorful souks, Sahara desert, ancient medinas, and aromatic spice markets.', '2025-10-20', '2025-10-28', 1399.99, 'morocco.jpg'),
('Norway', 'Majestic fjords, northern lights, Viking history, and breathtaking natural beauty.', '2026-01-05', '2026-01-14', 2599.99, 'norway.jpg'),
('Buenos Aires', 'Passionate tango, excellent steaks, European architecture, and vibrant nightlife.', '2025-09-25', '2025-10-02', 1649.99, 'buenosaires.jpg');

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
('Tom', 'Harris', 'tom.harris@email.com', 'tom1234', 'USER'),
('Nadav', 'zamir', 'nadav.zamir@email.com', 'nadav123', 'ADMIN');
;

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
('tom.harris@email.com', 5),
-- Followers for the last 15 vacations (vacation IDs 11-25)
('galamouyal88@gmail.com', 11),
('tdth@gmail.com', 11),
('sarah.cohen@email.com', 11),
('david.levi@email.com', 12),
('emma.miller@email.com', 12),
('michael.brown@email.com', 12),
('james.wilson@email.com', 12),
('rachel.green@email.com', 13),
('tom.harris@email.com', 13),
('galamouyal88@gmail.com', 14),
('tdth@gmail.com', 14),
('sarah.cohen@email.com', 14),
('david.levi@email.com', 14),
('lisa.anderson@email.com', 15),
('james.wilson@email.com', 15),
('rachel.green@email.com', 15),
('galamouyal88@gmail.com', 16),
('tdth@gmail.com', 16),
('emma.miller@email.com', 16),
('michael.brown@email.com', 17),
('lisa.anderson@email.com', 17),
('tom.harris@email.com', 17),
('sarah.cohen@email.com', 18),
('david.levi@email.com', 18),
('james.wilson@email.com', 18),
('rachel.green@email.com', 18),
('galamouyal88@gmail.com', 19),
('emma.miller@email.com', 19),
('michael.brown@email.com', 19),
('tdth@gmail.com', 20),
('lisa.anderson@email.com', 20),
('tom.harris@email.com', 20),
('sarah.cohen@email.com', 21),
('david.levi@email.com', 21),
('emma.miller@email.com', 21),
('james.wilson@email.com', 21),
('rachel.green@email.com', 21),
('galamouyal88@gmail.com', 22),
('tdth@gmail.com', 22),
('michael.brown@email.com', 23),
('lisa.anderson@email.com', 23),
('tom.harris@email.com', 23),
('sarah.cohen@email.com', 24),
('david.levi@email.com', 24),
('emma.miller@email.com', 24),
('james.wilson@email.com', 24),
('galamouyal88@gmail.com', 25),
('rachel.green@email.com', 25);