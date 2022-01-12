import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {ValidationException} from "../exceptions/validation.exception";
@Injectable()
export class ValidationPipe implements PipeTransform {
   async transform(value: any,  metadata: ArgumentMetadata) {
       console.log('In pipe', value, metadata)
        const object = plainToClass(metadata.metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const message = errors.map(error=> {
                return `${error.property} - ${Object.values(error.constraints).join(',')}`
            })

            throw new ValidationException(message);
        }
        return value;
    }
}
