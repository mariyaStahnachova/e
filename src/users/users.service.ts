import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";


@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository :typeof User){

  }
  async create(createUserDto: CreateUserDto) {
   const user = await this.userRepository.create(createUserDto)
    console.log('user', user)
  return user;
  }

  async findAll() {
   return await this.userRepository.findAll()

  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
