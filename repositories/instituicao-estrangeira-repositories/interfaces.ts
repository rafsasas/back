export interface ICreateInstituicaoEstrangeira {
  nome: string;
  sigla: string;
  pais: string;
  cep?: string | undefined;
  logradouro: string;
  estado: string;
  municipio: string;
  complemento?: string | undefined;
}

export interface IUpdateInstituicaoEstrangeira {
  id: string;
  nome: string | undefined;
  sigla: string | undefined;
  pais: string | undefined;
  cep?: string | undefined;
  logradouro: string | undefined;
  estado: string | undefined;
  municipio: string | undefined;
  complemento?: string | undefined;
  situacao: string | undefined;
}
