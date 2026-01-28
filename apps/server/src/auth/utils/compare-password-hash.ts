import { compare } from 'bcryptjs';

export async function comparePasswordHash(
  plain: string,
  hash: string,
): Promise<boolean> {
  if (!hash) return false;
  return compare(plain, hash);
}
