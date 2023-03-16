import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    console.log('findAll')
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    console.log(id)
    return this.usersRepository.findOneBy({
      userID: id
    });
  }

  async create(user:CreateUserDTO) {
    await this.usersRepository.save(user)
  }

  async update(id:string, user:UpdateUserDTO) {
    const prevUser = await this.usersRepository.findOne({
      where: {
        userID: id
      }
    })
    let usersToUpdate = {...prevUser, ...user}
    await this.usersRepository.save(usersToUpdate)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
