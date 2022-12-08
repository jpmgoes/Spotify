import { Controller, UseGuards, Get, Body, Patch, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  RealDataWithCollectionIdDto,
  RealdataWithIdPlayListDto,
} from '../playlist/dto/realdata-playlist.dto';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findCollectionById(
    @Query() { user_id, realdata }: RealdataWithIdPlayListDto,
  ) {
    return this.collectionService.findCollectionById({ user_id, realdata });
  }

  @Get("page/home")
  getHomePagePlaylist(
    @Query() { collection_id, realdata }: RealDataWithCollectionIdDto,
  ) {
    return this.collectionService.findPlaylistsByCollection({
      collection_id,
      realdata,
    });
  }
}
