import { Collection, MongoClient, Db, ObjectId } from 'mongodb';
import * as Logger from '../../../utils/Logger';
import * as schema from '../../../domain/schema';

import {
  RepositoryInterface,
  RepositoryInternalError,
  NotFoundError,
} from '../../../domain/interface';

export interface DB {
  users: Collection<schema.IStoredUser | schema.IUserData>;
}

export class MongoRepository implements RepositoryInterface {

  private db: Db;
  private users: Collection<schema.IStoredUser | schema.IUserData >;

  constructor(client: MongoClient, dbName?: string) {
    this.db = client.db(dbName);
    this.users = this.db.collection('users');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapDoc(doc: any) {
    const result = doc ;

    if (doc._id && doc._id.toHexString) {
      result._id = doc._id.toHexString();
    }

    return result;
  }

  private convertId(id: string | ObjectId): ObjectId | string {
    try {
      return new ObjectId(id);
    } catch {
      return id;
    }
  }

  /*
  * Get All users
  * @params null
  * @return schema.IStoredUser[]
  */
  public async getAllUsers(): Promise<schema.IStoredUser[]> {
    try {
      const allUser = await this.users.find({}).toArray();
      return await new Promise((resolve, reject) => {
        Logger.instance.debug({module: 'GetAllUsers',allUser});
        if(allUser) {
          resolve(this.mapDoc(allUser));
        } else {
          reject(new NotFoundError("Get All Users"));
        }
      });
    } catch (error) {
      Logger.instance.error({module:'GetAllUsers', error});
      throw new RepositoryInternalError(error as Error);
    }
  }

  /*
  * Get User Information by ID
  * @params user Id : string
  * @return schema.IStoredUser
  */
  public async getUserById(id: string): Promise<schema.IStoredUser> {
    try {
      const doc = await this.users.findOne<schema.IStoredUser>({ _id: this.convertId(id) });
      return await new Promise((resolve, reject) => {
        Logger.instance.debug('getUserById', doc);
        if (doc) {
          resolve(this.mapDoc(doc));
        } else {
          reject(new NotFoundError('User'));
        }
      });
    } catch (error) {
      Logger.instance.error('getUserById', error);
      throw new RepositoryInternalError(error as Error);
    }
  }

  /*
  * Get User Information by Email
  * @params user Email : string
  * @return schema.IStoredUser
  */
  public async getUserByEmail(email: string): Promise<schema.IStoredUser> {
    try {
      const doc = await this.users.findOne<schema.IStoredUser>({ email: email });
      return new Promise((resolve, reject) => {
        Logger.instance.debug({module: 'getUserByEmail', doc});
        if (doc) {
          resolve(this.mapDoc(doc));
        } else {
          reject(new NotFoundError('User'));
        }
      });
    } catch (error) {
      Logger.instance.error('getUserByEmail', error);
      throw new RepositoryInternalError(error as Error);
    }
  }

  /*
  * Store User Information
  * @params payload: schema.IUserData
  * @return _id
  */
  public async storeUserData(payload: schema.IUserData): Promise<string | null> {
    try {
      const result = await this.users.insertOne( payload
      );
      Logger.instance.debug({module: 'StoreUserData result', result});
      if (result.insertedId !== undefined) {
        Logger.instance.info({module: 'StoreUserData', payload});
        return new ObjectId(result.insertedId).toHexString();
      } else {
        return null;
      }
    } catch (error) {
      Logger.instance.error({module:'StoreUserData', error});
      throw new RepositoryInternalError(error as Error);
    }
  }

}
