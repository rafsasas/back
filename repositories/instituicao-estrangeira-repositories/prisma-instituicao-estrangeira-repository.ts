import { instituicaoEstrangeiraModel } from "../../models/instituicao-estrangeira-model";
import prisma from "../../prismaclient";
import { InstituicaoEstrangeiraRepository } from "./instituicao-estrangeira-repository";
import { ICreateInstituicaoEstrangeira, IUpdateInstituicaoEstrangeira } from "./interfaces";

export class PrismaInstituicaoEstrangeiraRepository implements InstituicaoEstrangeiraRepository {
  async create(data: ICreateInstituicaoEstrangeira): Promise<instituicaoEstrangeiraModel> {
    const instituicaoEstrangeira = await prisma.instuicao_estrangeira.create({
      data: {
        nome: data.nome,
        sigla: data.sigla,
        pais: data.pais,
        cep: data.cep,
        logradouro: data.logradouro,
        estado: data.estado,
        municipio: data.municipio,
        complemento: data.complemento
      }
    });
    return instituicaoEstrangeira;
  }

  async update(data: IUpdateInstituicaoEstrangeira): Promise<instituicaoEstrangeiraModel> {
    const instituicaoEstrangeiraModel = await prisma.instuicao_estrangeira.update({
      where: {
        id: data.id
      },
      data: {
        nome: data.nome,
        cep: data.cep,
        logradouro: data.logradouro,
        estado: data.estado,
        municipio: data.municipio,
        complemento: data.complemento,
        situacao: data.situacao,
        sigla: data.sigla,
        pais: data.pais
      }
    });
    return instituicaoEstrangeiraModel;
  }

  async read(): Promise<instituicaoEstrangeiraModel[]> {
    const instituicaoEstrangeiraModel = await prisma.instuicao_estrangeira.findMany({});
    return instituicaoEstrangeiraModel;
  }
}
