import { IsJWT } from 'class-validator';

export class IsAuthDto {
  @IsJWT()
  jwt: string;
}
