import { instituicaoBrasileiraModel } from "../models/instituicao-brasileira-model";
import { instituicaoEstrangeiraModel } from "../models/instituicao-estrangeira-model";
import { InstituicaoBrasileiraRepository } from "../repositories/instituicao-brasileira-repositories/instituicao-brasileira-repository";
import { InstituicaoEstrangeiraRepository } from "../repositories/instituicao-estrangeira-repositories/instituicao-estrangeira-repository";
import { ResponseError } from "../errors/response-error";

interface GetInstituicaoUseCaseResponse {
  instituicoes: {
    instituicaoBrasileira: Array<instituicaoBrasileiraModel>;
    instituicaoEstrangeira: Array<instituicaoEstrangeiraModel>;
  };
}

export class GetInstituicaoUseCase {
  constructor(
    private instituicaoBrasileiraRepository: InstituicaoBrasileiraRepository,
    private instituicaoEstrangeiraRepository: InstituicaoEstrangeiraRepository
  ) {}

  async execute(): Promise<GetInstituicaoUseCaseResponse> {
    const instituicaoBrasileira = await this.instituicaoBrasileiraRepository.read();
    const instituicaoEstrangeira = await this.instituicaoEstrangeiraRepository.read();

    const instituicoes = {
      instituicaoBrasileira,
      instituicaoEstrangeira
    };

    return {
      instituicoes
    };
  }
}
