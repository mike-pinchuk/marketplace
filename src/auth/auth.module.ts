import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';


@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtRefreshStrategy, JwtRefreshAuthGuard]
})
export class AuthModule {}
