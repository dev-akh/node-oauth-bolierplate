/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from "express";

const bodyParser = require("body-parser");
const expressPinoLogger = require("express-pino-logger");
import * as Logger from "../../utils";
import { authMiddleware } from "./middleware/AuthMiddleware";

import {
  GetAllUserInformationHandler,
  GetUserInformationByIdHandler,
  StoreUserInformationHandler
} from "./handler";

export function router(): express.Router {
  return express
    .Router()
    .use(authMiddleware)
    .use(
      expressPinoLogger({
        logger: Logger.instance,
      }),
    )
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .get("/", (req: express.Request, res: express.Response) => {
      const name = "Hello";
      if (req) {
        // can check req params
        // do something
      }
      return res.json({ hello: name });
    })
    .get("/user/all", GetAllUserInformationHandler)
    .get("/user/:userId",GetUserInformationByIdHandler)
    .post("/user",StoreUserInformationHandler);
}
