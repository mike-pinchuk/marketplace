import { Injectable } from '@nestjs/common';
import { typedEnv } from '../utils/type-env';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    createToken(userId: number): object {
        console.log('USER ID', userId);
        const token = jwt.sign({ id: userId }, typedEnv.JWT_SECRET_KEY, { expiresIn: '2h'})
        return { token }
    }
}
