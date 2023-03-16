import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({summary:'유저 생성 API', description: '유저를 생성한다.'})
  @ApiCreatedResponse({description:'유저 생성', type: User})
  CreateUser(@Body() user: CreateUserDTO) {
    console.log(user);
    return this.usersService.create(user);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string): Promise<Object> {
    return this.usersService.remove(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.usersService.update(id, user);
  }
}
