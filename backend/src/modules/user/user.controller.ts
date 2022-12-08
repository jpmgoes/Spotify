import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserIdRequestDto } from 'src/utils/general/dto/UserIdRequestDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  getInfo(@Query() { user_id }: UserIdRequestDto) {
    return this.userService.getInfo(user_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('allowed/to/play')
  isPremium(@Query() { user_id }: UserIdRequestDto) {
    return this.userService.isAllowed(user_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('give/premium')
  givePermissionPlay(@Query() { user_id }: UserIdRequestDto) {
    return this.userService.givePermissionPlay(user_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  updateUserInfo(
    @Query() { user_id }: UserIdRequestDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user_id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  remove(@Query() { user_id }: UserIdRequestDto) {
    return this.userService.remove(user_id);
  }
}
