'use server';

import prisma from '@/lib/db';

export const getImages = async () => {
  return await prisma.image.findMany({
    select: {
      id: true
    }
  });
};

export const getImageById = async (imageId: string) => {
  return await prisma.image.findUnique({
    where: {
      id: imageId
    },
    include: {
      User: true,
      likes: true
    }
  });
};

export const toggleLike = async ({
  value,
  imageId,
  username
}: {
  value: boolean;
  imageId: string;
  username: string;
}) => {
  const like = await prisma.like.findFirst({
    where: {
      imageId,
      userUsername: username
    }
  });

  if (like)
    await prisma.like.delete({
      where: {
        id: like.id
      }
    });
  else
    await prisma.like.create({
      data: {
        imageId: imageId,
        userUsername: username
      }
    });
};
