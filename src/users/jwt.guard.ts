import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-token'];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const getTokenFromdb = await this.tokenService.findTokenById(token);

      if (!getTokenFromdb) {
        throw new UnauthorizedException('Unauthorized');
      }

      const authToken = getTokenFromdb.token;

      const decoded = this.jwtService.verify(authToken);

      request.userId = decoded.userId; // Store user info in the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
