import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';

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
