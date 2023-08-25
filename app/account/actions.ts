'use server';

import prisma from '@/lib/db';
import * as crypto from 'crypto';
import * as zod from 'zod';
import { signupFormSchema } from './page';

const getHash = (source: string) =>
  crypto.createHash('md5').update(source).digest('hex').toString();

export const login = () => {};

export const signup = async ({
  username,
  password
}: zod.infer<typeof signupFormSchema>) => {
  if (
    await prisma.user.findUnique({
      where: {
        username
      }
    })
  )
    return 'Username is taken!';

  await prisma.user.create({
    data: {
      username,
      password: getHash(password)
    }
  });

  return '';
};
