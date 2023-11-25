
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}
  
  canActivate(context: ExecutionContext): boolean{
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    if (request.cookies['access_token']) {
      return true;
    }
  }
}
