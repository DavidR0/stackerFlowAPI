CREATE DATABASE  IF NOT EXISTS `stackerflow` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `stackerflow`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: stackerflow
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `Answer_ID` int NOT NULL AUTO_INCREMENT,
  `Question_ID` int DEFAULT NULL,
  `User_ID` int DEFAULT NULL,
  `Author` varchar(255) NOT NULL,
  `Content` varchar(10000) NOT NULL,
  `VoteCount` int DEFAULT '0',
  `CreationTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Answer_ID`),
  UNIQUE KEY `question answer_Answer_ID_uindex` (`Answer_ID`),
  KEY `question answer_question_Question_ID_fk` (`Question_ID`),
  KEY `question answer_user_User_ID_fk` (`User_ID`),
  CONSTRAINT `question answer_question_Question_ID_fk` FOREIGN KEY (`Question_ID`) REFERENCES `question` (`Question_ID`) ON DELETE CASCADE,
  CONSTRAINT `question answer_user_User_ID_fk` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (16,4,28,'test','my answer 5 is',0,'2022-03-13 17:35:19'),(17,4,30,'test2','my answer is u2',0,'2022-03-14 21:43:39'),(18,4,30,'test2','Updated answer',0,'2022-03-15 19:32:49');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `Question_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int DEFAULT NULL,
  `Author` varchar(255) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` varchar(10000) NOT NULL,
  `CreationTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `VoteCount` int DEFAULT '0',
  PRIMARY KEY (`Question_ID`),
  UNIQUE KEY `Question_Question_ID_uindex` (`Question_ID`),
  KEY `question_user_User_ID_fk` (`User_ID`),
  CONSTRAINT `question_user_User_ID_fk` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (4,28,'test','New title','this is my question','2022-03-13 17:27:30',1),(5,30,'test2','My title u2','this is my question u2','2022-03-14 21:43:17',0);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_tag`
--

