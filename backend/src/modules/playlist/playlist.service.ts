import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CollectionService } from '../collection/collection.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { RangeWithUserIdPlaylistDto } from './dto/range-playlist.dto';
import {
  RealdataWithIdPlayListDto,
  RealdataWithPlayListIdDto,
} from './dto/realdata-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import {
  MusicIdAndUserId,
  PlaylistIdsAndMusicidDto,
} from './dto/userid-musicid.dto';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly collectionService: CollectionService,
  ) {}

  async create(
    { user_id, music_id }: MusicIdAndUserId,
    { name }: CreatePlaylistDto,
  ) {
    try {
      const playlist = await this.prisma.playlist.create({
        data: {
          name,
          userId: user_id,
          collection: { connect: [{ userId: user_id }] },
          songs: { connect: { id: music_id } },
        },
        select: { id: true },
      });

      return { created: true, id: playlist.id };
    } catch (error) {
      throw new HttpException(
        { created: true, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll({ realdata, user_id }: RealdataWithIdPlayListDto) {
    return await this.collectionService.findCollectionById({
      user_id,
      realdata,
    });
  }

  async findWithRange({ first, last, user_id }: RangeWithUserIdPlaylistDto) {
    const amount = last - first;

    if (amount < 0) {
      throw new HttpException(
        { finded: false, message: 'last range is smaller than first' },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const playlists = await this.prisma.playlist.findMany({
        where: { userId: user_id },
        skip: first,
        take: amount,
        select: { id: true, name: true },
      });
      playlists;
      return { finded: true, data: playlists };
    } catch (error) {
      throw new HttpException(
        { finded: true, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOnePlaylistAllInfos({
    playlist_id,
    realdata,
  }: RealdataWithPlayListIdDto) {
    try {
      const filterSongData = {
        select: { img_data: true, song_data: true, id: true, name: true },
      };

      const realData = realdata ? filterSongData : false;

      const playlist = await this.prisma.playlist.findUniqueOrThrow({
        where: { id: playlist_id },
        include: { songs: realData },
      });

      if (realdata) delete playlist.songIDs;
      delete playlist.collectionIDs;
      delete playlist.createdAt;
      delete playlist.userId;

      return { finded: true, data: playlist };
    } catch (error) {
      throw new HttpException(
        { finded: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async rename(
    { playlist_id }: UpdatePlaylistDto,
    { name }: CreatePlaylistDto,
  ) {
    try {
      const playlist = await this.prisma.playlist.update({
        where: { id: playlist_id },
        data: { name },
      });
      return { edited: true, data: playlist };
    } catch (error) {
      throw new HttpException(
        { edited: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove({ playlist_id }: UpdatePlaylistDto) {
    try {
      const playlist = await this.prisma.playlist.delete({
        where: { id: playlist_id },
      });
      return { deleted: true, data: playlist };
    } catch (error) {
      throw new HttpException(
        { deleted: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addMusic({ music_id, playlist_id }: PlaylistIdsAndMusicidDto) {
    try {
      const { songIDs, id } = await this.prisma.playlist.findUnique({
        where: { id: playlist_id },
        select: { songIDs: true, id: true },
      });

      if (songIDs.includes(music_id)) return { added: true, playlist_id: id };

      const playlist = await this.prisma.playlist.update({
        where: { id: playlist_id },
        data: { songIDs: { push: music_id } },
        select: { id: true },
      });

      return { added: true, playlist_id: id };
    } catch (error) {
      throw new HttpException(
        { added: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeMusic({ music_id, playlist_id }: PlaylistIdsAndMusicidDto) {
    try {
      const { songIDs } = await this.prisma.playlist.update({
        where: { id: playlist_id },
        data: { songIDs: { push: music_id } },
        select: { songIDs: true },
      });

      const newSongIDs = songIDs.filter((id) => {
        return id !== music_id;
      });

      const { id } = await this.prisma.playlist.update({
        where: { id: playlist_id },
        data: { songIDs: { set: newSongIDs } },
        select: { id: true },
      });

      return { deleted: true, playlist_id: id };
    } catch (error) {
      throw new HttpException(
        { deleted: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
