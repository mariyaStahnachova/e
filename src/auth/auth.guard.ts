import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import {KEY} from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService:JwtService,private reflector: Reflector ) {}

    canActivate(context: ExecutionContext): boolean {
         try{
             console.log("in Guard")
             const requiredRoles = this.reflector.getAllAndOverride(KEY, [
                 context.getHandler(),
                 context.getClass(),
             ]);
             if (!requiredRoles) {
                 return true;
             }
             const request = context.switchToHttp().getRequest();
             const authHeader = request.headers.authorization;
             const bearer = authHeader.split(' ')[0]
             const token = authHeader.split(' ')[1]

             if (bearer !== 'Bearer' || !token) {
                 throw new UnauthorizedException({message: 'Forbidden u'})
             }
             const user = this.jwtService.verify(token)
             request.user=user
             console.log(user, bearer, token)
             return user.roles.some(role=>requiredRoles.includes(role.value))
         }
         catch (e) {
             console.log(e)
             throw new UnauthorizedException({message: "Forbidden"});
         }

    }
}
