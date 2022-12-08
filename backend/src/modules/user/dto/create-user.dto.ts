import { Prisma } from '@prisma/client';
import {
  IsString,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsEmail,
  IsEmpty,
  Matches,
} from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDto{
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(RegexHelper.passwordRegex, {
    message: MessagesHelper.INVALID_PASS,
  })
  password: string;

  @IsEmpty()
  age: number;

  @IsEmpty()
  collectionId: string;

  @IsDateString()
  bornDate: string | Date;

  @IsEmpty()
  premium: boolean;

  @IsString()
  gender: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string | Date;
}
