import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import {ElasticModule} from "../elastic/elastic.module";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: []})
export class FilesModule {}
