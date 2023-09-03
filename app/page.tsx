'use client';

import ImageContainer from '@/components/image-container';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { getImages } from './actions';

const ImageContainerSkeleton = () => {
  return (
    <div className='rounded-lg border border-gray-700 w-[250px] h-[250px] p-4 space-y-4'>
      <Skeleton className='w-full h-[150px]' />
      <Skeleton className='w-[120px] h-4' />
      <Skeleton className='w-[70px] h-4' />
    </div>
  );
};

const HomePage = () => {
  const [images, setImages] = useState<any[]>();

  useEffect(() => {
    (async () => {
      const images = await getImages({
        where: {
          // Select only the public ones
          visibility: 0
        }
      });

      setImages(images);
    })();
  }, []);

  const skeletons = [];

  for (let i = 0; i < 8; i++)
    skeletons.push(<ImageContainerSkeleton key={i} />);

  return (
    <main className='flex flex-grow flex-wrap justify-center items-center overflow-y-auto max-w-[calc(100%-1rem-50px)]'>
      <div className='flex px-4 gap-8 flex-grow flex-wrap justify-items-start overflow-y-auto w-full h-full'>
        {images
          ? images.map(image => (
              <ImageContainer imageId={image.id} key={image.id} />
            ))
          : skeletons}
      </div>
    </main>
  );
};

export default HomePage;
