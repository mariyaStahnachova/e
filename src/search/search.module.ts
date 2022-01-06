import {Module, OnModuleInit} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ElasticsearchModule} from "@nestjs/elasticsearch";
import { SearchService } from './search.service';

@Module({
    imports: [
        ElasticsearchModule.register({
    node: 'http://localhost:9200',
}),
    ],
    providers: [SearchService],
    exports: [ElasticsearchModule, SearchService],
})
export class SearchModule implements OnModuleInit  {
    constructor(private readonly searchService: SearchService){}
    public async onModuleInit() {
        await this.searchService.createIndex();
    }
}
