import { UserIdRequestDto } from 'src/utils/general/dto/UserIdRequestDto';
import { IsString } from 'class-validator';

export class UserIdAndPlaylistIdDto extends UserIdRequestDto {
  @IsString()
  playlist_id: string;
}
