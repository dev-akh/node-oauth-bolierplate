import * as schema from '../schema';

export interface RepositoryInterface {

  // get all user information
  getAllUsers(): Promise<schema.IStoredUser[]>;

  // get user information by Id
  getUserById(id: string): Promise<schema.IStoredUser>;

  // get user information by email
  getUserByEmail(email: string): Promise<schema.IStoredUser>;

  // store the user information
  storeUserData(payload: schema.IUserData): Promise<string | null>;
}
