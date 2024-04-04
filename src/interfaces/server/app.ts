/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from "express";
import { parseTokenPayloadMiddleware } from "./middleware/AuthMiddleware";
import { router } from "./router";
import { corsMiddleware } from "./middleware/CorsMiddlewere";
const helmet = require("helmet");
const xss = require("xss-clean");

export function app(corsOrigin: string): express.Application {
  return express()
    .enable("trust proxy") // Get the remote client's IP address
    .use(helmet()) // set security HTTP headers
    .use(express.json()) // parse json request body
    .use(express.urlencoded({ extended: true }))
    .use(xss())
    .use(corsMiddleware(corsOrigin))
    .use(parseTokenPayloadMiddleware)
    .use("/", router());
}
