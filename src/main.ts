import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import * as cors from "cors";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:4200",
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "content-type",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true,
  });
  // app.use(cors());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
