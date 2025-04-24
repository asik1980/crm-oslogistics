-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: crm_oslogistics
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('24bdc30e-64b5-459f-b764-26a95aaf75f9','2adc30403e4aab01185d0860ce493ef3e75ad6c6a346ccf5a26f33d9a9e8a4d3','2025-04-20 07:32:25.001','20250420073224_add_ftl_rail',NULL,NULL,'2025-04-20 07:32:24.978',1),('2fa7ccb2-e66e-4e4b-9f28-25c3ca9a3815','367a70c05b2e2b07b5d20f7038188af9a594dcc7a28a35467c7e22a1997cc91e','2025-04-18 12:34:16.494','20250418123416_unique_nip',NULL,NULL,'2025-04-18 12:34:16.447',1),('48c0cb82-2c0a-45c8-b532-5d2c470ca608','df5c11895b10d49c40a810ec2ffc9735f586674c1d3a3983afe407ffda8b5e9b','2025-04-17 12:00:20.427','20250417120020_add_phone_to_user',NULL,NULL,'2025-04-17 12:00:20.405',1),('6a2f0c7f-739f-4745-93f8-69ef1798365f','fa3dcbeb166fec84c4a1f8feebccf18d9dc090e0ba0f5e07443894a3c4e85ebb','2025-04-18 11:00:50.448','20250418110050_add_status_to_client',NULL,NULL,'2025-04-18 11:00:50.425',1),('767a4e07-5ca9-41d1-ad62-052dc647912e','9070c28e766e5c03f33ca0643f70917a3fbd0d4a215d66c60c5c76bd9e87382e','2025-04-23 15:37:05.154','20250423153704_add_tasks_model',NULL,NULL,'2025-04-23 15:37:04.996',1),('95477b3f-ee8d-4e52-a067-aaac25622cb4','f4232e2bbec7f787f6be6b940b9646c86dd67ba7f9aa35905836e71d894796a4','2025-04-16 13:02:55.927','20250414125626_add_user_model',NULL,NULL,'2025-04-16 13:02:55.726',1),('9d5b0175-3d96-4d8c-b650-748759ec7a53','6aff9a09363acec7fce0d42fc51b2dd72cabaa1eb791fe9f88bfeb6e5d0ccdc1','2025-04-16 13:35:04.789','20250416133504_add_email_phone',NULL,NULL,'2025-04-16 13:35:04.734',1),('a3b38ea7-338a-4c5c-8756-4cf3cac459a1','4c1a639b8b7baeffd736cd91f7b510a89511e28db9c3a1a0b0ea2b7f87191bbb','2025-04-16 13:02:55.717','20250406091115_init',NULL,NULL,'2025-04-16 13:02:55.680',1),('c03440c6-ee96-4b43-a99d-c66bbcc54963','6565854e0639a119c089d4b91e3e086293fbac6a0fe4d0b13fa32fed6c462de0','2025-04-20 09:04:59.747','20250420090459_add_notes_class_and_contacts',NULL,NULL,'2025-04-20 09:04:59.682',1),('f7d5e8f2-e45c-4fd0-b66d-fac190f82f8f','f4ce135c94fc36fdf6ef2971c35ce521ef9b0d16c26833bbf56cf9acc7422f8d','2025-04-18 11:09:06.660','20250418110906_add_status_to_client',NULL,NULL,'2025-04-18 11:09:06.646',1),('f8c297a6-7f75-44ab-8e78-1ad9002631de','d525f124391f5ec4e4509400a1587247b3ce5e984c43254f014bb1a04970dfa7','2025-04-23 17:08:31.568','20250423170830_add_current_goal_to_client',NULL,NULL,'2025-04-23 17:08:31.548',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `address` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fromChina` tinyint(1) NOT NULL DEFAULT '0',
  `interestedAIR` tinyint(1) NOT NULL DEFAULT '0',
  `interestedFCL` tinyint(1) NOT NULL DEFAULT '0',
  `interestedLCL` tinyint(1) NOT NULL DEFAULT '0',
  `isExporter` tinyint(1) NOT NULL DEFAULT '0',
  `isImporter` tinyint(1) NOT NULL DEFAULT '0',
  `nip` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  `userId` int NOT NULL,
  `website` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipCode` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DO AKCEPTACJI',
  `interestedFTL` tinyint(1) NOT NULL DEFAULT '0',
  `interestedRAIL` tinyint(1) NOT NULL DEFAULT '0',
  `clientClass` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'D',
  `notes` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `daysBetweenTasks` int NOT NULL DEFAULT '1',
  `currentGoalId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Client_nip_key` (`nip`),
  KEY `Client_userId_fkey` (`userId`),
  CONSTRAINT `Client_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES (1,'OS Logistics','2025-04-16 13:44:26.458','Kapitańska 47 a','Gdynia',1,0,1,1,0,1,'5862282298','2025-04-23 20:40:14.158',1,'www.oslogistics.pl','81-249','info@oslogistics.pl','720882884','ZATWIERDZONY',0,0,'D',NULL,1,1),(3,'Project AS','2025-04-17 10:21:13.582','Wagnera 18','Gdynia',1,1,1,1,1,1,'9581361163','2025-04-23 20:40:22.979',1,'aa','81-578','a.sawicki@projectas.pl','720111222','ZATWIERDZONY',1,1,'A','test 2',2,2),(4,'Testowa','2025-04-18 10:51:58.204','Gdańska 5','Gdańsk',1,1,0,1,0,0,'123456789','2025-04-23 13:06:07.894',4,'www.test.pl','80-255','asawicki@asawicki.pl','720222333','ZATWIERDZONY',0,0,'D',NULL,7,NULL);
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contact`
--

DROP TABLE IF EXISTS `Contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientId` int NOT NULL,
  `firstName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salutation` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Contact_clientId_fkey` (`clientId`),
  CONSTRAINT `Contact_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contact`
--

LOCK TABLES `Contact` WRITE;
/*!40000 ALTER TABLE `Contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `Contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Goal`
--

DROP TABLE IF EXISTS `Goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Goal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Goal`
--

LOCK TABLES `Goal` WRITE;
/*!40000 ALTER TABLE `Goal` DISABLE KEYS */;
INSERT INTO `Goal` VALUES (1,'cold call'),(2,'zadzwonić'),(3,'przypomnieć się');
/*!40000 ALTER TABLE `Goal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Task`
--

DROP TABLE IF EXISTS `Task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientId` int NOT NULL,
  `goalId` int NOT NULL,
  `plannedAt` datetime(3) NOT NULL,
  `doneAt` datetime(3) DEFAULT NULL,
  `notes` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('PLANNED','DONE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PLANNED',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Task_clientId_fkey` (`clientId`),
  KEY `Task_goalId_fkey` (`goalId`),
  CONSTRAINT `Task_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Task_goalId_fkey` FOREIGN KEY (`goalId`) REFERENCES `Goal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task`
--

LOCK TABLES `Task` WRITE;
/*!40000 ALTER TABLE `Task` DISABLE KEYS */;
INSERT INTO `Task` VALUES (4,1,1,'2025-04-23 00:00:00.000','2025-04-23 00:00:00.000','a','DONE','2025-04-23 20:40:29.261'),(5,1,1,'2025-04-23 00:00:00.000','2025-04-23 00:00:00.000','aa','DONE','2025-04-23 20:44:59.042'),(6,1,1,'2025-04-23 00:00:00.000','2025-04-23 00:00:00.000','c','DONE','2025-04-23 20:51:30.866'),(7,1,1,'2025-04-23 00:00:00.000','2025-04-23 00:00:00.000','d','DONE','2025-04-23 20:51:34.010'),(8,1,1,'2025-04-23 00:00:00.000','2025-04-23 00:00:00.000','f','DONE','2025-04-23 20:52:01.245'),(9,1,1,'2025-04-23 00:00:00.000','2025-04-23 00:00:00.000','h','DONE','2025-04-23 20:53:07.741'),(10,1,1,'2025-04-23 00:00:00.000','2025-04-23 00:00:00.000','ssss','DONE','2025-04-23 20:53:39.240'),(11,1,1,'2025-04-23 00:00:00.000','2025-04-23 00:00:00.000','aaaaa','DONE','2025-04-23 20:56:49.489'),(12,1,1,'2025-04-24 00:00:00.000','2025-04-24 00:00:00.000','a w sumie o niczym','DONE','2025-04-24 12:06:02.694');
/*!40000 ALTER TABLE `Task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('ADMIN','HANDLOWIEC') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'HANDLOWIEC',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'a.sawicki@oslogistics.pl','ASDasd','Adrian','Sawicki','720882884','ADMIN'),(4,'k.markiewicz@oslogistics.pl','123456','Katarzyna','Markiewicz','790000000','HANDLOWIEC'),(5,'test@test.pl','123456','Test','Testowy','777111888','HANDLOWIEC');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-24 14:18:04
