import { instituicaoBrasileiraModel } from "../models/instituicao-brasileira-model";
import { instituicaoEstrangeiraModel } from "../models/instituicao-estrangeira-model";
import { InstituicaoBrasileiraRepository } from "../repositories/instituicao-brasileira-repositories/instituicao-brasileira-repository";
import { InstituicaoEstrangeiraRepository } from "../repositories/instituicao-estrangeira-repositories/instituicao-estrangeira-repository";
import { ResponseError } from "../errors/response-error";

interface PatchInstituicoesUseCaseRequest {
  id: string;
  nome: string | undefined;
  sigla: string | undefined;
  pais: string | undefined;
  cnpj: string | undefined;
  cep: string | undefined;
  logradouro: string | undefined;
  bairro: string | undefined;
  estado: string | undefined;
  municipio: string | undefined;
  complemento: string | undefined;
  numero: number | undefined;
  situacao: string | undefined;
}

interface PatchInstituicaoUseCaseResponse {
  instituicao: instituicaoBrasileiraModel | instituicaoEstrangeiraModel;
}

export class PatchInstituicaoUseCase {
  constructor(
    private instituicaoBrasileiraRepository: InstituicaoBrasileiraRepository,
    private InstituicaoEstrangeiraRepository: InstituicaoEstrangeiraRepository
  ) {}

  async execute({ id, nome, sigla, pais, cnpj, cep, logradouro, bairro, estado, municipio, complemento, numero, situacao }: PatchInstituicoesUseCaseRequest): Promise<PatchInstituicaoUseCaseResponse> {
    const camposComLimiteDeCaracteres: { campo: string; valor: string | undefined; limite: number }[] = [
      { campo: "logradouro", valor: logradouro, limite: 32 },
      { campo: "estado", valor: estado, limite: 32 },
      { campo: "municipio", valor: municipio, limite: 32 },
      { campo: "nome", valor: nome, limite: 32 },
      { campo: "sigla", valor: sigla, limite: 8 }
    ];

    if (pais != "Brasil") {
      for (const { campo, valor, limite } of camposComLimiteDeCaracteres) {
        if (valor != undefined && valor.length > limite) {
          throw new ResponseError(`${campo.charAt(0).toUpperCase() + campo.slice(1)} deve possuir no máximo ${limite} caracteres`, 403);
        }
      }

      if (complemento != undefined && complemento?.length > 32) {
        throw new ResponseError("Complemento deve possuir no máximo 32 caracteres", 403);
      }
    }

    for (const { campo, valor, limite } of camposComLimiteDeCaracteres) {
      if (valor != undefined && valor.length > limite) {
        throw new ResponseError(`${campo.charAt(0).toUpperCase() + campo.slice(1)} deve possuir no máximo ${limite} caracteres`, 403);
      }
    }

    if (cep != undefined && cep.length > 9) {
      throw new ResponseError("O cep deve possuir no máximo 9 caracteres", 403);
    }

    if (numero != undefined && numero.toString().length > 8) {
      throw new ResponseError("O numero deve possuir no máximo 8 caracteres", 403);
    }

    if (pais === "Brasil" && complemento != undefined && complemento?.length > 16) {
      throw new ResponseError("O complemento deve ter no máximo 16 caracteres", 403);
    }

    const instituicao =
      pais == "Brasil"
        ? await this.instituicaoBrasileiraRepository.update({
            id,
            nome,
            sigla,
            pais,
            cnpj: cnpj as string,
            cep,
            logradouro,
            bairro: bairro as string,
            estado,
            municipio,
            numero: numero as number,
            complemento,
            situacao
          })
        : await this.InstituicaoEstrangeiraRepository.update({ id, nome, sigla, pais, cep, logradouro, estado, municipio, complemento, situacao });

    return {
      instituicao
    };
  }
}
