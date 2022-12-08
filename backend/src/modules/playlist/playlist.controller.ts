import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { RangeWithUserIdPlaylistDto } from './dto/range-playlist.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserIdAndPlaylistIdDto } from './dto/userId-and-playlistId.dto';
import {
  MusicIdAndUserId,
  PlaylistIdsAndMusicidDto,
} from './dto/userid-musicid.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import {
  RealdataWithIdPlayListDto,
  RealdataWithPlayListIdDto,
} from './dto/realdata-playlist.dto';

@Controller('playlist')
@UseGuards(AuthGuard('jwt'))
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('create')
  create(
    @Query() ids: MusicIdAndUserId,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    return this.playlistService.create(ids, createPlaylistDto);
  }

  @Get('find/range')
  findAllWithRange(
    @Query() { first, last, user_id }: RangeWithUserIdPlaylistDto,
  ) {
    return this.playlistService.findWithRange({
      first,
      last,
      user_id,
    });
  }

  @Get('find/all')
  findAll(@Query() { realdata, user_id }: RealdataWithIdPlayListDto) {
    return this.playlistService.findAll({ realdata, user_id });
  }

  @Get('get/one/all/infos')
  findOneById(@Query() { playlist_id, realdata }: RealdataWithPlayListIdDto) {
    return this.playlistService.getOnePlaylistAllInfos({
      playlist_id,
      realdata,
    });
  }

  @Patch('rename')
  rename(
    @Query() ids: UpdatePlaylistDto,
    @Body() updatePlaylistDto: CreatePlaylistDto,
  ) {
    return this.playlistService.rename(ids, updatePlaylistDto);
  }

  @Patch('delete/music')
  removeMusic(@Query() userIdAndMusicId: PlaylistIdsAndMusicidDto) {
    return this.playlistService.removeMusic(userIdAndMusicId);
  }

  @Patch('add/music')
  addMusic(@Query() userIdAndMusicId: PlaylistIdsAndMusicidDto) {
    return this.playlistService.addMusic(userIdAndMusicId);
  }

  @Delete('delete')
  remove(@Query() userIdAndPlaylistIdDto: UserIdAndPlaylistIdDto) {
    return this.playlistService.remove(userIdAndPlaylistIdDto);
  }
}
