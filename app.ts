import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes/routes";
import { errorHandler } from "./http/controllers/error-handler";
import { wrapRequestSerializer, wrapResponseSerializer } from "pino-std-serializers";
import logger from "pino-http";

const app = express();

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());

app.use(
  logger({
    redact: {
      paths: ["req.headers.authorization"]
    },
    serializers: {
      req: wrapRequestSerializer((req) => {
        return {
          id: req.raw.id,
          method: req.raw.method,
          path: req.raw.url, // req.raw.url.split('?')[0], removeria query
          headers: {
            host: req.raw.headers.host,
            "user-agent": req.raw.headers["user-agent"],
            referer: req.raw.headers.referer,
            "cf-connecting-ip": req.raw.headers["cf-connecting-ip"],
            "cf-ipcountry": req.raw.headers["cf-ipcountry"]
          }
        };
      }),
      res: wrapResponseSerializer((res) => {
        return {
          statusCode: res.raw.statusCode
        };
      })
    }
  })
);

app.use(routes);

app.use(errorHandler);

export { app };
