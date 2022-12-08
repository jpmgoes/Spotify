import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { UserModule } from '../user/user.module';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  imports:[UserModule],
  controllers: [MusicController],
  providers: [MusicService, PrismaService]
})
export class MusicModule {}
