import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class SendFileInterceptor implements NestInterceptor<string, FastifyReply> {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap((data) => {
                const res: FastifyReply = context.switchToHttp().getResponse()
                const { mimeType, file } = data
                res.type(mimeType).send(file)
            }),
        )
    }
}
