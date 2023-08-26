/* eslint-disable @next/next/no-img-element */
'use client';

import { getImageById, toggleLike } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';

interface ViewImagePageProps {
  params: {
    slug: string;
  };
}

const ViewImagePage = ({ params }: ViewImagePageProps) => {
  const username = getCookie('username') as string;

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<number>();

  const { slug: imageId } = params;

  const [image, setImage] =
    useState<Awaited<ReturnType<typeof getImageById>>>();

  useEffect(() => {
    (async () => {
      const response = await getImageById(imageId);

      setImage(response);

      setIsLiked(
        !!response?.likes.find(
          like => like.imageId === imageId && like.userUsername === username
        )
      );

      setLikes(image?.likes.length);
    })();
  }, [imageId, image?.likes.length, username]);

  return (
    <div className='h-full flex-grow pl-4 flex justify-evenly gap-4'>
      <div className='w-[60%] h-full flex justify-center items-center rounded-lg'>
        <img
          className='max-w-full max-h-full flex-grow'
          src={`/storage/${imageId}.jpeg`}
          alt='image'
        />
      </div>

      <div className='flex-grow h-full border border-gray-700 rounded-lg space-y-4'>
        {image ? (
          <>
            <div className='border-b border-b-gray-700 p-4 space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <h1>{image.title}</h1>
                  <h2 className='text-neutral-500'>@{image.User?.username}</h2>
                </div>

                <div>
                  <Button
                    variant='outline'
                    className='space-x-2 flex justify-center items-center'
                    onClick={async () => {
                      setIsLiked(prev => !prev);
                      setLikes(prev => (prev || 0) + (isLiked ? -1 : 1));

                      await toggleLike({
                        imageId,
                        username: username,
                        value: isLiked
                      });
                    }}>
                    <span>{likes}</span>
                    {isLiked ? (
                      <BiSolidHeart size={20} />
                    ) : (
                      <BiHeart size={20} />
                    )}
                  </Button>
                </div>
              </div>

              <p>{image.description ?? 'No description'}</p>
            </div>
          </>
        ) : (
          <>
            <Skeleton className='h-4 w-[200px]' />
            <Skeleton className='h-4 w-[100px]' />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewImagePage;
