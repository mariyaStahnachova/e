
import {ElasticService} from "./elastic.service";

import {Module, OnModuleInit} from '@nestjs/common';
import {ElasticsearchModule} from "@nestjs/elasticsearch";


@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  providers: [ElasticService],
  exports: [ElasticsearchModule, ElasticService],
})
export class ElasticModule implements OnModuleInit  {
  constructor(private readonly elasticService: ElasticService){}
  public async onModuleInit() {
    await this.elasticService.createIndex();
  }
}
