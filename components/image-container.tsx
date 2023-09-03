'use client';

import { getImageById } from '@/app/actions';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { Skeleton } from './ui/skeleton';

type Image = Awaited<ReturnType<typeof getImageById>>;

interface ImageContainerProps {
  imageId?: string;
  image?: Image;
  className?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  imageId,
  image,
  className
}) => {
  const [finalImage, setFinalImage] = useState<Image | undefined>(image);

  useEffect(() => {
    (async () => {
      if (imageId) setFinalImage(await getImageById(imageId));
    })();
  }, [imageId]);

  return (
    <div className='relative w-[250px] h-fit rounded-lg overflow-hidden border border-gray-700 flex flex-col flex-none'>
      <Link
        href={`/view/${finalImage?.id}`}
        className='flex justify-center object-contain border-b border-b-gray-700 h-[150px]'>
        <img
          src={`data:image/png;base64,${finalImage?.imageData}`}
          alt='image'
        />
      </Link>

      {finalImage ? (
        <div className='w-full flex flex-col p-4'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <span>{finalImage?.title}</span>
              <span className='text-neutral-500'>
                @{finalImage?.User?.username}
              </span>
            </div>

            <div className='flex items-center space-x-2'>
              <span>{finalImage.likes.length}</span>
              <BiHeart size={20} />
            </div>
          </div>

          <div className='flex gap-4 w-full mt-4'>
            {finalImage?.tags.trim() !== '' &&
              finalImage?.tags
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
