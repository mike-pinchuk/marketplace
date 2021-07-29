import { Request } from 'express';
import { UserEntity } from '../user/user.entity';

export interface AuthorizedRequest extends Request {
    user: { id: number }
    id: number;
}

export interface RequestWithUser extends Request {
    user: UserEntity;
}

