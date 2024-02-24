"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = require("express");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "http://localhost:4200",
        allowedHeaders: [
            "Access-Control-Allow-Origin",
            "content-type",
            "Access-Control-Allow-Credentials",
        ],
        credentials: true,
    });
    app.use(cookieParser());
    app.use((0, express_1.json)({ limit: "2mb" }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map