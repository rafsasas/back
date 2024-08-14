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
INSERT INTO "new_instituicao_brasileira" ("bairro", "cep", "cnpj", "complemento", "estado", "id", "logradouro", "municipio", "nome", "numero", "pais", "sigla") SELECT "bairro", "cep", "cnpj", "complemento", "estado", "id", "logradouro", "municipio", "nome", "numero", "pais", "sigla" FROM "instituicao_brasileira";
DROP TABLE "instituicao_brasileira";
ALTER TABLE "new_instituicao_brasileira" RENAME TO "instituicao_brasileira";
CREATE TABLE "new_instuicao_estrangeira" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" TEXT,
    "logradouro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "complemento" TEXT,
    "situacao" TEXT NOT NULL DEFAULT 'ATIVADO'
);
INSERT INTO "new_instuicao_estrangeira" ("cep", "complemento", "estado", "id", "logradouro", "municipio", "nome", "pais", "sigla") SELECT "cep", "complemento", "estado", "id", "logradouro", "municipio", "nome", "pais", "sigla" FROM "instuicao_estrangeira";
DROP TABLE "instuicao_estrangeira";
ALTER TABLE "new_instuicao_estrangeira" RENAME TO "instuicao_estrangeira";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
