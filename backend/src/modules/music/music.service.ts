import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { MusicIdAndUserId } from '../playlist/dto/userid-musicid.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MusicService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}
  async findAll({ user_id, music_id }: MusicIdAndUserId) {
    try {
      const { isAllowed } = await this.userService.isAllowed(user_id);
      if (isAllowed) {
        const song = await this.prisma.song.findUniqueOrThrow({
          where: { id: music_id },
          include: { authors: { select: { id: true, name: true } } },
        });
        delete song.authorIDs;
        delete song.createdAt;
        delete song.playlistIDs;
        return { isAllowed: true, data: song };
      }
      throw new Error('não tem premium');
    } catch (error) {
      throw new HttpException(
        { isAllowed: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
