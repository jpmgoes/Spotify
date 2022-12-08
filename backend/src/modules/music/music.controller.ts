import { Controller, Get, Query } from '@nestjs/common';
import { MusicIdAndUserId } from '../playlist/dto/userid-musicid.dto';
import { MusicService } from './music.service';

// toca
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get("play")
  play(@Query() { user_id, music_id }: MusicIdAndUserId) {
    return this.musicService.findAll({ user_id, music_id });
  }
}
