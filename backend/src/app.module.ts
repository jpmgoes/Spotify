import { Module } from '@nestjs/common';
import { PrismaService } from './database/PrismaService';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { AuthModule } from './modules/auth/auth.module';
import { AudioFilesModule } from './modules/audio_files/audio_files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CollectionModule } from './modules/collection/collection.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { MusicModule } from './modules/music/music.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AudioFilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'temp'),
      exclude: ['/api*'],
    }),
    CollectionModule,
    PlaylistModule,
    MusicModule, 
  ],
  controllers: [],
  providers: [PrismaService, UserService],
})
export class AppModule {}
