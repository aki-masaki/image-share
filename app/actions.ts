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
      User: true
    }
  });
};
