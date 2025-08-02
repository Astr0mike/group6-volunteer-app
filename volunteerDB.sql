-- volunteerDB.sql
-- Cleaned and unified version using only UserCredentials

DROP TABLE IF EXISTS `EventDetails`;
CREATE TABLE `EventDetails` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `eventName` VARCHAR(100) DEFAULT NULL,
  `eventDescription` TEXT,
  `location` TEXT,
  `requiredSkills` TEXT,
  `urgency` ENUM('Low','Medium','High','Critical') DEFAULT NULL,
  `eventDate` DATE DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `EventDetails` VALUES
(1,'Food Bank Sorting','Organizing and packing food donations.','Houston Central Food Bank','Teamwork','Medium','2025-08-05'),
(2,'Disaster Relief Prep','Prepare emergency kits and supplies.','Austin Relief Center','Planning','High','2025-08-10'),
(3,'Tech for Seniors','Helping senior citizens with tech basics.','Dallas Community Center','Communication','Low','2025-08-12'),
(4,'Flood Response Logistics','Coordinating flood response efforts.','San Antonio Emergency Hub','Leadership','Critical','2025-08-15'),
(5,'Community Server Setup','Setting up a secure server for local non-profit.','El Paso Civic Center','Technical','High','2025-08-20');

DROP TABLE IF EXISTS `UserCredentials`;
CREATE TABLE `UserCredentials` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password_hash` CHAR(60) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `UserProfile`;
CREATE TABLE `UserProfile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `full_name` VARCHAR(50) NOT NULL,
  `address1` VARCHAR(100) NOT NULL,
  `address2` VARCHAR(100) DEFAULT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` CHAR(2) NOT NULL,
  `zip` VARCHAR(9) NOT NULL,
  `skills` JSON NOT NULL,
  `other_skills` TEXT,
  `preferences` TEXT,
  `availability` JSON NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `UserProfile` VALUES
(1,'jdoe','John Doe','123 Elm St',NULL,'Houston','TX','77001','["Leadership", "Teamwork"]',NULL,'Prefers weekend events','{"Monday": "none", "Sunday": "afternoon", "Saturday": "morning"}','2025-08-01 15:43:19','2025-08-01 15:43:19'),
(2,'asmith','Alice Smith','456 Oak Ave','Apt 2','Austin','TX','73301','["Technical", "Problem Solving"]','First Aid','Prefers urgent response events','{"Friday": "evening", "Saturday": "full"}','2025-08-01 15:43:19','2025-08-01 15:43:19'),
(3,'bwhite','Bob White','789 Pine Rd',NULL,'Dallas','TX','75201','["Communication", "Planning"]',NULL,'Can work remote tasks','{"Saturday": "evening", "Wednesday": "afternoon"}','2025-08-01 15:43:19','2025-08-01 15:43:19'),
(4,'cgreen','Carla Green','321 Maple Blvd',NULL,'San Antonio','TX','78205','["Teamwork", "Leadership"]','Event Coordination','Prefers group activities','{"Tuesday": "evening", "Thursday": "full"}','2025-08-01 15:43:19','2025-08-01 15:43:19'),
(5,'dmiller','David Miller','159 Cedar Ln',NULL,'El Paso','TX','79901','["Technical", "Management"]',NULL,'Available anytime','{"Friday": "full", "Monday": "full", "Wednesday": "full"}','2025-08-01 15:43:19','2025-08-01 15:43:19');

DROP TABLE IF EXISTS `VolunteerHistory`;
CREATE TABLE `VolunteerHistory` (
  `history_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  `hours_worked` DECIMAL(5,2) DEFAULT NULL,
  `role` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `event_id_idx` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `VolunteerHistory` VALUES
(1,1,1,4.00,'Volunteer Lead'),
(2,1,2,3.50,'Supply Organizer'),
(3,2,2,5.00,'Kit Assembler'),
(4,2,5,6.00,'Server Technician'),
(5,3,3,2.50,'Tech Mentor'),
(6,4,1,4.50,'Team Coordinator'),
(7,4,4,3.75,'Logistics Lead'),
(8,5,5,5.25,'Network Engineer');
