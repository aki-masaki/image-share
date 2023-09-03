import prisma from '@/lib/db';
import { randomBytes } from 'crypto';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const data: { [key: string]: string | File } = {};

  formData.forEach((value, key) => (data[key] = value as string | File));

  const { title, description, tags, username, visibility } = data as {
    [key: string]: string;
  };
  let file = data.file as File;

  const id = randomBytes(16).toString('hex');

  await prisma.image.create({
    data: {
      id,
      title,
      description,
      tags,
      userUsername: username,
      visibility: Number(visibility),
      imageData: Buffer.from(await file.arrayBuffer()).toString('base64')
    }
  });
};
