import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { UserIdRequestDto } from 'src/utils/general/dto/UserIdRequestDto';

export class Realdata {
  @IsOptional()
  @IsBoolean()
  realdata: boolean;
}

type RealdataWithIdPlayListType = Realdata & UserIdRequestDto;

export class RealdataWithIdPlayListDto implements RealdataWithIdPlayListType {
  @IsString()
  user_id: string;

  @IsOptional()
  @IsBoolean()
  realdata: boolean;
}

export class PlaylistIdDto {
  @IsString()
  playlist_id: string;
}

type RealdataWithPlayListIdType = Realdata & PlaylistIdDto;

export class RealdataWithPlayListIdDto implements RealdataWithPlayListIdType {
  @IsString()
  playlist_id: string;

  @IsOptional()
  @IsBoolean()
  realdata: boolean;
}

type RealDataWithUserIdType = Realdata & UserIdRequestDto;

export class RealDataWithUserId implements RealDataWithUserIdType {
  @IsString()
  user_id: string;

  @IsOptional()
  @IsBoolean()
  realdata: boolean;
}

export class RealDataWithCollectionIdDto implements Realdata {
  @IsOptional()
  @IsBoolean()
  realdata: boolean;

  @IsString()
  collection_id: string;
}
