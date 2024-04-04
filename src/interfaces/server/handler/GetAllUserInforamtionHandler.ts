import { Request, Response } from "express";
import { asyncMiddleware } from "../middleware/AsyncMiddleware";
import * as Logger from "../../../utils/Logger";
import { GetUserInformationUsecase } from "../../../application/usecase/GetUserInformationUsecase";

/**
 * Getting user information
 *
 * @yields {200} return user information
 * @yields {404} Not found user
 * @yields {500} Server error
 */
const handler = async (req: Request, res: Response) => {
  try {
    const userUC = new GetUserInformationUsecase();
    const users = await userUC.getAllUsers();
    if (users) {
      res.status(200).json({ success: true , data: users });
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    if (e instanceof Error) {
      Logger.instance.error(e.message);
    } else {
      Logger.instance.error("Unknown error occurred.");
    }
    res.status(500).json(e);
  }
};

export const GetAllUserInformationHandler = asyncMiddleware(handler);
