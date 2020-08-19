import { AppService } from './app.service';
import { Controller, Get, NotFoundException, Req, Res, UseInterceptors } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify'
import { SendFileInterceptor } from './sendFile.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get('*')
    @UseInterceptors(SendFileInterceptor)
    public async getStaticFile(
        @Res() res: FastifyReply,
        @Req() req: FastifyRequest ,
    ): Promise<any> {
        if (req.url.indexOf('/api/') === 0) {
            throw new NotFoundException()
        }
        return await (res.raw as any).locals.getFile(req.params['*'])
    }
}
