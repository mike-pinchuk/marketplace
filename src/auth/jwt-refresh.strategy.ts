import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { Request } from 'express';
import { typedEnv } from "src/utils/type-env";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(private readonly userServise: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request.headers?.cookie?.split('=')[1] || null
            }]),
            secretOrKey: typedEnv.JWT_REFRESH_KEY,
            passReqToCallback: true,
        }) ;
    }

    async validate(request: Request, payload: any) {
        const refreshToken: string | undefined = request.headers.cookie;
        return this.userServise.getUserIfRefreshTokenMatches(refreshToken, payload.id)
    }
}