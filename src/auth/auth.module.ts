import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[ forwardRef(()=>UsersModule), JwtModule.register({
    secret: process.env.JWT_SECRET_KEY || 'SECRET',
    signOptions: { expiresIn: '24h' },
  }),],
  exports:[JwtModule, AuthService]
})
export class AuthModule {}
