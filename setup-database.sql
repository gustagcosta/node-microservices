CREATE SCHEMA `microservices` ;

CREATE TABLE `candidates` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `github_link` varchar(255) NOT NULL,
  `linkedin_link` varchar(255) NOT NULL,
  `application_status` enum('processing','accepted','denied') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci