-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18-Nov-2021 às 02:16
-- Versão do servidor: 10.4.21-MariaDB
-- versão do PHP: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `laravel`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `checklists`
--

CREATE TABLE `checklists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_default_checklist` int(11) NOT NULL,
  `id_checklist` int(11) DEFAULT NULL,
  `file_name` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `points` double(8,2) NOT NULL,
  `value` double(8,2) DEFAULT NULL,
  `id_client` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `observation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cnpj` char(18) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `neighboorhood` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cep` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responsible_general_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `responsible_general_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `technical_manager_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `technical_manager_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `financial_officer_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `financial_officer_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_monitoring_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_monitoring_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `clients`
--

INSERT INTO `clients` (`id`, `name`, `cnpj`, `street`, `number`, `neighboorhood`, `state`, `cep`, `responsible_general_name`, `responsible_general_phone`, `technical_manager_name`, `technical_manager_phone`, `financial_officer_name`, `financial_officer_phone`, `contact_monitoring_name`, `contact_monitoring_phone`, `created_at`, `updated_at`) VALUES
(5, 'teste', '75.822.808/0001-53', 'Rua Raul Seixas', '114', 'Vila Roseira II', '08466-010', NULL, 'teste', '(11)11111-1111', 'sdfaaaaaaaaaaaaaaaaa', '(55)55555-5555', 'sdfaaaaaaaaaaaaaaaaaaa', '(99)99999-9999', 'asddddaaaaaaaaaaaaaaaaaa', '(44)44444-4444', '2021-10-27 11:45:37', '2021-10-27 11:45:37'),
(6, 'Mauricio', '26.841.808/0001-95', NULL, NULL, NULL, NULL, NULL, 'Neymar', '(11)22222-2222', 'Messi', '(55)99999-9999', 'Calleri', '(99)22222-2222', 'Ronaldo', '(66)66666-6666', '2021-10-27 11:46:28', '2021-10-27 12:35:06'),
(7, 'Messi', '87.965.560/0001-69', 'Rua Raul Seixas', '114', 'Vila Roseira II', 'São Paulo', '08466-010', 'Messi', '(11)11111-1111', 'sdfaaaaaaaaaaaaaaaaa', '(55)55555-5555', 'sdfaaaaaaaaaaaaaaaaaaa', '(99)99999-9999', 'asddddaaaaaaaaaaaaaaaaaa', '(66)66666-6666', '2021-11-15 19:46:51', '2021-11-15 19:46:51');

-- --------------------------------------------------------

--
-- Estrutura da tabela `default_checklists`
--

