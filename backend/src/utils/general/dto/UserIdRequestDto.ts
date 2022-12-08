import { IsString } from 'class-validator';

export class UserIdRequestDto {
  @IsString()
  user_id: string;
}
