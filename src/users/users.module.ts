import {forwardRef, MiddlewareConsumer, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/posts.model";
import {LoggerMiddleware} from "../middleware/logger.middleware";



@Module({
  imports: [SequelizeModule.forFeature([User, Post]), RolesModule,  forwardRef(()=>AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes(UsersController);
  }
}
