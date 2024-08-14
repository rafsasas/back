import { instituicaoBrasileiraModel } from "../models/instituicao-brasileira-model";
import { instituicaoEstrangeiraModel } from "../models/instituicao-estrangeira-model";
import { InstituicaoBrasileiraRepository } from "../repositories/instituicao-brasileira-repositories/instituicao-brasileira-repository";
import { InstituicaoEstrangeiraRepository } from "../repositories/instituicao-estrangeira-repositories/instituicao-estrangeira-repository";
import { ResponseError } from "../errors/response-error";

interface PostInstituicoesUseCaseRequest {
  nome: string;
  sigla: string;
  pais: string;
  cnpj: string | undefined;
  cep: string;
  logradouro: string;
  bairro: string | undefined;
  estado: string;
  municipio: string;
  complemento: string | undefined;
  numero: number | undefined;
}

interface PostInstituicaoUseCaseResponse {
  instituicao: instituicaoBrasileiraModel | instituicaoEstrangeiraModel;
}

export class PostInstituicaoUseCase {
  constructor(
    private instituicaoBrasileiraRepository: InstituicaoBrasileiraRepository,
    private InstituicaoEstrangeiraRepository: InstituicaoEstrangeiraRepository
  ) {}

  async execute({ nome, sigla, pais, cnpj, cep, logradouro, bairro, estado, municipio, complemento, numero }: PostInstituicoesUseCaseRequest): Promise<PostInstituicaoUseCaseResponse> {
    const camposObrigatoriosBrasileiros = { nome, sigla, pais, cep, cnpj, logradouro, estado, bairro, municipio, numero };
    const camposObrigatoriosEstrangeiros = { nome, sigla, pais, logradouro, estado, municipio };

    const camposComLimiteDeCaracteres: { campo: string; valor: string; limite: number }[] = [
      { campo: "logradouro", valor: logradouro, limite: 32 },
      { campo: "estado", valor: estado, limite: 32 },
      { campo: "municipio", valor: municipio, limite: 32 },
      { campo: "nome", valor: nome, limite: 32 },
      { campo: "sigla", valor: sigla, limite: 8 }
    ];

    if (pais != "Brasil") {
      for (const [campo, valor] of Object.entries(camposObrigatoriosEstrangeiros)) {
        if (valor === undefined || valor === null) {
          throw new ResponseError(`O campo ${campo} não pode ser vazio`, 400);
        }
        for (const { campo, valor, limite } of camposComLimiteDeCaracteres) {
          if (valor.length > limite) {
            throw new ResponseError(`${campo.charAt(0).toUpperCase() + campo.slice(1)} deve possuir no máximo ${limite} caracteres`, 403);
          }
        }

        if (complemento != undefined && complemento?.length > 32) {
          throw new ResponseError("Complemento deve possuir no máximo 32 caracteres", 403);
        }
      }
    } else {
      for (const [campo, valor] of Object.entries(camposObrigatoriosBrasileiros)) {
        if (valor === undefined || valor === null) {
          throw new ResponseError(`O campo ${campo} não pode ser vazio`, 400);
        }
      }
    }

    for (const { campo, valor, limite } of camposComLimiteDeCaracteres) {
      if (valor.length > limite) {
        throw new ResponseError(`${campo.charAt(0).toUpperCase() + campo.slice(1)} deve possuir no máximo ${limite} caracteres`, 403);
      }
    }

    if (cep != undefined && cep.length > 9) {
      throw new ResponseError("O cep deve possuir no máximo 9 caracteres", 403);
    }

    if (cnpj != undefined && cnpj.length > 14) {
      throw new ResponseError("O cnpj deve possuir no máximo 14 caracteres", 403);
    }

    if (numero != undefined && numero.toString().length > 8) {
      throw new ResponseError("O numero deve possuir no máximo 8 caracteres", 403);
    }

    if (pais === "Brasil" && complemento != undefined && complemento?.length > 16) {
      throw new ResponseError("O complemento deve ter no máximo 16 caracteres", 403);
    }

    const instituicao =
      pais == "Brasil"
        ? await this.instituicaoBrasileiraRepository.create({
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
            complemento
          })
        : await this.InstituicaoEstrangeiraRepository.create({ nome, sigla, pais, cep, logradouro, estado, municipio, complemento });

    return {
      instituicao
    };
  }
}
