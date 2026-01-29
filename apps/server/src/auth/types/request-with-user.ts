import { type Request } from 'express';

import { type UserDto } from '../../dto/user/dto/user.dto';

export type RequestWithUser = Request & {
  user: UserDto;
};
