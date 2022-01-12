import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/user.model";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService
  ) {}
  async login(createUserDto: CreateUserDto) {
    const user =await this.validateUser(createUserDto);
    return this.generateToken(user)

  }

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(createUserDto.email)
    if (candidate){
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    const password =await bcrypt.hash(createUserDto.password, 5);
    const user =await this.usersService.create({...createUserDto, password:password})
    return this.generateToken(user)
  }


  private generateToken(user:User) {
    console.log(user)
    const payload = { email: user.email, sub: user.id, roles:user.roles };
    return {access_token: this.jwtService.sign(payload)}
  }

  async validateUser(user){
    const candidate = await this.usersService.findByEmail(user.email)
    const pass= await bcrypt.compare( user.password,candidate.password)
    if (pass && candidate) {
      return candidate
    }
      throw new UnauthorizedException({message: "Некорректный емайл или пароль"});
  }
}
