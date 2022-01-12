import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {RolesService} from "../roles/roles.service";
import {SetRoleDTO} from "./setRoleDTO.model";
import {SetBanDTO} from "./setBanDTO.model";



@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository :typeof User,
              private rolesService:RolesService){

  }
  async create(createUserDto: CreateUserDto) {
   const user = await this.userRepository.create(createUserDto)
    const role = await this.rolesService.findOne("ADMIN")
    await user.$set('roles', [role.id])
      user.roles = [role]
    return user;
  }


  async findAll() {
   return await this.userRepository.findAll({include:{all:true}})

  }

  async findByEmail(email:string) {
    return await this.userRepository.findOne({where: {email}, include: {all: true}})
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

    async setRole(dto : SetRoleDTO) {
      const user = await this.userRepository.findByPk(dto.userID)
        const role = await this.rolesService.findOne(dto.value)
        console.log(role)
        if(!role || !user){
            throw new HttpException('role or user are not found', HttpStatus.NOT_FOUND);
        }
        await user.$add('role', role.id)
        return user
    }

    async setBan(dto : SetBanDTO) {
        const user = await this.userRepository.findByPk(dto.userID)
        if(!user){
            throw new HttpException(' user is not found', HttpStatus.NOT_FOUND);
        }
        user.ban= true;
        user.banReason = dto.banReason
        await user.save();
        return user;

    }
}
