import { NextFunction, Request, Response } from "express";
import { PrismaInstituicaoBrasileiraRepository } from "../../repositories/instituicao-brasileira-repositories/prisma-instituicao-brasileira-repository";
import { PrismaInstituicaoEstrangeiraRepository } from "../../repositories/instituicao-estrangeira-repositories/prisma-instituicao-estrangeira-repository";
import { GetInstituicaoUseCase } from "../../use-cases/get-instituicoes";

export async function getInstituicoes(req: Request, res: Response, next: NextFunction) {
  try {
    const prismaInstituicaoEstrangeiraRepository = new PrismaInstituicaoEstrangeiraRepository();
    const prismaInstituicaoBrasileriaRepository = new PrismaInstituicaoBrasileiraRepository();
    const getInstituicoesUseCase = new GetInstituicaoUseCase(prismaInstituicaoBrasileriaRepository, prismaInstituicaoEstrangeiraRepository);

    const instituicoes = await getInstituicoesUseCase.execute();

    return res.status(200).send(instituicoes);
  } catch (err) {
    next(err);
  }
}
