-- MySQL dump 10.13  Distrib 9.1.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: volunteerDB
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `EventDetails`
--

DROP TABLE IF EXISTS `EventDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EventDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventName` varchar(100) DEFAULT NULL,
  `eventDescription` text,
  `location` text,
  `requiredSkills` text,
  `urgency` enum('Low','Medium','High','Critical') DEFAULT NULL,
  `eventDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EventDetails`
--

LOCK TABLES `EventDetails` WRITE;
/*!40000 ALTER TABLE `EventDetails` DISABLE KEYS */;
INSERT INTO `EventDetails` VALUES (1,'Food Bank Sorting','Organizing and packing food donations.','Houston Central Food Bank','Teamwork','Medium','2025-08-05'),(2,'Disaster Relief Prep','Prepare emergency kits and supplies.','Austin Relief Center','Planning','High','2025-08-10'),(3,'Tech for Seniors','Helping senior citizens with tech basics.','Dallas Community Center','Communication','Low','2025-08-12'),(4,'Flood Response Logistics','Coordinating flood response efforts.','San Antonio Emergency Hub','Leadership','Critical','2025-08-15'),(5,'Community Server Setup','Setting up a secure server for local non-profit.','El Paso Civic Center','Technical','High','2025-08-20');
/*!40000 ALTER TABLE `EventDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserCredentials`
--

DROP TABLE IF EXISTS `UserCredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserCredentials` (
  `user_id` int unsigned NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` char(60) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCredentials`
--

LOCK TABLES `UserCredentials` WRITE;
/*!40000 ALTER TABLE `UserCredentials` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserCredentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserProfile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` char(2) NOT NULL,
  `zip` varchar(9) NOT NULL,
  `skills` json NOT NULL,
  `other_skills` text,
  `preferences` text,
  `availability` json NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfile`
--

LOCK TABLES `UserProfile` WRITE;
/*!40000 ALTER TABLE `UserProfile` DISABLE KEYS */;
INSERT INTO `UserProfile` VALUES (1,'jdoe','John Doe','123 Elm St',NULL,'Houston','TX','77001','[\"Leadership\", \"Teamwork\"]',NULL,'Prefers weekend events','{\"Monday\": \"none\", \"Sunday\": \"afternoon\", \"Saturday\": \"morning\"}','2025-08-01 15:43:19','2025-08-01 15:43:19'),(2,'asmith','Alice Smith','456 Oak Ave','Apt 2','Austin','TX','73301','[\"Technical\", \"Problem Solving\"]','First Aid','Prefers urgent response events','{\"Friday\": \"evening\", \"Saturday\": \"full\"}','2025-08-01 15:43:19','2025-08-01 15:43:19'),(3,'bwhite','Bob White','789 Pine Rd',NULL,'Dallas','TX','75201','[\"Communication\", \"Planning\"]',NULL,'Can work remote tasks','{\"Saturday\": \"evening\", \"Wednesday\": \"afternoon\"}','2025-08-01 15:43:19','2025-08-01 15:43:19'),(4,'cgreen','Carla Green','321 Maple Blvd',NULL,'San Antonio','TX','78205','[\"Teamwork\", \"Leadership\"]','Event Coordination','Prefers group activities','{\"Tuesday\": \"evening\", \"Thursday\": \"full\"}','2025-08-01 15:43:19','2025-08-01 15:43:19'),(5,'dmiller','David Miller','159 Cedar Ln',NULL,'El Paso','TX','79901','[\"Technical\", \"Management\"]',NULL,'Available anytime','{\"Friday\": \"full\", \"Monday\": \"full\", \"Wednesday\": \"full\"}','2025-08-01 15:43:19','2025-08-01 15:43:19');
/*!40000 ALTER TABLE `UserProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VolunteerHistory`
--

DROP TABLE IF EXISTS `VolunteerHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VolunteerHistory` (
  `history_id` int NOT NULL,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `hours_worked` decimal(5,2) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `event_id_idx` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VolunteerHistory`
--

LOCK TABLES `VolunteerHistory` WRITE;
/*!40000 ALTER TABLE `VolunteerHistory` DISABLE KEYS */;
INSERT INTO `VolunteerHistory` VALUES (1,1,1,4.00,'Volunteer Lead'),(2,1,2,3.50,'Supply Organizer'),(3,2,2,5.00,'Kit Assembler'),(4,2,5,6.00,'Server Technician'),(5,3,3,2.50,'Tech Mentor'),(6,4,1,4.50,'Team Coordinator'),(7,4,4,3.75,'Logistics Lead'),(8,5,5,5.25,'Network Engineer');
/*!40000 ALTER TABLE `VolunteerHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-01 13:16:04
