import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.model";
import {RolesModule} from "./roles/roles.module";
import {UserRoles} from "./roles/userRoles.model";
import {Roles} from "./roles/roles.model";
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ElasticModule } from './elastic/elastic.module';
import * as path from "path";


@Module({
  imports: [
  //     ConfigModule.forRoot({
  //   validationSchema: Joi.object({
  //     // DATABASE_URL: Joi.string().required(),
  //     PORT: Joi.number(),
  //     NODE_ENV:Joi.string().required(),
  //     ELASTIC_NODE: Joi.string().required(),
  //     ELASTICSEARCH_INDEX : Joi.string().required(),
  //   })
  // }),
      ConfigModule.forRoot({
        envFilePath:`.${process.env.NODE_ENV}.env`,
      }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname,'static')}),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [User, Roles, UserRoles, Post],
      autoLoadModels:true,
    }),
  SearchModule,
  AuthModule,
  UsersModule,
    RolesModule,
    PostsModule,
    FilesModule,
    ElasticModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
