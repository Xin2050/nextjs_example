import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('Auth Service');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    const username = await this.userRepository.signIn(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('Invalid authorization.');
    }
    const payload: JwtPayload = { username };
    const token = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT payload ${JSON.stringify(payload)}`);
    return { token };

  }


}
