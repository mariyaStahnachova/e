import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from "@nestjs/core";


@Injectable()
export class TestGuard implements CanActivate {
constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {
const string = this.reflector.get<string>('key',context.getHandler())
        console.log('in Guard',string)
        return true
    }

}
