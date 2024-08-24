import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from '@swagger/setup';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(cookieParser());
  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  const origin = [];
  if (process.env.APP_ENV === 'dev') {
    origin.push('http://localhost:3000');
    origin.push('http://localhost:3001');
    origin.push('http://localhost:5173');
    origin.push('https://stack-sats-frontend-dev-pydtdb8ua.onrender.com');
    origin.push('https://stack-sats-dev-pupsworldpeace.seizectrl.io');
    origin.push('https://stack-sats-dev-dog.seizectrl.io');
    origin.push('https://stack-sats-dev-debauchery.seizectrl.io');
    origin.push('https://stack-sats-dev.seizectrl.io');
  }
  origin.push('http://localhost:3000');
  origin.push('https://stack-sats.seizectrl.io');
  origin.push('https://stack-sats-pupsworldpeace.seizectrl.io');
  origin.push('https://stack-sats-debauchery.seizectrl.io');
  origin.push('https://stack-sats-dog.seizectrl.io');
  origin.push('https://rpesxgiijjer.seizectrl.io');
  origin.push(process.env.WEB_URL);

  const cors = {
    origin,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  };
  app.enableCors(cors);

  setupSwagger(app);

  await app.listen(port, () => {
    logger.verbose(
      'app is listing on: ' + configService.get<string>('BASE_URL'),
    );
  });
}
bootstrap();
