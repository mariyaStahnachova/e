import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path'



@Injectable()
export class FilesService {
  async createFile(file): Promise<any> {
    try {
      // console.log("cre", file)
      const fileName = file.originalname;
      const filePath = path.resolve(__dirname, '..', 'static')
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      const content = JSON.stringify(file.buffer);
      // console.log(content)
      // return {fileName,content};
      const string = JSON.stringify(content)
      // console.log(string)
       return {fileName,string};
    } catch (e) {
      console.log(e)
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }



}
