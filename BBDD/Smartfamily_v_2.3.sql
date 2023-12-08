-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: smartfamily
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `casas`
--

DROP TABLE IF EXISTS `casas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `casas` (
  `idcasa` varchar(60) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `administrador` varchar(45) NOT NULL,
  `miembros` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`idcasa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `casas`
--

LOCK TABLES `casas` WRITE;
/*!40000 ALTER TABLE `casas` DISABLE KEYS */;
INSERT INTO `casas` VALUES ('_2b_10_FHzL_hUMUHXbOsSI.iGknOXdhGqO6AG30utSAsF1n7cHsWxs9OUT2','Santa Marina','adrifanjul2452@gmail.com',NULL),('_2b_10_hzmIHcCavawnnnZYFGjVw.NG02etxrw5chjSK5I6hODwFHlJ_X2Yu','Santa Marina','nosango03@gmail.com','liam@gmail.com');
/*!40000 ALTER TABLE `casas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `ideventos` varchar(100) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `fecha` timestamp(6) NOT NULL,
  `ubicacion` varchar(45) DEFAULT NULL,
  `participantes` varchar(800) DEFAULT NULL,
  `duracion` varchar(45) DEFAULT NULL,
  `id_casa` varchar(60) DEFAULT NULL,
  UNIQUE KEY `ideventos_UNIQUE` (`ideventos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES ('_2b_10_3AJyDfWuVQFBiZCBNaUr.uDKRA0ImE_9ys6nCaEACG_vBQtjOyWv.','Sporting - Amorebieta','2023-11-11 20:00:00.000000','Gijón','adrifanjul2452@gmail.com',NULL,'_2b_10_FHzL_hUMUHXbOsSI.iGknOXdhGqO6AG30utSAsF1n7cHsWxs9OUT2'),('_2b_10_XKAUp3kqNs3LHEgsSrl6Eu.d.67e6HfjX4xnwwOu9g_3ESkzFsm7a','Sporting - Amorebieta','2023-11-11 18:00:00.000000','Gijón','adrifanjul2452@gmail.com',NULL,NULL);
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitaciones`
--

DROP TABLE IF EXISTS `invitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitaciones` (
  `codigo` varchar(255) NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idCasa` varchar(60) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitaciones`
--

LOCK TABLES `invitaciones` WRITE;
/*!40000 ALTER TABLE `invitaciones` DISABLE KEYS */;
INSERT INTO `invitaciones` VALUES ('DWT0T','2023-11-17 10:12:20','_2b_10_hzmIHcCavawnnnZYFGjVw.NG02etxrw5chjSK5I6hODwFHlJ_X2Yu');
/*!40000 ALTER TABLE `invitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` varchar(60) NOT NULL,
  `rol` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo_UNIQUE` (`rol`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('9b2f3452-1a46-4e0d-8d49-0e6e9d4f8ec9','Administrador'),('f47ac10b-58cc-4372-a567-0e02b2c3d479','Hijo'),('4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a','Padre');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareas` (
  `idtareas` varchar(100) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `participantes` varchar(800) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_completada` timestamp(6) NULL DEFAULT NULL,
  `id_casa` varchar(60) NOT NULL,
  PRIMARY KEY (`idtareas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` VALUES ('_2b_10_dEYS3MRZnuuevSWj19uhSO3EyVMm.dm7.mZWp6GvdZUVdLJKkKn_.','Diseño tareas','Añadir diseño al crear la tarea','adrifanjul2452@gmail.com','Completado','2023-11-17 10:18:45','2023-11-17 10:18:56.000000','_2b_10_hzmIHcCavawnnnZYFGjVw.NG02etxrw5chjSK5I6hODwFHlJ_X2Yu'),('_2b_10_rXY7UE37XLlBAETaD7dXne5QJaUc.a.wQdTYPOUmDjQmotG_ivr.6','Recoger a noe','Ir a mieres a recoger a noe','adrifanjul2452@gmail.com','Sin Empezar','2023-11-16 08:13:33',NULL,'_2b_10_FHzL_hUMUHXbOsSI.iGknOXdhGqO6AG30utSAsF1n7cHsWxs9OUT2');
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_fecha_completada` BEFORE UPDATE ON `tareas` FOR EACH ROW BEGIN
    IF NEW.estado = 'Completado' AND OLD.estado != 'Completado' THEN
        SET NEW.fecha_completada = CURRENT_TIMESTAMP;
        SET NEW.fecha_creacion = OLD.fecha_creacion;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `uid` varchar(60) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `sexo` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo` varchar(300) NOT NULL,
  `family_points` int NOT NULL,
  `id_casa` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  UNIQUE KEY `telefono_UNIQUE` (`telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('$2b$10$3tTvJ/tgs7wOGrVvsD9ygetUBgAau25xqPwADi.3WgoAEu/CmKQg6','Iria','Fanjul Sanchez','Femenino','iria@gmail.com','$2a$10$DRWCzxhuby5C1gG0tXIoSOXAK4hARphG6C/zF.lGuk/acYH0uG.x2','644040830','2032-05-24','4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a,9b2f3452-1a46-4e0d-8d49-0e6e9d4f8ec9',0,''),('$2b$10$CaopWwqqIjcZE4zeXYbLnumNDwYom2ZOUaGLuWHeu3S7NqjmUu8t6','Liam','Fanjul Pinto','Masculino','liam@gmail.com','$2a$10$omvdwWUyuEQX.HhuGlK3a.3Qo5G.P9LuPDfY3ATh1S8YdD97ma1le','644252562','2023-11-07','4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a',0,'_2b_10_hzmIHcCavawnnnZYFGjVw.NG02etxrw5chjSK5I6hODwFHlJ_X2Yu'),('$2b$10$dP2FlOKFIZWNHZ0Ua8/xHOxmvzOXCcsHxdBf6btpFiFxXPJF78iCG','Ana','Pinto Solis','Femenino','anaisabelpintosolis@gmail.com','$2a$10$hL72LRcGiGmOmY7wGSeAievd6mKINbUWXjB2fkW6.kZJmtzlKF36e','643140830','2007-05-24','4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a,9b2f3452-1a46-4e0d-8d49-0e6e9d4f8ec9',0,NULL),('$2b$10$eBAGVRj2c6N7Q5iRPof6TeFwUH5ykjDfI3JJ/GIpfFsgmxF8x/c7q','Celso','Fanjul Gonzalez','Masculino','celsocel@gmail.com','$2a$10$Je7rW5XtiLHgxlZ9ZTeCte9ektrFIGzMFRkJ5uhloNPpu6pNv2Fk6','633140830','2007-05-24','4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a,9b2f3452-1a46-4e0d-8d49-0e6e9d4f8ec9',0,NULL),('$2b$10$gihmiRhj54UsO6zbIwqAkemEWOVX4c9zBhL53aCAWlWP4y2Tfyv3K','Adrian','Fanjul Pinto','Masculino','adrifanjul2452@gmail.com','$2a$10$nZfWYy0z3J6jqTaIES0QAu9GEpEj7xxb/mFCErzWfHodCEeCNpumG','644140830','2002-05-24','4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a,9b2f3452-1a46-4e0d-8d49-0e6e9d4f8ec9',100,'_2b_10_FHzL_hUMUHXbOsSI.iGknOXdhGqO6AG30utSAsF1n7cHsWxs9OUT2'),('$2b$10$nkL.qdbIcNG/87x4jQViOOHbYToCzv963H9QRTKrjJyK4tGr7uXPS','Manuel','Fresno Rodriguez','Masculino','fresno@gmail.com','$2a$10$Kgog2Ga/xqw/vQem6wZZyuDo5lc4LuFrlRj27ErXiZHq0fu/6qdD.','639940830','2007-05-24','4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a,9b2f3452-1a46-4e0d-8d49-0e6e9d4f8ec9',0,NULL),('$2b$10$qcDfrq8eaILRn1Xz4F8CA.jhozTzi3sBQ8Ik/ZmHyDtrSPDl/3io2','Noelia','Sanchez Gonzalez','Femenino','nosango03@gmail.com','$2a$10$ZktUXcYFJKLnLHn1QSkm5exBI.oWXq.AifYpVngfjnnNZ7IAglXy.','644140430','2001-05-24','4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a',0,'');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'smartfamily'
--

--
-- Dumping routines for database 'smartfamily'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17 12:52:15
