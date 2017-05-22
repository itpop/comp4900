-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 3, 2017 at 08:16 PM
-- Server version: 5.5.51-38.2
-- PHP Version: 5.6.20
USE playbookdatabase;
-- --------------------------------------------------------

--
-- Table structure for table `paypal_table`
--

DROP TABLE IF EXISTS `paypal_table`;
CREATE TABLE `paypal_table` (
  `id` int(11) PRIMARY KEY,
  `payer_id` varchar(60) DEFAULT NULL,
  `payment_date` varchar(50) DEFAULT NULL,
  `txn_id` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `payer_email` varchar(75) DEFAULT NULL,
  `payer_status` varchar(50) DEFAULT NULL,
  `payment_type` varchar(50) DEFAULT NULL,
  `memo` tinytext,
  `item_name` varchar(127) DEFAULT NULL,
  `item_number` varchar(127) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `mc_gross` decimal(9,2) DEFAULT NULL,
  `mc_currency` char(3) DEFAULT NULL,
  `address_name` varchar(255) NOT NULL DEFAULT '',
  `address_street` varchar(255) NOT NULL DEFAULT '',
  `address_city` varchar(255) NOT NULL DEFAULT '',
  `address_state` varchar(255) NOT NULL DEFAULT '',
  `address_zip` varchar(255) NOT NULL DEFAULT '',
  `address_country` varchar(255) NOT NULL DEFAULT '',
  `address_status` varchar(255) NOT NULL DEFAULT '',
  `payer_business_name` varchar(255) NOT NULL DEFAULT '',
  `payment_status` varchar(255) NOT NULL DEFAULT '',
  `pending_reason` varchar(255) NOT NULL DEFAULT '',
  `reason_code` varchar(255) NOT NULL DEFAULT '',
  `txn_type` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=1935 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `PlayFull`
--
DROP TABLE IF EXISTS `PlayFull`;
CREATE TABLE `PlayFull` (
  `PlayId` bigint(20) AUTO_INCREMENT PRIMARY KEY,
  `PlayName` varchar(50) NOT NULL,
  `PlayInfo` text,
  `PlayJson` longtext NOT NULL,
  `Playbook` varchar(50) NOT NULL DEFAULT 'Uncategorized',
  `ImageLocation` varchar(255),
  `CreatedBy` varchar(50) NOT NULL COMMENT 'User created by',
  `CreateDate` datetime NOT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `IsValid` char(1) DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Premium`
--
DROP TABLE IF EXISTS `Premium`;
CREATE TABLE `Premium` (
  `MemberName` varchar(80) NOT NULL,
  `PremiumFlag` tinyint(1) NOT NULL DEFAULT '0',
  `SubscriptionStartDate` date NOT NULL COMMENT 'Date subscruption starts',
  `SubscriptionLength` int(11) NOT NULL COMMENT 'Months',
  `SubscriptionCost` decimal(10,0) NOT NULL,
  `PromoCode` varchar(50) NOT NULL DEFAULT 'None'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `PromoCode`
--
DROP TABLE IF EXISTS `PromoCode`;
CREATE TABLE `PromoCode` (
  `PromoCode` varchar(50) PRIMARY KEY,
  `Active` tinyint(1) NOT NULL DEFAULT '0',
  `Description` varchar(250) DEFAULT NULL,
  `SubscriptionLength` int(11) NOT NULL,
  `WhereUsed` varchar(250) NOT NULL,
  `Expiration` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `smf_members`
--
DROP TABLE IF EXISTS `smf_members`;
CREATE TABLE `smf_members` (
  `ID_MEMBER` int AUTO_INCREMENT PRIMARY KEY,
  `memberName` varchar(80) NOT NULL DEFAULT '',
  `dateRegistered` int(10) unsigned NOT NULL DEFAULT '0',
  `posts` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ID_GROUP` smallint(5) unsigned NOT NULL DEFAULT '0',
  `lngfile` tinytext,
  `lastLogin` int(10) unsigned NOT NULL DEFAULT '0',
  `realName` tinytext,
  `instantMessages` smallint(5) NOT NULL DEFAULT '0',
  `unreadMessages` smallint(5) NOT NULL DEFAULT '0',
  `buddy_list` text,
  `pm_ignore_list` tinytext,
  `messageLabels` text,
  `passwd` varchar(64) NOT NULL DEFAULT '',
  `emailAddress` tinytext NOT NULL,
  `personalText` tinytext,
  `gender` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `birthdate` date NOT NULL DEFAULT '1990-01-01',
  `websiteTitle` tinytext,
  `websiteUrl` tinytext,
  `location` tinytext,
  `ICQ` tinytext,
  `AIM` varchar(16) NOT NULL DEFAULT '',
  `YIM` varchar(32) NOT NULL DEFAULT '',
  `MSN` tinytext,
  `hideEmail` tinyint(4) NOT NULL DEFAULT '0',
  `showOnline` tinyint(4) NOT NULL DEFAULT '1',
  `timeFormat` varchar(80) NOT NULL DEFAULT '',
  `signature` text,
  `timeOffset` float NOT NULL DEFAULT '0',
  `avatar` tinytext,
  `pm_email_notify` tinyint(4) NOT NULL DEFAULT '0',
  `karmaBad` smallint(5) unsigned NOT NULL DEFAULT '0',
  `karmaGood` smallint(5) unsigned NOT NULL DEFAULT '0',
  `usertitle` tinytext,
  `notifyAnnouncements` tinyint(4) NOT NULL DEFAULT '1',
  `notifyOnce` tinyint(4) NOT NULL DEFAULT '1',
  `notifySendBody` tinyint(4) NOT NULL DEFAULT '0',
  `notifyTypes` tinyint(4) NOT NULL DEFAULT '2',
  `memberIP` tinytext,
  `memberIP2` tinytext,
  `secretQuestion` tinytext,
  `secretAnswer` varchar(64) NOT NULL DEFAULT '',
  `ID_THEME` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `is_activated` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `validation_code` varchar(10) NOT NULL DEFAULT '',
  `ID_MSG_LAST_VISIT` int(10) unsigned NOT NULL DEFAULT '0',
  `additionalGroups` tinytext,
  `smileySet` varchar(48) NOT NULL DEFAULT '',
  `ID_POST_GROUP` smallint(5) unsigned NOT NULL DEFAULT '0',
  `totalTimeLoggedIn` int(10) unsigned NOT NULL DEFAULT '0',
  `passwordSalt` varchar(5) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Table structure for table `Contact`
--
DROP TABLE IF EXISTS `Contact`;
CREATE TABLE `Contact`(
  ContactId int AUTO_INCREMENT PRIMARY KEY, 
  ContactName varchar(30) NOT NULL, 
  Email varchar(50) NOT NULL, 
  Subject varchar(50) NOT NULL, 
  Message text NOT NULL, 
  ContactDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  IsReplied char(1) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
