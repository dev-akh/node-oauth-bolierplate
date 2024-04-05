import * as schema from '../../domain/schema';
import { Repository } from '../../domain/interface';
import { AlreadyExistUserError } from './errors/AlreadyExistUserError';

export class User {

  constructor(
  ) { }

  public async getAllUserInformation(): Promise<schema.IStoredUser[]> {
    const res = await Repository.instance
      .getAllUsers();
    return res;
  }

  public async storeUserInformation(user: schema.IUserData): Promise<schema.IStoredUser | null> {
    const exist = await this.checkUserByEmailExist(user.email);
    if (exist) {
      throw new AlreadyExistUserError(user.email,`Email has already existed.`);
    }
    const userId = await Repository.instance
      .storeUserData(user);
    if(userId != null){
      return this.byId(userId);
    }
    return null;
  }

  public async checkUserByEmailExist(email: string): Promise<boolean> {
    try {
      const user = await this.byEmail(email);
      return !(user && !user.email);
    } catch (e) {
      return false;
    }
  }

  public async byEmail(email: string): Promise<schema.IStoredUser> {
    return await Repository.instance
      .getUserByEmail(email)
      .then(user => user);
  }

  public async passwordByEmail(email: string): Promise<schema.IStoredUser> {
    return await Repository.instance
      .getUserPasswordByEmail(email)
      .then(user => user);
  }

  public async byId(id: string): Promise<schema.IStoredUser> {
    return await Repository.instance.getUserById(id);
  }
}
