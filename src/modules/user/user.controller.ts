import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@decorators/user.decorator';
import { UserEntity } from '@entities/user.entity';
import JwtGuard from '@guards/jwt.guard';
import { UserResponseDto } from '@modules/auth/dto/user-response.dto';
import { CollectionsResponse, InscriptionObject } from '@type/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:address')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('address') address: string): Promise<UserResponseDto> {
    const foundUser = await this.userService.getByAddress(address);
    return { user: foundUser };
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() user: CreateUserDto): Promise<UserResponseDto> {
    const foundUser = await this.userService.createUser(user);
    return { user: foundUser };
  }
}
