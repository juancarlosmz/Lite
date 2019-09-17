-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2019 at 12:06 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ihm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Apellido` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `contra` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `rol` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE `ImportList` (
  `id` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `ImportList` VARCHAR(21000) COLLATE utf8_spanish2_ci NOT NULL,
  `status` int(2) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE `AllSKUs` (
  `id` int(11),
  `sku` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `warehouse` varchar(10) COLLATE utf8_spanish2_ci,
  `idcategoria` int(5) NOT NULL,
  `status` int(1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE `tokentable` (
  `id` int(11),
  `compare` int(11) NOT NULL,
  `tokenserial` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE `product` (
  `sku` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `encrypted_sku` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `title` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `original_img` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `cat_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `size` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `warehouse` varchar(2000) COLLATE utf8_spanish2_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `ImportList`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `AllSKUs`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tokentable`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `product`
  ADD PRIMARY KEY (`sku`);

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


ALTER TABLE `ImportList`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


ALTER TABLE `AllSKUs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `tokentable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;





INSERT INTO `user` (`id`, `Nombre`, `Apellido`, `email`, `contra`, `rol`) VALUES
(2, 'admin', 'admin', 'admin@gmail.com', '123456', 1);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



/*user BD Godaddy
user ->apolo
passwors -> apolomultimedia

*/
/*BASE DE DATOS
bdwoosource
 
*/
/*BASE DE DATOS hostgator
BD -> apolo_bdwoosource

user -> apolo
passwors -> apolomultimedia
 
*/

/*SSH ACCESS PANEL
KeyName -> cPanelSSHAccess
KeyPassword -> apolomultimedia
*/


/*user BD SERVER APOLO
user ->apolo20
passwors -> apolomultimedia
