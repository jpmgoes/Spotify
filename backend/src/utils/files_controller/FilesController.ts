import { randomUUID } from 'crypto';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  ReadStream,
  unlinkSync,
  writeFileSync,
} from 'fs';
import { GridFSBucket, Db, ObjectId } from 'mongodb';
import { join, sep } from 'path';

enum ErroUpload {
  INVALID_FILE_OBJ = 'Objeto do arquivo invalido',
  WRITE_ERROR = 'Não foi possível gravar',
}

export class FilesController {
  private fileFolderPath: string;
  private db: Db;

  constructor(db: Db) {
    this.db = db;
    const folderPath = join(__dirname, '..', '..', '..', 'temp');
    this.fileFolderPath = folderPath + sep;
  }

  private isValidFileObject(file: Express.Multer.File) {
    return true;
  }

  private initBucket(bucketName: string): GridFSBucket {
    return new GridFSBucket(this.db, { bucketName });
  }

  uploadFile(
    file: Express.Multer.File,
    bucketName: string,
    path: string,
  ): Promise<ObjectId> {
    return new Promise((resolve, reject) => {
      if (this.isValidFileObject(file)) {
        const bucket = this.initBucket(bucketName);
        const fileName = file.originalname;
        const fileData = file.buffer;
        const tempFileName = `${path + sep}${fileName}`;
        const tempFilePath = join(this.fileFolderPath, tempFileName);
        writeFileSync(tempFilePath, fileData);

        const stremGridFs = bucket.openUploadStream(fileName, {
          metadata: {
            mimeType: file.mimetype,
          },
        });

        const readStream = createReadStream(tempFilePath);
        readStream
          .pipe(stremGridFs)
          .on('finish', () => {
            // unlinkSync(tempFilePath);
            resolve(new ObjectId(stremGridFs.id.toString()));
          })
          .on('error', () => {});
      } else {
        reject(ErroUpload.INVALID_FILE_OBJ);
      }
    });
  }

  // async downloadFile(id: string, path: string, bucketName: string) {
  //   try {
  //     const bucket = this.initBucket(bucketName);
  //     const _id = new ObjectId(id);
  //     const results = await bucket.find({ _id }).toArray();
  //     if (results.length > 0) {
  //       const name = results[0].filename;
  //       const encodedName = encodeURI(name);
  //       const streamGridFs = bucket.openDownloadStream(_id);
  //       const filePath = join(this.fileFolderPath + path + sep + name);
  //       const streamWrite = createWriteStream(filePath);
  //       streamGridFs.pipe(streamWrite).on('finish', () => {});
  //       return 'http://localhost:3333/' + encodedName;
  //     }
  //   } catch (error) {
  //     console.log('deu error');
  //   }
  // }

  getFileOrWrite(file: Express.Multer.File, path: string) {
    const fileName = file.originalname;
    const fileData = file.buffer;
    const tempFileName = `${path}${sep}${fileName}`;
    const tempFilePath = join(this.fileFolderPath, tempFileName);
    const filePath = join(this.fileFolderPath + sep);

    try {
      const data = readFileSync(tempFilePath, 'utf8');
      return data;
    } catch (err) {
      const write = createWriteStream(filePath);
      writeFileSync(tempFilePath, fileData);
      const readStream = createReadStream(tempFilePath);
      readStream.pipe(write).on('finish', () => {});
      return tempFilePath;
    }
  }
}
