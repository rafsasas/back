-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_instuicao_estrangeira" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" TEXT,
    "logradouro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "complemento" TEXT
);
INSERT INTO "new_instuicao_estrangeira" ("cep", "complemento", "estado", "id", "logradouro", "municipio", "nome", "pais", "sigla") SELECT "cep", "complemento", "estado", "id", "logradouro", "municipio", "nome", "pais", "sigla" FROM "instuicao_estrangeira";
DROP TABLE "instuicao_estrangeira";
ALTER TABLE "new_instuicao_estrangeira" RENAME TO "instuicao_estrangeira";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
