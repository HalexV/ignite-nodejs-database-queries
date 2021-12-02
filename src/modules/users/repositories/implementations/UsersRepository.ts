import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    // Complete usando ORM
    const userWithGames = this.repository.findOne(user_id, { relations: ['games']})

    if(!userWithGames) throw new Error('User not found')
    
    return userWithGames

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query('SELECT * FROM users ORDER BY first_name;'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    return await this.repository.query(`SELECT * FROM users WHERE lower(first_name)=lower('${first_name}') AND lower(last_name)=lower('${last_name}');`)
  }
}
