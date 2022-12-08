import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { LoginDto } from '../dto/login.dto';
import { validate } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(MessagesHelper.PASS_OR_EMAIL_INVALID);
    }
    return user;
  }
}
