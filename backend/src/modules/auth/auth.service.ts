import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;
    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;
    return user;
  }

  login(user: User) {
    delete user.createdAt;
    delete user.password;
    delete user.premium;

    const payload = { ...user };
    return { token: this.jwtService.sign(payload), user_data: { ...user } };
  }
  
  isAuth(jwt: string) {
    const data = this.jwtService.decode(jwt)
    return { isAuth: true, data };
  }
}
