/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_luu` date DEFAULT NULL,
  `luu_anh_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`luu_anh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `refresh_token` text,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1, 1, 1, '2024-08-01', 'Binh luan 1');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 2, 2, '2024-08-02', 'Binh luan 2');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(4, 4, 4, '2024-08-04', 'Binh luan 4');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(5, 5, 5, '2024-08-05', 'Binh luan 5'),
(6, 6, 6, '2024-08-06', 'Binh luan 6'),
(7, 7, 7, '2024-08-07', 'Binh luan 7'),
(8, 8, 8, '2024-08-08', 'Binh luan 8'),
(9, 9, 9, '2024-08-09', 'Binh luan 9'),
(10, 10, 10, '2024-08-10', 'Binh luan 10');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'Hinh 1', 'hinh1.jpg', 'Mo ta hinh 1', 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, 'Hinh 2', 'hinh2.jpg', 'Mo ta hinh 2', 2);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, 'Hinh 4', 'hinh4.jpg', 'Mo ta hinh 4', 4);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(5, 'Hinh 5', 'hinh5.jpg', 'Mo ta hinh 5', 11),
(6, 'Hinh 6', 'hinh6.jpg', 'Mo ta hinh 6', 6),
(7, 'Hinh 7', 'hinh7.jpg', 'Mo ta hinh 7', 7),
(8, 'Hinh 8', 'hinh8.jpg', 'Mo ta hinh 8', 11),
(9, 'Hinh 9', 'hinh9.jpg', 'Mo ta hinh 9', 11),
(10, 'Hinh 10', 'hinh10.jpg', 'Mo ta hinh 10', 11),
(11, 'logo', '1725944426283_reactlogo.png', 'nice', 11),
(12, 'logo', '1725944460696_reactlogo.png', 'nice', 11);

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`, `luu_anh_id`) VALUES
(1, 1, '2024-08-11', 1);
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`, `luu_anh_id`) VALUES
(11, 2, '2024-08-12', 2);
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`, `luu_anh_id`) VALUES
(4, 4, '2024-08-14', 4);
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`, `luu_anh_id`) VALUES
(11, 5, '2024-08-15', 5),
(6, 6, '2024-08-16', 6),
(11, 7, '2024-08-17', 7),
(8, 8, '2024-08-18', 8),
(11, 9, '2024-08-19', 9),
(10, 10, '2024-08-20', 10);

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(1, 'user1@example.com', 'password1', 'Nguyen Van A', 25, 'avatar1.jpg', NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(2, 'user2@example.com', 'password2', 'Tran Thi B', 30, 'avatar2.jpg', NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(3, 'user3@example.com', 'password3', 'Le Van C', 28, 'avatar3.jpg', NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `refresh_token`) VALUES
(4, 'user4@example.com', 'password4', 'Pham Thi D', 22, 'avatar4.jpg', NULL),
(5, 'user5@example.com', 'password5', 'Hoang Van E', 35, 'avatar5.jpg', NULL),
(6, 'user6@example.com', 'password6', 'Do Thi F', 27, 'avatar6.jpg', NULL),
(7, 'user7@example.com', 'password7', 'Nguyen Van G', 31, 'avatar7.jpg', NULL),
(8, 'user8@example.com', 'password8', 'Tran Thi H', 29, 'avatar8.jpg', NULL),
(9, 'user9@example.com', 'password9', 'Le Van I', 24, 'avatar9.jpg', NULL),
(10, 'user10@example.com', 'password10', 'Pham Thi K', 26, 'avatar10.jpg', NULL),
(11, 'deadpool@gmail.com', '$2b$10$ZY/FIy.pRbXqzWuXvjJXYuNFJTvKTuU89jj4w33qvzATGHZCS43vu', 'Wade Wilson', 40, '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5ndW9pRHVuZ0lkIjoxMSwiaG9UZW4iOiJXYWRlIFdpbHNvbiIsImtleSI6MTcyNTk0NDExMTA5OH0sImlhdCI6MTcyNTk0NDExMSwiZXhwIjoxNzI2NTQ4OTExfQ.GqxwRcwOpaW8AZS6x2nII4BeCa3BzoM8OcIR4YWxukM');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;