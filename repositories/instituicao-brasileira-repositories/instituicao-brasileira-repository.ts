import { Prisma } from "@prisma/client";
import { ICreateInstituicaoBrasileira, IUpdateInstituicaoBrasileira } from "./interface";
import { instituicaoBrasileiraModel } from "../../models/instituicao-brasileira-model";

export interface InstituicaoBrasileiraRepository {
  create(data: ICreateInstituicaoBrasileira): Promise<instituicaoBrasileiraModel>;
  update(data: IUpdateInstituicaoBrasileira): Promise<instituicaoBrasileiraModel>;
  read(): Promise<instituicaoBrasileiraModel[]>;
}
