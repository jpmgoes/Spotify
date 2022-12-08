import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PrismaService } from 'src/database/PrismaService';
import { CollectionModule } from '../collection/collection.module';

@Module({
  imports: [CollectionModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PrismaService],
})
export class PlaylistModule {}
