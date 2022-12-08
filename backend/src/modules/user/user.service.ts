import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { ObjectId } from 'mongodb';
import { PrismaService } from 'src/database/PrismaService';
import { dateUtils } from 'src/utils/date/DateUtils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      const bornDate = data.bornDate as string;
      const userAge = await dateUtils.getYearsBetweenTwoTimes(
        bornDate,
        new Date().toISOString(),
      );
      data.age = userAge;

      const userPasswordEncrypted = hashSync(data.password, 8);
      data.password = userPasswordEncrypted;
      data.premium = false;

      const user = await this.prisma.user.create({
        data: {
          ...data,
          collection: {
            create: {},
          },
        },
        select: { id: true },
      });

      return { created: true, id: user.id };
    } catch (error) {
      throw new HttpException(
        { created: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = this.prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new HttpException(
        { finded: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isAllowed(id: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
      return { isAllowed: user.premium };
    } catch (error) {
      throw new HttpException(
        { isAllowed: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        data: { ...updateUserDto },
        where: { id },
      });

      delete user.createdAt;
      delete user.password;
      delete user.premium;
      return { updated: true, data: { ...user } };
    } catch (error) {
      throw new HttpException(
        { updated: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      this.prisma.user.delete({ where: { id } });
      return { deleted: true };
    } catch (error) {
      throw new HttpException(
        { deleted: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async givePermissionPlay(id: string) {
    try {
      const user = await this.prisma.user.update({
        data: { premium: true },
        where: { id },
      });
      return { isAllowed: user.premium };
    } catch (error) {
      throw new HttpException(
        { isAllowed: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInfo(id: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          bornDate: true,
          age: true,
          collection: true,
          gender: true,
        },
      });
      return { finded: true, data: user };
    } catch (error) {
      throw new HttpException(
        { finded: false, error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
