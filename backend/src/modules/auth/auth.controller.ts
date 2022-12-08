import { Controller, Post, UseGuards, Body, Query, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsJWT } from 'class-validator';
import { AuthService } from './auth.service';
import { IsAuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getIsAuth(@Query() {jwt}: IsAuthDto) {
    return this.authService.isAuth(jwt);
  }
}
