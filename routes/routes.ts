import { Router } from "express";
import { postInstituicoes } from "../http/controllers/post-instituicao-controller";
import { patchInstituicoes } from "../http/controllers/patch-instituicao-controller";
import { getInstituicoes } from "../http/controllers/get-instituicao-controller";

const router = Router();

router.post("/cadastrar", postInstituicoes);

router.patch("/alterar/:id", patchInstituicoes);

router.get("/buscar", getInstituicoes);

export default router;
