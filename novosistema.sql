-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22-Out-2021 às 01:08
-- Versão do servidor: 10.4.21-MariaDB
-- versão do PHP: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `novosistema`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `checklists`
--

CREATE TABLE `checklists` (
  `id` int(11) NOT NULL,
  `id_default_checklist` int(11) NOT NULL DEFAULT 0,
  `file_name` varchar(250) DEFAULT '0',
  `total_points` float NOT NULL DEFAULT 0,
  `id_client` int(11) NOT NULL DEFAULT 0,
  `id_user` int(11) NOT NULL DEFAULT 0,
  `registerDate` date NOT NULL,
  `registerTime` time NOT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cnpj` char(18) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `neighboorhood` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responsible_general_name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `responsible_general_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `technical_manager_name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `technical_manager` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `financial_officer` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `financial_officer_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_monitoring_name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registerDate` date NOT NULL,
  `registerTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `default_checklists`
--

CREATE TABLE `default_checklists` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `registerDate` date NOT NULL,
  `registerTime` time NOT NULL,
  `id_type_checklist` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `default_subchecklists`
--

CREATE TABLE `default_subchecklists` (
  `id` int(11) NOT NULL,
  `id_default_checklist` int(11) NOT NULL DEFAULT 0,
  `name` varchar(150) NOT NULL DEFAULT '0',
  `type_subchecklist` int(11) NOT NULL DEFAULT 0 COMMENT '1 - UPLOAD;'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `default_subchecklist_itens`
--

CREATE TABLE `default_subchecklist_itens` (
  `id` int(11) NOT NULL,
  `id_default_subchecklist` int(11) NOT NULL DEFAULT 0,
  `name` varchar(250) NOT NULL DEFAULT '0',
  `type_subchecklist_item` int(11) NOT NULL COMMENT '1 - UPLOAD;'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `subchecklist`
--

CREATE TABLE `subchecklist` (
  `id` int(11) NOT NULL,
  `id_checklist` int(11) NOT NULL DEFAULT 0,
  `id_default_checklist` int(11) NOT NULL DEFAULT 0,
  `file_name` varchar(250) NOT NULL DEFAULT '0',
  `value` int(11) NOT NULL DEFAULT 0,
  `total_points` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `subchecklist_itens`
--

CREATE TABLE `subchecklist_itens` (
  `id` int(11) NOT NULL,
  `id_subchecklist` int(11) NOT NULL DEFAULT 0,
  `id_default_subchecklist_itens` int(11) NOT NULL DEFAULT 0,
  `file_name` varchar(250) NOT NULL DEFAULT '0',
  `points` varchar(250) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `type_checklist`
--

CREATE TABLE `type_checklist` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(350) NOT NULL,
  `email_verified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `password` varchar(250) NOT NULL DEFAULT '',
  `remember_token` varchar(100) DEFAULT '',
  `registerDate` date NOT NULL,
  `registerTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `checklists`
--
ALTER TABLE `checklists`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Índices para tabela `default_checklists`
--
ALTER TABLE `default_checklists`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `default_subchecklists`
--
ALTER TABLE `default_subchecklists`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `default_subchecklist_itens`
--
ALTER TABLE `default_subchecklist_itens`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Índices para tabela `subchecklist`
--
ALTER TABLE `subchecklist`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `subchecklist_itens`
--
ALTER TABLE `subchecklist_itens`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `type_checklist`
--
ALTER TABLE `type_checklist`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `checklists`
--
ALTER TABLE `checklists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `default_checklists`
--
ALTER TABLE `default_checklists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `default_subchecklists`
--
ALTER TABLE `default_subchecklists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `default_subchecklist_itens`
--
ALTER TABLE `default_subchecklist_itens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `subchecklist`
--
ALTER TABLE `subchecklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `subchecklist_itens`
--
ALTER TABLE `subchecklist_itens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `type_checklist`
--
ALTER TABLE `type_checklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
