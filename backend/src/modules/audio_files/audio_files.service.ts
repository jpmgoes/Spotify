import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { Db, MongoClient } from 'mongodb';
import { FilesController } from 'src/utils/files_controller/FilesController';

@Injectable()
export class AudioFilesService {
  constructor(private readonly prismaService: PrismaService) {}

  private client: MongoClient;
  private db: Db;

  async setMongoConnection() {
    if (!this.client) {
      this.client = new MongoClient(process.env.DATABASE_URL_MONGO);
    }
    this.db = this.client.db('spotify');
  }

  async uploadFile(
    file: Express.Multer.File,
    img: Express.Multer.File,
    infos: Express.Multer.File,
  ) {
    this.setMongoConnection();
    const filesController = new FilesController(this.db);

    filesController.getFileOrWrite(infos, 'infos');
    const data: IInfoData = JSON.parse(
      filesController.getFileOrWrite(infos, 'infos'),
    );

    try {
      const res = {
        song_id: await filesController.uploadFile(file, 'song_files', 'audio'),
        img_id: await filesController.uploadFile(img, 'img_files', 'img'),
      };

      const song_id = res.song_id.toString();
      const img_id = res.img_id.toString();

      const img_link =
        process.env.API_LINK + '/img/' + encodeURI(img.originalname);
      const song_link =
        process.env.API_LINK + '/audio/' + encodeURI(file.originalname);

      const img_data = {
        id: img_id,
        link: img_link,
      };
      const song_data = {
        id: song_id,
        link: song_link,
      };

      const authorIds: string[] = [];

      for (const author of data.author_data) {
        try {
          const { id } = await this.prismaService.author.create({
            data: {
              name: author.name,
              unique_id: author.id,
            },
            select: { id: true },
          });
          authorIds.push(id);
        } catch (error) {
          const { id } = await this.prismaService.author.findUnique({
            where: { unique_id: author.id },
            select: { id: true },
          });
          authorIds.push(id);
        }
      }

      const formatedAuthorIds = authorIds.map((id) => {
        return { id };
      });

      const { id: song_info_id } = await this.prismaService.song.create({
        data: {
          img_data,
          song_data,
          name: data.song_data.name,
          authors: {
            connect: [...formatedAuthorIds],
          },
        },
        select: { id: true },
      });

      return { ...res, music_id: song_info_id, created: true };
    } catch (error) {
      throw new HttpException(
        { created: false, error },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private async getImgData(id: string) {
    const imgData = await this.prismaService.img_files_files.findUniqueOrThrow({
      where: { id },
      select: { metadata: true, id: true, filename: true },
    });

    return imgData;
  }

  private async getAudioData(id: string) {
    const audioData =
      await this.prismaService.song_files_files.findUniqueOrThrow({
        where: { id },
        select: { metadata: true, id: true, filename: true },
      });

    return audioData;
  }

  async getAudioInfoById(id: string) {
    try {
      const song = await this.prismaService.song.findFirstOrThrow({
        where: { id },
      });

      const audioData = await this.getAudioData(song.song_data.id);

      const imgData = await this.getImgData(song.img_data.id);

      const imgLink =
        process.env.API_LINK + '/img/' + encodeURI(imgData.filename);
      const audioLink =
        process.env.API_LINK + '/audio/' + encodeURI(audioData.filename);

      delete imgData.filename;
      delete audioData.filename;

      const title = song.name;
      return {
        finded: true,
        data: {
          title,
          img: { link: imgLink, ...imgData },
          audio: { link: audioLink, ...audioData },
        },
      };
    } catch (error) {
      throw new HttpException(
        { finded: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

interface IInfoData {
  author_data: IAuthorData[];
  song_data: ISongData;
}

interface IAuthorData {
  id: number;
  name: string;
}

interface ISongData {
  name: string;
}
