import { Injectable } from '@nestjs/common';
import {ElasticsearchService} from "@nestjs/elasticsearch";

@Injectable()
export class SearchService {
    constructor(private readonly elService : ElasticsearchService,) {}
    async createIndex(){
        const index = 'posts'
        const checkIndex = await this.elService.indices.exists({index});
        if (checkIndex.statusCode ===404){
            this.elService.indices.create({
                index,
                body:{}
            }, (err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    }
    public async indexPost(post: any) {
        return this.elService.index({
            index : 'posts',
            body: post,
        });
    }
    public async updatePost(post: any) {
        return this.elService.update(post);
    }

    public async remove(postId: string) {
        this.elService.deleteByQuery({
             index : 'posts',
            body: {
                query: {
                    match: {
                        id: postId,
                    }
                },
            },
        });
    }
    public async findRecord(obj) {
       const b =  await this.elService.search({
            index : 'posts',
            body: obj,
        });
       console.log(b.body.hits.hits)
    }
    async putRecord(docDTO) {
        console.log('data',docDTO)
    }
}
