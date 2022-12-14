-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2022 at 11:38 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` int(11) DEFAULT NULL,
  `pass` varchar(400) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `name`, `last_name`, `email`, `contact`, `pass`, `address1`, `address2`, `city`, `state`, `pincode`, `added_date`) VALUES
(5, 'test3', '', 'asdf@gmail.com', 0, '', '', '', '', 'mumbai', '555555', '2022-10-11 12:10:39'),
(6, 'test2', '', '', 0, '', '', '', '', '', '', '2022-10-11 12:38:37');

-- --------------------------------------------------------

--
-- Table structure for table `candidate_project`
--

CREATE TABLE `candidate_project` (
  `id` int(11) NOT NULL,
  `cand_id` int(11) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `website` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `still_work` enum('0','1') NOT NULL,
  `resume` varchar(200) NOT NULL,
  `project_desc` varchar(300) NOT NULL,
  `add_teammate` varchar(100) NOT NULL,
  `skill` varchar(200) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidate_project`
--

INSERT INTO `candidate_project` (`id`, `cand_id`, `project_name`, `website`, `role`, `start_date`, `end_date`, `still_work`, `resume`, `project_desc`, `add_teammate`, `skill`, `added_date`) VALUES
(74, 5, 'asdf', '', '', '0000-00-00', '0000-00-00', '', '', '<p>asdf</p>\n', '', '', '2022-10-12 07:28:51');

-- --------------------------------------------------------

--
-- Table structure for table `resume_candidate`
--

CREATE TABLE `resume_candidate` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `resume_name` varchar(200) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `resume_candidate`
--

INSERT INTO `resume_candidate` (`id`, `project_id`, `candidate_id`, `resume_name`, `added_date`) VALUES
(3, 74, 5, 'aa093632.pdf', '2022-10-12 09:38:04'),
(4, 74, 5, 'aa113359.pdf', '2022-10-12 09:38:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidate_project`
--
ALTER TABLE `candidate_project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resume_candidate`
--
ALTER TABLE `resume_candidate`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `candidate_project`
--
ALTER TABLE `candidate_project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `resume_candidate`
--
ALTER TABLE `resume_candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
