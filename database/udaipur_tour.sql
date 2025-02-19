-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2024 at 10:27 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `udaipur_tour`
--

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price_per_night` decimal(5,2) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `price_per_night`, `location`) VALUES
(1, 'Taj Lake Palace', '999.99', 'Lake Pichola'),
(2, 'The Oberoi Udaivilas', '999.99', 'Lake Pichola'),
(3, 'Trident Udaipur', '999.99', 'Haridasji Ki Magri'),
(4, 'Radisson Blu Udaipur Palace Resort & Spa', '999.99', 'Fateh Sagar Lake'),
(5, 'Jagat Niwas Palace Hotel', '999.99', 'Near Lake Pichola'),
(6, 'Hotel Hilltop Palace', '999.99', 'Fateh Sagar Lake'),
(7, 'Hotel Udai Kothi', '999.99', 'Near Lake Pichola'),
(8, 'Hotel Lake Pichola', '999.99', 'Lake Pichola'),
(9, 'Treebo Trend Jheel Mahal', '999.99', 'Lal Ghat'),
(10, 'Shiv Niwas Palace', '999.99', 'City Palace Complex');

-- --------------------------------------------------------

--
-- Table structure for table `itinerary`
--

CREATE TABLE `itinerary` (
  `id` int(11) NOT NULL,
  `days` int(11) DEFAULT NULL,
  `budget` decimal(10,2) DEFAULT NULL,
  `persons` int(11) DEFAULT NULL,
  `preferences` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `distance_km` decimal(5,2) DEFAULT NULL,
  `ticket_price` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `places`
--

INSERT INTO `places` (`id`, `name`, `description`, `distance_km`, `ticket_price`) VALUES
(1, 'City Palace', 'A magnificent palace overlooking Lake Pichola.', '1.20', '300.00'),
(2, 'Lake Pichola', 'A serene lake with boat rides and beautiful views.', '0.50', '200.00'),
(3, 'Jagdish Temple', 'A large Hindu temple dedicated to Lord Vishnu.', '1.00', '50.00'),
(4, 'Saheliyon Ki Bari', 'A beautiful garden with fountains and lotus pools.', '3.50', '50.00'),
(5, 'Bagore Ki Haveli', 'A historic haveli with a museum and evening cultural shows.', '1.50', '250.00'),
(6, 'Fateh Sagar Lake', 'A scenic artificial lake with a park and food stalls.', '4.00', '100.00'),
(7, 'Monsoon Palace', 'A hilltop palace offering panoramic views of the city.', '10.00', '80.00'),
(8, 'Shilpgram', 'A rural arts and crafts complex with cultural exhibits.', '5.00', '30.00'),
(9, 'Karni Mata Temple', 'A temple with a ropeway offering beautiful city views.', '2.00', '100.00'),
(10, 'Vintage Car Museum', 'A museum displaying vintage cars used by the royal family.', '2.50', '350.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itinerary`
--
ALTER TABLE `itinerary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `itinerary`
--
ALTER TABLE `itinerary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
