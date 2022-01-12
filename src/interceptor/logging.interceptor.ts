import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const methodKey = context.getHandler(); // "create"
        const className = context.getClass(); // "CatsController"
        console.log('Before in interceptor...',methodKey,className);
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(`After in interceptor... ${Date.now() - now}ms`)),
            );
    }
}
