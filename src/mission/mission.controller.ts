import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MissionService } from './mission.service';
import type { Express } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('mission')
@Controller('mission')
export class MissionController {
  constructor(private readonly mission: MissionService) {}

  @Post('run')
  @ApiOperation({
    summary: 'Process a mission input file',
    description:
      'Uploads a text file with mission instructions and returns the final rover positions.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Text file containing mission input',
        },
      },
      required: ['file'],
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid input or missing file' })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  runFromFile(@UploadedFile() file?: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new BadRequestException('Arquivo (file) é obrigatório');
    }

    const input = file.buffer.toString('utf8');
    const result = this.mission.runFromText(input);
    return { result };
  }
}