CREATE TABLE `default_checklists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idDefaultChecklist` int(11) DEFAULT 0,
  `percentage` float NOT NULL,
  `points` float NOT NULL,
  `observation` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_type_checklist` int(11) DEFAULT NULL COMMENT '1 - UPLOAD;\r\n2 -TEXT;\r\n3- CHECKBOX;\r\n4- TRUE OU FALSE;\r\n5-NÙMERICO;\r\n6-DATA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `default_checklists`
--

INSERT INTO `default_checklists` (`id`, `name`, `idDefaultChecklist`, `percentage`, `points`, `observation`, `created_at`, `updated_at`, `id_type_checklist`) VALUES
(3, 'checklistnova4', NULL, 100, 600, '', '2021-11-11 13:12:40', '2021-11-11 13:12:40', 0),
(4, 'dupla escolha', 3, 100, 600, '', '2021-11-11 13:12:40', '2021-11-11 13:12:40', 4),
(28, 'checklist definitiva', NULL, 100, 1000, 'definitiva', '2021-11-12 18:15:57', '2021-11-12 18:15:57', 0),
(29, 'texto', 28, 25, 250, '', '2021-11-12 18:15:57', '2021-11-12 18:15:57', 1),
(30, 'foto', 28, 25, 250, '', '2021-11-12 18:15:57', '2021-11-12 18:15:57', 2),
(31, 'multiplas escolha', 28, 25, 250, '', '2021-11-12 18:15:57', '2021-11-12 18:15:57', 3),
(32, 'dupla escolha', 28, 25, 250, '', '2021-11-12 18:15:57', '2021-11-12 18:15:57', 4),
(33, 'teste', NULL, 100, 400, '', '2021-11-12 19:10:55', '2021-11-12 19:10:55', 0),
(34, 'texto', 33, 100, 400, '', '2021-11-12 19:10:55', '2021-11-12 19:10:55', 1),
(35, 'opção do texto', 34, 100, 400, '', '2021-11-12 19:10:55', '2021-11-12 19:10:55', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `default_checklist_options`
--

CREATE TABLE `default_checklist_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idDefaultChecklist` int(10) UNSIGNED DEFAULT 0,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `points` float NOT NULL DEFAULT 0,
  `percentage` float NOT NULL DEFAULT 0,
  `selected` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `default_checklist_options`
--

INSERT INTO `default_checklist_options` (`id`, `idDefaultChecklist`, `name`, `points`, `percentage`, `selected`, `created_at`, `updated_at`) VALUES
(3, 4, 'Sim', 600, 50, 1, '2021-11-11 13:12:40', '2021-11-11 13:12:40'),
(4, 4, 'Não', 0, 50, 0, '2021-11-11 13:12:40', '2021-11-11 13:12:40'),
(5, 31, 'opção 1', 166.665, 50, 0, '2021-11-12 18:15:57', '2021-11-12 18:15:57'),
(6, 31, 'opção 2', 166.665, 50, 0, '2021-11-12 18:15:57', '2021-11-12 18:15:57'),
(7, 32, 'Sim', 250, 50, 1, '2021-11-12 18:15:57', '2021-11-12 18:15:57'),
(8, 32, 'Não', 0, 50, 0, '2021-11-12 18:15:57', '2021-11-12 18:15:57');

-- --------------------------------------------------------

--
-- Estrutura da tabela `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(4, '2014_10_12_000000_create_users_table', 1),
(5, '2014_10_12_100000_create_password_resets_table', 1),
(6, '2019_08_19_000000_create_failed_jobs_table', 1),
(7, '2021_10_23_164209_create_all_table', 1),
(8, '2021_10_23_171712_add_permission_table_users', 1);

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
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_checklist` int(11) NOT NULL,
  `file_name` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_points` double(8,2) NOT NULL,
  `value` int(11) NOT NULL,
  `observation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `subchecklist_itens`
--

CREATE TABLE `subchecklist_itens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_subchecklist` int(11) NOT NULL,
  `id_default_subchecklist_itens` int(11) NOT NULL,
  `file_name` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `points` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `type_checklist`
--

CREATE TABLE `type_checklist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission` int(11) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `permission`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Mauricio', 'mauricio-ferreira2015@outlook.com', NULL, '$2y$10$NtXr6Wj.HqzDFFpwV/0CBuzItRzG0l4f8ux4khrAozRs6GSO6X2ge', 1, NULL, '2021-10-26 20:26:23', '2021-10-26 20:26:24'),
(3, 'Mauricio Ferreira Editado', 'mauriciolinkinpark2015@gmail.com', NULL, '$2y$10$y7nUGztHxd6/QaPK4rWhFO.MDGLF/Sp/bz3/ocJMPjiaUJBhcHrxq', 1, NULL, '2021-10-25 20:11:41', '2021-10-25 23:32:51'),
(7, 'teste', 'admin@admin.com', NULL, '$2y$10$NtXr6Wj.HqzDFFpwV/0CBuzItRzG0l4f8ux4khrAozRs6GSO6X2ge', 2, NULL, '2021-10-26 13:18:00', '2021-10-26 13:18:00');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `checklists`
--
ALTER TABLE `checklists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `checklists_id_unique` (`id`);

--
-- Índices para tabela `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clients_id_unique` (`id`);

--
-- Índices para tabela `default_checklists`
--
ALTER TABLE `default_checklists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `default_checklists_id_unique` (`id`);

--
-- Índices para tabela `default_checklist_options`
--
ALTER TABLE `default_checklist_options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `default_subchecklist_itens_id_unique` (`id`);

--
-- Índices para tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Índices para tabela `migrations`
--
ALTER TABLE `migrations`
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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subchecklist_id_unique` (`id`);

--
-- Índices para tabela `subchecklist_itens`
--
ALTER TABLE `subchecklist_itens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subchecklist_itens_id_unique` (`id`);

--
-- Índices para tabela `type_checklist`
--
ALTER TABLE `type_checklist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_checklist_id_unique` (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `checklists`
--
ALTER TABLE `checklists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `default_checklists`
--
ALTER TABLE `default_checklists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `default_checklist_options`
--
ALTER TABLE `default_checklist_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `subchecklist`
--
ALTER TABLE `subchecklist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `subchecklist_itens`
--
ALTER TABLE `subchecklist_itens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `type_checklist`
--
ALTER TABLE `type_checklist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
