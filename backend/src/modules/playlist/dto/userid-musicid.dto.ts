import { IsString } from 'class-validator';
import { UserIdRequestDto } from 'src/utils/general/dto/UserIdRequestDto';
import { UpdatePlaylistDto } from './update-playlist.dto';

export class MusicIdDto {
  @IsString()
  music_id: string;
}

export type PlaylistIdsAndMusicidType = UpdatePlaylistDto &
  MusicIdDto;

export type MusicIdAndUserIdType = UserIdRequestDto & MusicIdDto;

export class MusicIdAndUserId implements MusicIdAndUserIdType {
  @IsString()
  user_id: string;
  @IsString()
  music_id: string;
}

export class PlaylistIdsAndMusicidDto implements PlaylistIdsAndMusicidType {
  @IsString()
  playlist_id: string;
  @IsString()
  music_id: string;
}
