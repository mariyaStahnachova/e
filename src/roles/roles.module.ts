import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Roles} from "./roles.model";
import {User} from "../users/user.model";
import {UserRoles} from "./userRoles.model";
import {JwtService} from "@nestjs/jwt";


@Module({
  imports:[SequelizeModule.forFeature([Roles, User, UserRoles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}
