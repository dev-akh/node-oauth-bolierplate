import * as express from "express";
import { asyncMiddleware } from "./AsyncMiddleware";

import * as Logger from "../../../utils";

export const parseTokenPayloadMiddleware: express.Handler = asyncMiddleware(async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const [authType, credentials] = (req.headers.authorization as string).split(" ");

      switch (authType.toLowerCase()) {
      case "bearer":
        // do authenticate with server authorization

        break;
      case "basic":
        // Base64 encoded string → decode to ascii
        const decoded = new Buffer(credentials, "base64").toString("ascii");
        const [username, password] = decoded.split(":");

        if (username && password) {
          // check username and password is correct
        } else {
          // do something
        }
        break;
      default:
        break;
      }
    }

    next();
  } catch (e) {
    if (e instanceof Error) {
      Logger.instance.error(e.message);
      res.status(401).json({
        message: e.message,
      });
    } else {
      Logger.instance.error("Unknown error occurred.");
    }
    res.status(500);
  }
});

export const authMiddleware: express.Handler = asyncMiddleware(async (req, _, next) => {
  if (req) {
    // req.isLogin = true;
  } else {
    // req.isLogin = false;
  }

  next();
});