DROP TABLE IF EXISTS `question_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_tag` (
  `Tag_ID` int DEFAULT NULL,
  `Question_ID` int DEFAULT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `question_tag_ID_uindex` (`ID`),
  KEY `question_tag_question_Question_ID_fk` (`Question_ID`),
  KEY `question_tag_tag_Tag_ID_fk` (`Tag_ID`),
  CONSTRAINT `question_tag_question_Question_ID_fk` FOREIGN KEY (`Question_ID`) REFERENCES `question` (`Question_ID`) ON DELETE CASCADE,
  CONSTRAINT `question_tag_tag_Tag_ID_fk` FOREIGN KEY (`Tag_ID`) REFERENCES `tag` (`Tag_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_tag`
--

LOCK TABLES `question_tag` WRITE;
/*!40000 ALTER TABLE `question_tag` DISABLE KEYS */;
INSERT INTO `question_tag` VALUES (1,4,2),(1,4,3),(1,4,4),(1,4,6),(1,5,7),(5,5,9);
/*!40000 ALTER TABLE `question_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `JwtToken` varchar(1520) NOT NULL,
  `Valid` tinyint(1) NOT NULL DEFAULT '1',
  `ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `session_ID_uindex` (`ID`),
  KEY `session_user_User_ID_fk` (`User_ID`),
  CONSTRAINT `session_user_User_ID_fk` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IiQyYiQwNSQ4NGdvS1ZORXBBcHJyeTZLeUhWNGMuRWVlMzc4VTZ4RmUudEF0U3F5UFhwSkRuS1FvUHhyUyIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInVzZXJJZCI6MjgsInR5cGUiOiJVc2VyIiwiYmFubmVkIjowLCJ0d29GYWN0IjowLCJzY29yZSI6MCwiaWF0IjoxNjQ3MjkzODcwLCJleHAiOjE2NDcyOTQ0NzB9.IhY-KjhAox-JQizGpx3Zoe8qm1HBvGiQE8waXEjbpAMA5B-wPAWM9mV5I0hLl9VxMH00LhDrksZferziWRBZ0hfHoD-cuoNUallpJIxUhcTIfBTiVjQEGwpk2a30BZSpRSaapIM7pKbZbEClYgiruC9sr7WuDN0qQOXOFPzw6ZU',1,151,28),('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QyIiwicGFzc3dvcmQiOiIkMmIkMDUkdi5BdmhUcUJ5elFUSkk5emEwYkJCdWRyQnVNYUw2WnkuUEpqVzUvblRrcHdNdEpxd09UUjIiLCJlbWFpbCI6InRlc3QyQGV4YW1wbGUuY29tIiwidXNlcklkIjozMCwidHlwZSI6IlVzZXIiLCJiYW5uZWQiOjAsInR3b0ZhY3QiOjEsInNjb3JlIjowLCJwcml2YXRlS2V5IjoiS04zRVNTVEJKTVFVMjJKUkVaWlVTN0xWSU5EWE9WRDNKUk9WRVpTT05FUlRTT0syUEJJUSIsImlhdCI6MTY0NzI5NDE0OSwiZXhwIjoxNjQ3Mjk0NzQ5fQ.Upsrd3lNcLbYJwXDyz5htPDDYuhKlxtpCqvZca0eSWKYLB_vX1CbsHe2pYNnD3lxCIY4shnHwAAjE8l7ipQpXYRpVWcBc9jf-DX2NIdmTqtP0l41L3RBJpiSzg7I9cWHCaTLzb6ebmU0SSWks-avFQUQ3UtyC5k5KH6l_LD777Y',0,152,30),('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QyIiwicGFzc3dvcmQiOiIkMmIkMDUkdi5BdmhUcUJ5elFUSkk5emEwYkJCdWRyQnVNYUw2WnkuUEpqVzUvblRrcHdNdEpxd09UUjIiLCJlbWFpbCI6InRlc3QyQGV4YW1wbGUuY29tIiwidXNlcklkIjozMCwidHlwZSI6IlVzZXIiLCJiYW5uZWQiOjAsInR3b0ZhY3QiOjEsInNjb3JlIjowLCJwcml2YXRlS2V5IjoiS04zRVNTVEJKTVFVMjJKUkVaWlVTN0xWSU5EWE9WRDNKUk9WRVpTT05FUlRTT0syUEJJUSIsImlhdCI6MTY0NzI5NDc3MiwiZXhwIjoxNjQ3Mjk1MzcyfQ.IoeghbE5ajLBX4xjEfi7rU661W8jZySixGYFDEAsIwJ9itknFwtmpDZE042L6EH1FwRqnu6b-gdE7Ao4wLt1r5IfpKluv1hrA56U-IFjL7LhBMjdXOJ6L2HIAvjlRLjOkHUK1SG10AIrxxkQgkN-LEW3eMvc9-uKEpSvyebSqz0',0,153,30),('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QyIiwicGFzc3dvcmQiOiIkMmIkMDUkdi5BdmhUcUJ5elFUSkk5emEwYkJCdWRyQnVNYUw2WnkuUEpqVzUvblRrcHdNdEpxd09UUjIiLCJlbWFpbCI6InRlc3QyQGV4YW1wbGUuY29tIiwidXNlcklkIjozMCwidHlwZSI6IlVzZXIiLCJiYW5uZWQiOjAsInR3b0ZhY3QiOjAsInNjb3JlIjowLCJwcml2YXRlS2V5IjoiS04zRVNTVEJKTVFVMjJKUkVaWlVTN0xWSU5EWE9WRDNKUk9WRVpTT05FUlRTT0syUEJJUSIsImlhdCI6MTY0NzM3Mjc0NSwiZXhwIjoxNjQ3MzczMzQ1fQ.SUMpU4YDyyyqiV49OWSKpiTyMxmfB4CNf8tmxJau0_9T5z8rVfTzA5BBy2qXSxRUyqJo6ugkEvXjSg9XOmsFzSqVA8hg4yOxP45uemTjALTBCU2jehfXCOc_Hn6dTnGW0qSm3qqko5vgZXff-CmxdUH9xVkh7K18AS-VQvxu7Io',1,154,30);
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `Tag_ID` int NOT NULL AUTO_INCREMENT,
  `Tag` varchar(255) NOT NULL,
  PRIMARY KEY (`Tag_ID`),
  UNIQUE KEY `Tag_Tag_uindex` (`Tag`),
  UNIQUE KEY `Tag_tag_ID_uindex` (`Tag_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The tags are stored in this table.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (5,'JS'),(1,'TS');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User_ID` int NOT NULL AUTO_INCREMENT,
  `Type` enum('User','Admin') NOT NULL DEFAULT 'User',
  `Banned` tinyint(1) DEFAULT '0',
  `TwoFact` tinyint(1) DEFAULT '0',
  `Score` int DEFAULT '0',
  `PrivateKey` varchar(512) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(512) NOT NULL,
  `UserName` varchar(255) NOT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `User_User_ID_uindex` (`User_ID`),
  UNIQUE KEY `user_Email_uindex` (`Email`),
  UNIQUE KEY `user_UserName_uindex` (`UserName`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (28,'User',0,0,0,NULL,'test@example.com','$2b$05$84goKVNEpAprry6KyHV4c.Eee378U6xFe.tAtSqyPXpJDnKQoPxrS','test'),(30,'User',0,0,0,'KN3ESSTBJMQU22JREZZUS7LVINDXOVD3JROVEZSONERTSOK2PBIQ','test2@example.com','$2b$05$v.AvhTqByzQTJI9za0bBBudrBuMaL6Zy.PJjW5/nTkpwMtJqwOTR2','test2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote` (
  `Vote_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int NOT NULL,
  `Item_ID` int DEFAULT NULL,
  `VoteType` enum('up','down') NOT NULL,
  `ItemType` enum('question','answer') NOT NULL,
  PRIMARY KEY (`Vote_ID`),
  UNIQUE KEY `vote_Vote_ID_uindex` (`Vote_ID`),
  KEY `vote_vote_item_type_ID_fk` (`Item_ID`),
  KEY `vote_user_User_ID_fk` (`User_ID`),
  CONSTRAINT `vote_user_User_ID_fk` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (1,28,1,'up','question'),(2,28,1,'up','question'),(3,28,1,'down','question'),(5,30,16,'up','answer');
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-15 21:36:42
