import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MissionModule } from '../mission.module';
import { MissionService } from '../mission.service';

describe('MissionController (e2e-ish unit)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MissionModule],
    })
      .overrideProvider(MissionService)
      .useValue({ runFromText: (s: string) => `OUT:${s}` })
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /mission/run returns 400 when file is missing', async () => {
    await request(app.getHttpServer()).post('/mission/run').expect(400);
  });

  it('POST /mission/run processes uploaded file and returns result', async () => {
    await request(app.getHttpServer())
      .post('/mission/run')
      .attach('file', Buffer.from('DATA', 'utf8'), {
        filename: 'in.txt',
        contentType: 'text/plain',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({ result: 'OUT:DATA' });
      });
  });
});
