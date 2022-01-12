import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {RolesService} from "../roles/roles.service";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {ElasticService} from "../elastic/elastic.service";


@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository :typeof Post,
              private fileService:FilesService, private elasticService: ElasticService) {}


  async create(dto: CreatePostDto, image:any) {
    const {fileName,content}= await this.fileService.createFile(image)
    const post = await this.postRepository.create({...dto,image:fileName})
    const postElastic = await this.elasticService.indexPost({fileName:fileName})
    // console.log("postElastic",postElastic)
    return post;
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
