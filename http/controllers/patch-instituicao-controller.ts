import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { PrismaInstituicaoBrasileiraRepository } from "../../repositories/instituicao-brasileira-repositories/prisma-instituicao-brasileira-repository";
import { PrismaInstituicaoEstrangeiraRepository } from "../../repositories/instituicao-estrangeira-repositories/prisma-instituicao-estrangeira-repository";
import { PostInstituicaoUseCase } from "../../use-cases/post-instituicao";
import { PatchInstituicaoUseCase } from "../../use-cases/patch-instituicao";

export async function patchInstituicoes(req: Request, res: Response, next: NextFunction) {
  const updateBodySchema = z.object({
    nome: z.string().optional(),
    sigla: z.string().optional(),
    cnpj: z.string().optional(),
    cep: z.string().optional(),
    logradouro: z.string().optional(),
    bairro: z.string().optional(),
    estado: z.string().optional(),
    municipio: z.string().optional(),
    complemento: z.string().optional(),
    numero: z.number().optional(),
    pais: z.string().optional(),
    situacao: z.enum(["ATIVADA", "INATIVADA"]).optional()
  });

  const patchParamsSchema = z.object({
    id: z.string().uuid()
  });

  try {
    const { id } = patchParamsSchema.parse(req.params);
    const { nome, sigla, cnpj, cep, logradouro, bairro, estado, municipio, complemento, numero, pais, situacao } = updateBodySchema.parse(req.body);

    const prismaInstituicaoEstrangeiraRepository = new PrismaInstituicaoEstrangeiraRepository();
    const prismaInstituicaoBrasileriaRepository = new PrismaInstituicaoBrasileiraRepository();
    const patchInstituicoesUseCase = new PatchInstituicaoUseCase(prismaInstituicaoBrasileriaRepository, prismaInstituicaoEstrangeiraRepository);

    await patchInstituicoesUseCase.execute({
      id,
      nome,
      sigla,
      pais,
      cnpj,
      cep,
      logradouro,
      bairro,
      estado,
      municipio,
      complemento,
      numero,
      situacao
    });

    return res.status(200).send({ message: "Instituição Atualizada com sucesso!" });
  } catch (err) {
    next(err);
  }
}
