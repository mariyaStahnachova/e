import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UsePipes,
    UseInterceptors,
    SetMetadata
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {RolesGuard} from "../auth/auth.guard";
import {Roles} from "../auth/roles.decorator";
import {SetRoleDTO} from "./setRoleDTO.model";
import {SetBanDTO} from "./setBanDTO.model";
import {ValidationPipe} from "../pipes/validation.pipe";
import {TestGuard} from "../auth/test.guard";
import {TestInterceptor} from "../interceptor/logging.interceptor";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
    @SetMetadata('key', '1234')
@UseGuards(TestGuard)
@UseInterceptors(TestInterceptor)
@UsePipes(ValidationPipe)
  @Post()
 async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }


  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
      return await this.usersService.findAll();
  }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    async setRole(@Body() setRoleDTO : SetRoleDTO) {
        return await this.usersService.setRole(setRoleDTO);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    async setBan(@Body() setBanDTO : SetBanDTO) {
        return await this.usersService.setBan(setBanDTO);
    }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
