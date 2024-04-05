import { config } from "dotenv";
import { MongoClient } from "mongodb";
import { MongoRepository } from "./infra/repository/mongo";
import { Repository } from "./domain/interface";
import * as Logger from "./utils/Logger";

config();

const closeCallbacks: (() => Promise<void>)[] = [];

export const closePlatform = () => Promise.all(closeCallbacks.map((callback) => callback()));

export async function bootstrapPlatform(): Promise<void> {
  const APP_MODE = process.env.APP_MODE as string;
  const APP_KEY  = process.env.APP_KEY as string;

  const MONGO_URL                  = process.env.MONGO_URL as string;
  const MONGO_DBNAME               = process.env.MONGO_DBNAME || 'akh-node-oauth2-api';

  if( APP_KEY === undefined || APP_KEY == '' ) {
    Logger.instance.error("Undifined APP_KEY!");
    throw new Error("Undifined APP_KEY");
  }

  const client = await MongoClient.connect(MONGO_URL);
  Repository.instance = new MongoRepository(client, MONGO_DBNAME);
  closeCallbacks.push(async () => client.close());

  switch (APP_MODE) {
  case "local":
    // do something
    // "Your app running on Local";
    break;
  case "production":
  default:
    // do something
    // "Your app running on Production";
    break;
  }
}
