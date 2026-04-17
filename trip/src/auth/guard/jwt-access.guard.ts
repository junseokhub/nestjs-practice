import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAccessAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = request.cookies['accessToken'];
      const user = await this.jwtService.verify(accessToken);
      request.user = user;

      if (request.user) {
        return true;
      }
    } catch(err) {
      throw new UnauthorizedException('Invalid access token.');
    }
  }
}