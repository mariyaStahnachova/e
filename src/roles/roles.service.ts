import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Roles} from "./roles.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private rolesRepository : typeof Roles) {
  }
  async create(createRoleDto: CreateRoleDto) {
    return await this.rolesRepository.create(createRoleDto)

  }

  async findAll() {
    return await this.rolesRepository.findAll()
  }

  async findOne(value: string) {
      return await this.rolesRepository.findOne({where: {value}})
  }
  //
  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
