import { Module, MiddlewareConsumer  } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Post} from "./posts.model";
import {FilesModule} from "../files/files.module";
import {ElasticModule} from "../elastic/elastic.module";
import {LoggerMiddleware} from "../middleware/logger.middleware";


@Module({
  imports:[SequelizeModule.forFeature([User, Post]),FilesModule, ElasticModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes(PostsController);
  }
}
