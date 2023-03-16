import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ description: '계정명' })
  @IsString()
  userID: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  password: string;

  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '별명' })
  @IsOptional()
  nickname: string;
}
