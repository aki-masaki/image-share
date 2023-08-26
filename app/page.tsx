'use client';

import ImageContainer from '@/components/image-container';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { getImages } from './actions';

const HomePage = () => {
  const [images, setImages] = useState<any[]>();

  useEffect(() => {
    (async () => {
      const images = await getImages();

      setImages(images);
    })();
  }, []);

  return (
    <main className='flex px-4 gap-4 flex-grow flex-wrap justify-between overflow-y-auto'>
      {images ? (
        images.map(image => (
          <ImageContainer imageId={image.id} key={image.id} />
        ))
      ) : (
        <>
          <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
            <Skeleton className='w-full h-[150px]' />
            <Skeleton className='w-[120px] h-4' />
            <Skeleton className='w-[70px] h-4' />
          </div>

          <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
            <Skeleton className='w-full h-[150px]' />
            <Skeleton className='w-[120px] h-4' />
            <Skeleton className='w-[70px] h-4' />
          </div>

          <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
            <Skeleton className='w-full h-[150px]' />
            <Skeleton className='w-[120px] h-4' />
            <Skeleton className='w-[70px] h-4' />
          </div>

          <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
            <Skeleton className='w-full h-[150px]' />
            <Skeleton className='w-[120px] h-4' />
            <Skeleton className='w-[70px] h-4' />
          </div>

          <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
            <Skeleton className='w-full h-[150px]' />
            <Skeleton className='w-[120px] h-4' />
            <Skeleton className='w-[70px] h-4' />
          </div>
        </>
      )}
    </main>
  );
};

export default HomePage;
