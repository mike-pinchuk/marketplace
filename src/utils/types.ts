import { Request } from 'express';
import { User } from '../user/user.entity';

export interface AuthorizedRequest extends Request {
    user: { id: number }
    id: number;
}

export interface RequestWithUser extends Request {
    user: User;
}

