export class ResponseError extends Error {
  statusCode: number;
  error?: any;

  constructor(message: string, statusCode: number, error?: any, name?: string) {
    super(message);
    this.name = name ? name : this.constructor.name;
    this.statusCode = statusCode;
    this.error = error;
  }
}
