-- CreateTable
CREATE TABLE "instituicao_brasileira" (
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
    "complemento" TEXT
);

-- CreateTable
CREATE TABLE "instuicao_estrangeira" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "complemento" TEXT
);
