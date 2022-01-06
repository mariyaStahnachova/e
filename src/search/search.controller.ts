import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import {SearchService} from "./search.service";
import {DocDTO} from "../DTO/docDTO";
import {FindDTO} from "../DTO/findDTO";

@Controller('search')
export class SearchController {
    constructor(public searchService: SearchService){}

    //create
    @Put()
    putRecord(@Body() docDTO: DocDTO) {
        this.searchService.indexPost(docDTO).then(r=>{
            console.log(r)
        });
    }
    //update
    @Post('update')
    updateRecord(@Body() docDTO: FindDTO) {
        this.searchService.updatePost(docDTO)
    }
    //find
    @Get('find')
    findRecord(@Body() docDTO: FindDTO) {
         this.searchService.findRecord(docDTO)
    }
    //delete
    @Post()
    deleteRecord(@Body() id : string) {
        this.searchService.remove(id)
    }
}
