/*
  Warnings:

  - You are about to alter the column `numero` on the `instituicao_brasileira` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_instituicao_brasileira" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "complemento" TEXT,
    "situacao" TEXT NOT NULL DEFAULT 'ATIVADO'
);
INSERT INTO "new_instituicao_brasileira" ("bairro", "cep", "cnpj", "complemento", "estado", "id", "logradouro", "municipio", "nome", "numero", "pais", "sigla", "situacao") SELECT "bairro", "cep", "cnpj", "complemento", "estado", "id", "logradouro", "municipio", "nome", "numero", "pais", "sigla", "situacao" FROM "instituicao_brasileira";
DROP TABLE "instituicao_brasileira";
ALTER TABLE "new_instituicao_brasileira" RENAME TO "instituicao_brasileira";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
