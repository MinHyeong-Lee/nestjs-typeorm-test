import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    console.log(id);
    const user = await this.usersRepository.findOneBy({
      userID: id,
    });

    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async create(user: CreateUserDTO) {
    await this.usersRepository.save(user);
  }

  async update(id: string, user: UpdateUserDTO) {
    const prevUser = await this.usersRepository.findOneBy({
      userID: id,
    });
    if (prevUser) {
      const usersToUpdate = { ...prevUser, ...user };
      await this.usersRepository.save(usersToUpdate);
    }
  }

  async remove(id: string): Promise<boolean> {
    console.log(id);
    const deletedUser = await this.usersRepository.delete({ userID: id });
    if (!deletedUser.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
