import { NestFactory } from '@nestjs/core';
import * as fs from 'fs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { getFile } from './utils.bootstrap';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
    
    app.use(
        (
            req: FastifyRequest,
            res: FastifyReply & { locals: any },
            next: () => void,
        ) => {
            if (!res.locals) {
                res.locals = {}
            }
            res.locals.getFile = async (
                filename: string,
            ): Promise<{ file: string | Buffer; mimeType: string }> =>
                getFile(filename, process.cwd(), fs)
            next()
        },
    )

    await app.listen(3000);
}
bootstrap();
