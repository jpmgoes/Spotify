import { IsString } from 'class-validator';

export class UpdatePlaylistDto {
  @IsString()
  playlist_id: string;
}


