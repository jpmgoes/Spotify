import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/PrismaService';
import { AudioFilesController } from './audio_files.controller';
import { AudioFilesService } from './audio_files.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AudioFilesController],
  providers: [AudioFilesService, PrismaService],
})
export class AudioFilesModule {}
