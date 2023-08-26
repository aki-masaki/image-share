'use client';

import { getImageById } from '@/app/actions';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiHeart } from 'react-icons/bi';
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
    <div className='relative w-[250px] h-fit rounded-lg overflow-hidden border border-gray-700 flex flex-col flex-none'>
      <Link
        href={`/view/${imageId}`}
        className='flex justify-center object-contain border-b border-b-gray-700 h-[150px]'>
        <img src={`/storage/${imageId}.jpeg`} alt='image' />
      </Link>

      {image ? (
        <div className='w-full flex flex-col p-4'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <span>{image?.title}</span>
              <span className='text-neutral-500'>@{image?.User?.username}</span>
            </div>

            <div className='flex items-center space-x-2'>
              <span>{image.likes.length}</span>
              <BiHeart size={20} />
            </div>
          </div>

          <div className='flex gap-4 w-full mt-4'>
            {image?.tags.trim() !== '' &&
              image?.tags
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
