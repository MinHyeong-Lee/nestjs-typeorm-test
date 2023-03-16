import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello() {
    const host = this.configService.get<string>("DB_HOST");
    const port = this.configService.get<number>("DB_PORT", 3306);
    return {
      host,
      port,
    };
  }
}