import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import {
  RealDataWithCollectionIdDto,
  RealdataWithIdPlayListDto,
} from '../playlist/dto/realdata-playlist.dto';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}
  async findCollectionById({ user_id, realdata }: RealdataWithIdPlayListDto) {
    const playlistInfoFilter = {
      select: { id: true, name: true },
    };

    const realData = realdata ? playlistInfoFilter : false;
    try {
      const collection = await this.prisma.collection.findFirstOrThrow({
        where: { userId: user_id },
        include: { playlist: realData },
      });

      if (realData) delete collection.playlistIDs;
      delete collection.userId;
      return collection;
    } catch (error) {
      return { notFound: true, error };
    }
  }

  async findPlaylistsByCollection({
    collection_id,
    realdata,
  }: RealDataWithCollectionIdDto) {
    const playlistInfoFilter = {
      select: {
        id: true,
        name: true,
        songs: {
          select: {
            img_data: { select: { link: true } },
            id: true,
            name: true,
            authors: { select: { name: true } },
          },
        },
      },
    };

    const realData = realdata ? playlistInfoFilter : false;
    try {
      const collection = await this.prisma.collection.findFirstOrThrow({
        where: { id: collection_id },
        include: { playlist: realData },
      });
      delete collection.userId;
      return collection;
    } catch (error) {
      return { notFound: true, error };
    }
  }
}
