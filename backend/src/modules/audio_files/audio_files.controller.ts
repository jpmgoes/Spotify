import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MusicIdDto } from '../playlist/dto/userid-musicid.dto';
import { AudioFilesService } from './audio_files.service';

@Controller('music/files')
export class AudioFilesController {
  constructor(private readonly audioFilesService: AudioFilesService) {}
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'img', maxCount: 1 },
      { name: 'infos', maxCount: 1 },
    ]),
  )
  uploadFile(
    @UploadedFiles()
    files: {
      audio: Express.Multer.File[];
      img: Express.Multer.File[];
      infos: Express.Multer.File[];
    },
  ) {
    const { audio, img, infos } = files;
    return this.audioFilesService.uploadFile(audio[0], img[0], infos[0]);
  }

  @Get('data')
  getSoundDataById(@Query() { music_id }: MusicIdDto) {
    return this.audioFilesService.getAudioInfoById(music_id);
  }
}
