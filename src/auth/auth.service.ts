import { Injectable } from '@nestjs/common';
import { typedEnv } from '../utils/type-env';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    createAccessToken(userId: number): object {
        const token = jwt.sign({ id: userId }, typedEnv.JWT_ACCESS_KEY, { expiresIn: '2h'})
        return { token }
    }

    createRefreshToken(userId: number): object {
        const token = jwt.sign({id: userId}, typedEnv.JWT_REFRESH_KEY, {expiresIn: '7d'})
        return { token }
    }

}
