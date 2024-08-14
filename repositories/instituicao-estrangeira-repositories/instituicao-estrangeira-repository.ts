import { ICreateInstituicaoEstrangeira, IUpdateInstituicaoEstrangeira } from "./interfaces";
import { instituicaoEstrangeiraModel } from "../../models/instituicao-estrangeira-model";

export interface InstituicaoEstrangeiraRepository {
  create(data: ICreateInstituicaoEstrangeira): Promise<instituicaoEstrangeiraModel>;
  update(data: IUpdateInstituicaoEstrangeira): Promise<instituicaoEstrangeiraModel>;
  read(): Promise<instituicaoEstrangeiraModel[]>;
}
