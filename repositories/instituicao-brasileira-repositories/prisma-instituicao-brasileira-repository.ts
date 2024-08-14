import { InstituicaoBrasileiraRepository } from "./instituicao-brasileira-repository";
import prisma from "../../prismaclient";
import { ICreateInstituicaoBrasileira, IUpdateInstituicaoBrasileira } from "./interface";
import { instituicaoBrasileiraModel } from "../../models/instituicao-brasileira-model";

export class PrismaInstituicaoBrasileiraRepository implements InstituicaoBrasileiraRepository {
  async create(data: ICreateInstituicaoBrasileira): Promise<instituicaoBrasileiraModel> {
    const instituicaoBrasileira = await prisma.instituicao_brasileira.create({
      data: {
        nome: data.nome,
        sigla: data.sigla,
        pais: data.pais,
        cnpj: data.cnpj,
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        estado: data.estado,
        municipio: data.municipio,
        numero: data.numero,
        complemento: data.complemento
      }
    });
    return instituicaoBrasileira;
  }

  async update(data: IUpdateInstituicaoBrasileira): Promise<instituicaoBrasileiraModel> {
    const instituicaoBrasileiraModel = await prisma.instituicao_brasileira.update({
      where: {
        id: data.id
      },
      data: {
        nome: data.nome,
        cnpj: data.cnpj,
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        estado: data.estado,
        municipio: data.municipio,
        numero: data.numero,
        complemento: data.complemento,
        situacao: data.situacao,
        sigla: data.sigla,
        pais: data.pais
      }
    });
    return instituicaoBrasileiraModel;
  }

  async read(): Promise<instituicaoBrasileiraModel[]> {
    const instituicaoBrasileiraModel = await prisma.instituicao_brasileira.findMany({});
    return instituicaoBrasileiraModel;
  }
}
