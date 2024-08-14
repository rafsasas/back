import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { PrismaInstituicaoBrasileiraRepository } from "../../repositories/instituicao-brasileira-repositories/prisma-instituicao-brasileira-repository";
import { PrismaInstituicaoEstrangeiraRepository } from "../../repositories/instituicao-estrangeira-repositories/prisma-instituicao-estrangeira-repository";
import { PostInstituicaoUseCase } from "../../use-cases/post-instituicao";

export async function postInstituicoes(req: Request, res: Response, next: NextFunction) {
  const updateBodySchema = z.object({
    nome: z.string(),
    sigla: z.string(),
    cnpj: z.string().optional(),
    cep: z.string(),
    logradouro: z.string(),
    bairro: z.string().optional(),
    estado: z.string(),
    municipio: z.string(),
    complemento: z.string().optional(),
    numero: z.number().optional(),
    pais: z.string()
  });

  try {
    const { nome, sigla, cnpj, cep, logradouro, bairro, estado, municipio, complemento, numero, pais } = updateBodySchema.parse(req.body);

    const prismaInstituicaoEstrangeiraRepository = new PrismaInstituicaoEstrangeiraRepository();
    const prismaInstituicaoBrasileriaRepository = new PrismaInstituicaoBrasileiraRepository();
    const postInstituicoesUseCase = new PostInstituicaoUseCase(prismaInstituicaoBrasileriaRepository, prismaInstituicaoEstrangeiraRepository);

    await postInstituicoesUseCase.execute({
      pais,
      nome,
      sigla,
      cnpj,
      cep,
      logradouro,
      bairro,
      estado,
      municipio,
      complemento,
      numero
    });

    return res.status(200).send({ message: "Instituição Criada com sucesso!" });
  } catch (err) {
    next(err);
  }
}
