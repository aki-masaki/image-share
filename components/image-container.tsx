'use client';

import { getImageById } from '@/app/actions';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface ImageContainerProps {
  imageId: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ imageId }) => {
  const [image, setImage] =
    useState<Awaited<ReturnType<typeof getImageById>>>();

  useEffect(() => {
    (async () => {
      setImage(await getImageById(imageId));
    })();
  }, [imageId]);

  return (
    <div className='relative w-[300px] rounded-lg overflow-hidden border border-gray-700 flex flex-col flex-none h-fit'>
      <Link href={`/view/${imageId}`}>
        <img className='w-full' src={`/storage/${imageId}.jpeg`} alt='image' />
      </Link>

      {image ? (
        <div className='w-full flex flex-col p-4'>
          <span>{image?.title}</span>
          <span className='text-neutral-500'>{image?.User?.username}</span>
          <div className='flex gap-4 w-full mt-4'>
            {image?.tags
              .trim()
              .split(',')
              .filter(tag => !!tag && tag.trim() !== '')
              .map((tag, i) => (
                <div
                  key={i}
                  className='border border-gray-700 p-2 rounded-lg text-sm flex-grow-0'>
                  {tag}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className='w-full flex flex-col p-4 space-y-4'>
          <Skeleton className='h-4 w-[120px]' />
          <Skeleton className='h-4 w-[70px]' />
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
