-- CreateTable
CREATE TABLE `campeonatos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `divisao` VARCHAR(255) NOT NULL,
    `ano` INTEGER NOT NULL,
    `data_inicio` DATE NOT NULL,
    `data_fim` DATE NOT NULL,
    `status` ENUM('rascunho', 'configurado', 'em_andamento', 'finalizado') NOT NULL DEFAULT 'rascunho',
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuracoes_campeonato` (
    `id` VARCHAR(191) NOT NULL,
    `campeonato_id` VARCHAR(191) NOT NULL,
    `quantidade_times` INTEGER NOT NULL,
    `quantidade_rodadas` INTEGER NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    UNIQUE INDEX `configuracoes_campeonato_campeonato_id_key`(`campeonato_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estadios` (
    `id` VARCHAR(191) NOT NULL,
    `nome_oficial` VARCHAR(100) NULL,
    `nome_popular` VARCHAR(60) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `palpites_classificacao` (
    `id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `campeonato_id` VARCHAR(191) NOT NULL,
    `time_id` VARCHAR(191) NOT NULL,
    `posicao` INTEGER NOT NULL,
    `pontos_gerados` INTEGER NOT NULL DEFAULT 0,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    UNIQUE INDEX `palpites_classificacao_usuario_id_campeonato_id_posicao_key`(`usuario_id`, `campeonato_id`, `posicao`),
    UNIQUE INDEX `palpites_classificacao_usuario_id_campeonato_id_time_id_key`(`usuario_id`, `campeonato_id`, `time_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `palpites_partida` (
    `id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `partida_id` VARCHAR(191) NOT NULL,
    `gol_mandante` INTEGER NOT NULL,
    `gol_visitante` INTEGER NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    UNIQUE INDEX `palpites_partida_usuario_id_partida_id_key`(`usuario_id`, `partida_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partidas` (
    `id` VARCHAR(191) NOT NULL,
    `rodada_id` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `estadio_id` VARCHAR(191) NULL,
    `time_mandante_id` VARCHAR(191) NOT NULL,
    `gol_mandante` INTEGER NOT NULL DEFAULT 0,
    `time_visitante_id` VARCHAR(191) NOT NULL,
    `gol_visitante` INTEGER NOT NULL DEFAULT 0,
    `finalizado` BOOLEAN NOT NULL DEFAULT false,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regras_pontuacao` (
    `id` VARCHAR(191) NOT NULL,
    `campeonato_id` VARCHAR(191) NOT NULL,
    `acerto_empate_exato` INTEGER NOT NULL DEFAULT 5,
    `acerto_empate` INTEGER NOT NULL DEFAULT 2,
    `acerto_placar` INTEGER NOT NULL DEFAULT 4,
    `acerto_vencedor` INTEGER NOT NULL DEFAULT 1,
    `acerto_gol` INTEGER NOT NULL DEFAULT 1,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    UNIQUE INDEX `regras_pontuacao_campeonato_id_key`(`campeonato_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rodadas` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(30) NOT NULL,
    `numero` INTEGER NOT NULL,
    `campeonato_id` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    UNIQUE INDEX `rodadas_campeonato_id_numero_key`(`campeonato_id`, `numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `times` (
    `id` VARCHAR(191) NOT NULL,
    `nome_oficial` VARCHAR(100) NULL,
    `nome_popular` VARCHAR(60) NOT NULL,
    `sigla` VARCHAR(3) NOT NULL,
    `escudo` VARCHAR(255) NOT NULL,
    `estadio_id` VARCHAR(191) NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `times_campeonato` (
    `id` VARCHAR(191) NOT NULL,
    `campeonato_id` VARCHAR(191) NOT NULL,
    `time_id` VARCHAR(191) NOT NULL,
    `ponto` INTEGER NOT NULL DEFAULT 0,
    `partida` INTEGER NOT NULL DEFAULT 0,
    `vitoria` INTEGER NOT NULL DEFAULT 0,
    `derrota` INTEGER NOT NULL DEFAULT 0,
    `empate` INTEGER NOT NULL DEFAULT 0,
    `gol_proprio` INTEGER NOT NULL DEFAULT 0,
    `gol_sofrido` INTEGER NOT NULL DEFAULT 0,
    `saldo_gol` INTEGER NOT NULL DEFAULT 0,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criado_por_id` VARCHAR(191) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,
    `atualizado_por_id` VARCHAR(191) NULL,

    UNIQUE INDEX `times_campeonato_campeonato_id_time_id_key`(`campeonato_id`, `time_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens_recuperacao` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expira_em` DATETIME(3) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuario_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tokens_recuperacao_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `papel` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `campeonatos` ADD CONSTRAINT `campeonatos_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campeonatos` ADD CONSTRAINT `campeonatos_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuracoes_campeonato` ADD CONSTRAINT `configuracoes_campeonato_campeonato_id_fkey` FOREIGN KEY (`campeonato_id`) REFERENCES `campeonatos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuracoes_campeonato` ADD CONSTRAINT `configuracoes_campeonato_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuracoes_campeonato` ADD CONSTRAINT `configuracoes_campeonato_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estadios` ADD CONSTRAINT `estadios_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estadios` ADD CONSTRAINT `estadios_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palpites_classificacao` ADD CONSTRAINT `palpites_classificacao_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palpites_classificacao` ADD CONSTRAINT `palpites_classificacao_campeonato_id_fkey` FOREIGN KEY (`campeonato_id`) REFERENCES `campeonatos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palpites_classificacao` ADD CONSTRAINT `palpites_classificacao_time_id_fkey` FOREIGN KEY (`time_id`) REFERENCES `times`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palpites_classificacao` ADD CONSTRAINT `palpites_classificacao_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palpites_classificacao` ADD CONSTRAINT `palpites_classificacao_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palpites_partida` ADD CONSTRAINT `palpites_partida_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palpites_partida` ADD CONSTRAINT `palpites_partida_partida_id_fkey` FOREIGN KEY (`partida_id`) REFERENCES `partidas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palpites_partida` ADD CONSTRAINT `palpites_partida_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `palpites_partida` ADD CONSTRAINT `palpites_partida_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partidas` ADD CONSTRAINT `partidas_rodada_id_fkey` FOREIGN KEY (`rodada_id`) REFERENCES `rodadas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partidas` ADD CONSTRAINT `partidas_estadio_id_fkey` FOREIGN KEY (`estadio_id`) REFERENCES `estadios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partidas` ADD CONSTRAINT `partidas_time_mandante_id_fkey` FOREIGN KEY (`time_mandante_id`) REFERENCES `times`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partidas` ADD CONSTRAINT `partidas_time_visitante_id_fkey` FOREIGN KEY (`time_visitante_id`) REFERENCES `times`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partidas` ADD CONSTRAINT `partidas_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partidas` ADD CONSTRAINT `partidas_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `regras_pontuacao` ADD CONSTRAINT `regras_pontuacao_campeonato_id_fkey` FOREIGN KEY (`campeonato_id`) REFERENCES `campeonatos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `regras_pontuacao` ADD CONSTRAINT `regras_pontuacao_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `regras_pontuacao` ADD CONSTRAINT `regras_pontuacao_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rodadas` ADD CONSTRAINT `rodadas_campeonato_id_fkey` FOREIGN KEY (`campeonato_id`) REFERENCES `campeonatos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rodadas` ADD CONSTRAINT `rodadas_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rodadas` ADD CONSTRAINT `rodadas_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `times` ADD CONSTRAINT `times_estadio_id_fkey` FOREIGN KEY (`estadio_id`) REFERENCES `estadios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `times` ADD CONSTRAINT `times_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `times` ADD CONSTRAINT `times_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `times_campeonato` ADD CONSTRAINT `times_campeonato_campeonato_id_fkey` FOREIGN KEY (`campeonato_id`) REFERENCES `campeonatos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `times_campeonato` ADD CONSTRAINT `times_campeonato_time_id_fkey` FOREIGN KEY (`time_id`) REFERENCES `times`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `times_campeonato` ADD CONSTRAINT `times_campeonato_criado_por_id_fkey` FOREIGN KEY (`criado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `times_campeonato` ADD CONSTRAINT `times_campeonato_atualizado_por_id_fkey` FOREIGN KEY (`atualizado_por_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens_recuperacao` ADD CONSTRAINT `tokens_recuperacao_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
