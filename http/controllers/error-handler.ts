import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../../errors/response-error";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ResponseError) {
    const message = { name: err.name, statusCode: err.statusCode, message: err.message, error: err.error };
    req.log.error({ error: message });
    return res.status(err.statusCode).json({ name: err.name, statusCode: err.statusCode, message: err.message, error: err.error });
  } else if (err instanceof ZodError) {
    const message = { name: "ZodValidationError", statusCode: 400, message: "Erro de validação de requisição", error: err.errors };
    req.log.error(message);
    return res.status(400).json(message);
  }

  const message = { name: Error.name, statusCode: 500, message: "Erro interno do servidor", error: err };
  req.log.error(message);
  return res.status(500).json({ name: Error.name, statusCode: 500, message: "Erro interno do servidor" });
}
