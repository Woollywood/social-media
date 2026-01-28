import { type TokenType } from './token-type';

export type TokenPayload = {
  type: TokenType;
  sub: string;
  iat: number;
  exp: number;
};
