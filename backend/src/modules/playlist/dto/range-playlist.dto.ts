import {
  MaxLength,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { UserIdRequestDto } from 'src/utils/general/dto/UserIdRequestDto';
import { Realdata } from './realdata-playlist.dto';

export class RangePlaylistDto extends Realdata {
  @IsNumber()
  first: number;

  @IsNumber()
  last: number;
}

export class RangeWithUserIdPlaylistDto implements UserIdRequestDto {
  @IsString()
  user_id: string;

  @IsNumber()
  first: number;
  @IsNumber()
  last: number;
}
