'use server';

import prisma from '@/lib/db';
import { randomBytes } from 'crypto';

export const getImageIds = async () => {
  return await prisma.image.findMany({
    select: {
      id: true
    }
  });
};

export const getImages = async () => {
  return await prisma.image.findMany({
    include: {
      likes: true,
      User: true
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
  imageId,
  username
}: {
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

export const getCollections = async (userUsername: string) => {
  return await prisma.collection.findMany({
    where: {
      userUsername
    },
    include: {
      images: true
    }
  });
};

export const createCollection = async ({
  title,
  userUsername
}: {
  title: string;
  userUsername: string;
}) => {
  await prisma.collection.create({
    data: {
      id: randomBytes(16).toString('hex'),
      title,
      userUsername
    }
  });
};

export const getCollectionById = async ({ id }: { id: string }) => {
  return await prisma.collection.findUnique({
    where: {
      id
    },
    include: {
      images: true
    }
  });
};

export const toggleImageSave = async ({
  collectionId,
  imageId
}: {
  collectionId: string;
  imageId: string;
}) => {
  const collectionImage = await prisma.collectionImage.findFirst({
    where: {
      collectionId,
      imageId
    }
  });

  if (collectionImage)
    await prisma.collectionImage.delete({
      where: {
        id: collectionImage.id
      }
    });
  else
    await prisma.collectionImage.create({
      data: {
        imageId,
        collectionId
      }
    });
}
  
export const getUsers = async () => {
  return await prisma.user.findMany();
};
