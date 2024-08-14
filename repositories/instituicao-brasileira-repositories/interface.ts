export interface ICreateInstituicaoBrasileira {
  nome: string;
  sigla: string;
  pais: string;
  cnpj: string;
  cep: string;
  logradouro: string;
  bairro: string;
  estado: string;
  municipio: string;
  numero: number;
  complemento: string | undefined;
}

export interface IUpdateInstituicaoBrasileira {
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
  numero: number | undefined;
  complemento: string | undefined;
  situacao: string | undefined;
}
