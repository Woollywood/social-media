import type { SignupDto } from '../generated'

import { faker } from '@faker-js/faker'

export const generateAuthData = (): SignupDto => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  username: faker.internet.username(),
  avatarUrl: faker.image.avatarGitHub(),
})
