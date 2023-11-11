import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './swagger/swagger';
import { ValidationPipe } from '@nestjs/common';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  SwaggerModule.setup('api', app, createDocument(app), {
    swaggerOptions: {
      persistAuthorization: true,
    }
  });


   // get the swagger json file (if app is running in development mode)
   if (process.env.NODE_ENV === 'development') {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.ts',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger/swagger.ts'`);
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
